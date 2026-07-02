import { useEffect, useState } from "react";
import { getCurrentWeather, getCurrentWeatherByCoords, getWeatherForecast, } from "../services/WeatherAPI";

export const useWeather =()=>{
    const [currentWeather, setCurrentWeather]=useState(null);
    const [foreCast, setForeCast]=useState(null);
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState(null);
    const [units, setUnits]=useState("C");


    const fetchWeatherByCity = async (city)=>{
        setLoading(true);
        setError(null);

        try{
            const [weatherData, foreCast]= await Promise.all([
                getCurrentWeather(city),
                getWeatherForecast(city),
            ]);

            setCurrentWeather(weatherData);
            setForeCast(foreCast);
            localStorage.setItem("lastCity", city);
        } catch(err){
            setError(err instanceof Error ? err.message : "Failed to fetch weather data");
        } finally {
            setLoading(false);
        }
    };


    const fetchWeatherByLocation = async ()=>{
        if(!navigator.geolocation){
            setError("GeoLocation is not supported by this browser");
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(async(position)=>{
            try{
                const {latitude,longitude} = position.coords;
                const weatherData = await getCurrentWeatherByCoords(latitude, longitude)
                setCurrentWeather(weatherData);

                const forecastData = await getWeatherForecast(weatherData.name);
                setForeCast(forecastData);
                localStorage.setItem("lastCity", weatherData.name);
            } catch(err){
                setError(err instanceof Error ? err.message : "Failed to fetch weather data");
            }
            finally{
                setLoading(false);
            }
        },(error)=>{
            setError("unable to retrieve your location");
            setLoading(false);
        }
    );
    };

    const toggleUnit = ()=>{
        setUnits(units === "C" ? "F" : "C");
    }

    useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");

    if (lastCity) {
        fetchWeatherByCity(lastCity);
    } else {
        fetchWeatherByCity("New York");
    }
}, []);

    return {currentWeather, foreCast, loading, error, units, fetchWeatherByCity, fetchWeatherByLocation, toggleUnit,};
};
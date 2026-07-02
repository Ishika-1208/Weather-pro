import React from 'react'
import bgImage from './bg-image.png';
import SearchBar from './Components/SearchBar.jsx';
import TemperatureToggle from './Components/TemperatureToggle.jsx';
import LoadingSpinner from './Components/LoadingSpinner.jsx';
import ErrorMessage from './Components/ErrorMessage.jsx';
import WeatherCard from './Components/WeatherCard.jsx';
import WeatherForecast from './Components/WeatherForecast.jsx';
import { useWeather } from './hooks/useWeather.js';

function App() {

  const {currentWeather, foreCast, loading, error, units, fetchWeatherByCity, fetchWeatherByLocation, toggleUnit,} = useWeather();

  const handleRetry = () => {
    if(currentWeather) {
      fetchWeatherByCity(currentWeather.name);
    }else{
      fetchWeatherByCity("New York");
    }
  };

  return (
    <div className='min-h-screen relative overflow-hidden'>
      {/*Background*/}
      <div className='fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat' style={{backgroundImage:`url(${bgImage})`}}>
        <div className='absolute inset-0 bg-linear-to-br from-blue-900/40 via-purple-900/30 to-indigo-900/40'></div>
        <div className='absolute inset-0 bg-black-20'>
        </div>
      </div>
      <div className='relative z-10 container mx-auto px-4 py-8 min-h-screen'>
      <div className='max-w-7xl mx-auto'>
        {/* Header section */}
        <div className='text-center mb-12'>
          <div className='mb-8'>
            <h1 className='text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl tracking-tight'>
              Weather<span className='bg-linear-to-r from-blue-800 to-purple-600 bg-clip-text text-transparent'>Pro</span>
            </h1>
            <p className='text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed'>
            Experience weather like never before with real-time data,beautiful visulas, and precise forecasts for any location worldwide.
            </p>
            </div>

            <div className='flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6 mb-12'>
              <SearchBar onSearch={fetchWeatherByCity} onLocationSearch={fetchWeatherByLocation} loading={loading}/>
              <TemperatureToggle units={units} onToggle={toggleUnit}/>
            </div>
          </div>

           <div className='space-y-8'>
           {loading && ( 
            <div className='flex justify-center'>
              <div className='bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20'>
              <LoadingSpinner/>
              <p className='text-white/80 text-center mt-4 font-medium'>Fetching latest weather data...</p>
              </div>
            </div>
          )}

            {error && !loading && (
              <div className='max-w-2xl mx-auto'>
              <ErrorMessage message={error} onRetry={handleRetry} />
            </div>
          )}

           {currentWeather && !loading && (
             <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
              <div className='xl:col-span-2'> 
                <WeatherCard weather={currentWeather} units={units}/>
              </div>
              <div className='xl:col-span-1'>
                {foreCast && <WeatherForecast foreCast={foreCast} units={units}/>}
              </div>
            </div>
           )}
           </div>
        </div>
      </div>
    </div>
  )
}

export default App
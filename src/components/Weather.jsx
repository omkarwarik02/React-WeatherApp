import { useState } from "react"

const API_KEY = "7f11458f45dd3b5bccef5afcf5c54b55"

function Weather() {
    const [city, setCity] = useState("")
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const[error,setError] = useState(null)

    async function fetchWeather() {
        if (city.trim() === "") return
        setLoading(true)
        setError(null)

        try { const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
        const data = await response.json()

        if(data.cod !== 200){
            setError("City not found! try again")
            setWeather(null)
        } else {
            setWeather(data)
        }
    
    } catch (err) {
        setError("Something went wrong")
    } finally {
        setLoading(false)
    }
       
    
    }

return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <h1 className="text-3xl font-bold text-indigo-600 mb-6">🌤️ Weather App</h1>

            {/* Search box */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e)=> e.key ==="Enter" && fetchWeather()}
                    placeholder="Enter city name..."
                    className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-400"
                />
                <button
                    onClick={fetchWeather}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition-all"
                >
                    Search
                </button>
            </div>
            {loading && <p className="text-center text-gray-400">Loading... ⏳</p>}
{error && <p className="text-center text-red-400">{error}</p>}  

            {weather && (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">{weather.name}, {weather.sys.country}</h2>
                    <p className="text-6xl font-bold text-indigo-600 my-4">{Math.round(weather.main.temp)}°C</p>
                    <p className="text-gray-500 capitalize mb-4">{weather.weather[0].description}</p>
                    <div className="flex justify-around mt-4">
                        <div>
                            <p className="text-gray-400 text-sm">Humidity</p>
                            <p className="text-gray-700 font-bold">{weather.main.humidity}%</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Wind Speed</p>
                            <p className="text-gray-700 font-bold">{weather.wind.speed} m/s</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Feels Like</p>
                            <p className="text-gray-700 font-bold">{Math.round(weather.main.feels_like)}°C</p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    </div>
)
}
export default Weather
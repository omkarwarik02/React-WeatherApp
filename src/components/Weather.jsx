import { useState } from "react"

const API_KEY = "7f11458f45dd3b5bccef5afcf5c54b55"

function Weather() {
    const [city, setCity] = useState("")

    async function fetchWeather() {
        if (city.trim() === "") return

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
        const data = await response.json()
        console.log(data)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-indigo-600 mb-6">🌤️ Weather App</h1>

                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
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
            </div>
        </div>
    )
}

export default Weather
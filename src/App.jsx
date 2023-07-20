import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Loading from './components/Loading'
import Weather from './components/Weather'
import SearchCountry from './components/SearchCountry'

function App() {

    const [weather, setWeather] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [isOn, setIsOn] = useState(false)
    const [searchName, setSearchName] = useState("")
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=f11f1e0c7127adefc9c9b9a590f5e7ac
  useEffect(() => {

    axios
    .get('https://api.openweathermap.org/data/2.5/weather?id=3665900&appid=f11f1e0c7127adefc9c9b9a590f5e7ac')
    .then(resp => {
      setWeather(resp.data)
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    })
    .catch(error => console.error(error))
  }, [])

  const darkMode = () => {
    setIsOn(!isOn)
  }

  const submit = e => {
    e.preventDefault()

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchName}&appid=f11f1e0c7127adefc9c9b9a590f5e7ac`)
      .then(resp => {
        console.log(resp.data)
        setWeather(resp.data)
      })
      .catch(error => console.error(error))
  }

  return (
    <>
      {isLoading && <Loading />}
    <section className={`${isOn ? 'section-dark' : 'section-ligth'}`}>
        <nav className='weather-nav'>
            <h1>Weather App</h1>
            <div className='div-input'>
              <i class='bx bx-search-alt-2'></i>
              <form onSubmit={(e) => submit(e)}>
                <input type="text" placeholder="Buscar una ciudad"
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
                className={`${isOn ? 'dark-input' : 'ligth-input'}`}/>
              </form>
            
            </div>
            
            {
              isOn === true 
              ?  <button onClick={darkMode} className={`${isOn ? 'dark-button' : ''}`}><i class='bx bx-toggle-right'></i></button>
              : <button onClick={darkMode} className={`${isOn ? '' : 'light-button'}`}>
              <i class='bx bx-toggle-left'></i>
              </button>
            }
        </nav>
        <main>
          <div className='position'>

          
            <ul className='first-list'>
              {
        <Weather 
                key={weather}
                url={weather}
                isOn={isOn}
        />
              }
        {/* <SearchCountry 
          url={searchName}
          isOn={isOn}
        /> */}
            </ul>
          </div>
        </main>
      
    </section>
    </>
  )
}

export default App

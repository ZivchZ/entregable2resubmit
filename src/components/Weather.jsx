import { useState } from "react"

const Weather = ({url, isOn}) => {

    const [changeGrade, setChangeGrade] = useState(true)

    const farenheit = Math.floor(Math.floor((url.main?.temp - 273.15) * 1.8) + 32)

    const celsius = Math.floor(url.main?.temp - 273.15)

    const convertGrade = () => {
        setChangeGrade(!changeGrade)
    }

    return(
        <>
        <div className={`${isOn === true ? 'main-dark-container' : 'main-container'}`}>
            <li className="main-list">
                {   
                    celsius < 20 
                    ? <img src="src/assets/icons/7.svg" alt="" />
                    : celsius < 35 
                    ? <img src="src/assets/icons/2.svg" alt="" />
                    : <img src="src/assets/icons/1.svg" alt="" />
                }
                <h2>{`${changeGrade === true ? celsius : farenheit}°`}</h2>
                <p>Viento: {url.wind?.speed}</p>
                <p>Nubes: {url.clouds?.all}</p>
                <p>Presión: {url.main?.pressure}</p>
                <h3>{url?.name}, {url.sys?.country}</h3>
            </li>
        </div>
            <button className={`${isOn === true ? 'button-list-dark' : 'button-list-ligth'}`} onClick={convertGrade}>{`${changeGrade === true ? "Cambiar a F°" : "Cambiar a C°"}`}</button>
        </>
    )
}

export default Weather
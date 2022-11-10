import { useEffect, useState } from "react"
import axios from "axios"

function Dashboard() {
  const [location, setLocation] = useState(false)
  const [weather, setWeather] = useState(false)

  let getWeather = async (lat, long) => {
    let res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    })
    setWeather(res.data)
  }

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude)
      setLocation(true)
    })
  }, [])

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>
      <p>~~~~Teste api request~~~~</p>
      <p>~~~~Localização {location && <>ativada</>}{!location && <>desativada</>}~~~~</p>
      <p>~~~~Cidade: {weather && <>{weather['name']}</>}~~~~</p>
      <p>~~~~Temperatura: {weather && <>{weather['main']['temp']}</>}°C~~~~</p>
      <p>exibir algum gráfico ?</p>
      <p>exibir TPs com mais de 30 dias sem atualização das atividades</p>
      <p>+Ticket (pra quem é do time qualidade)</p>
      <p>+Grupo solucionador (apenas pra quem é do time de gestores ?)</p>
      <p>Lista grupos solucionadores</p>
      <p>Lista problemas</p>
      <p>Lista soluções</p>
      <a target="_blank" href="https://gitlab.com/jrmsrs/ticket.io-front">Codigo fonte</a>
      
    </>
  )
}

export default Dashboard
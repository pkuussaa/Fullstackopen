import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY
const URL = 'http://api.weatherstack.com/current'

const Weather = (props) => {
  const [weather, setWeather] = useState()
  const weatherUrl = URL + '?access_key=' + API_KEY + '&query=' + props.filtered.name

  console.log('weather', weatherUrl)
  useEffect(() => {
    axios.get(weatherUrl).then(response => {
      setWeather(response.data)
      console.log(response.data)
    })
  }, [weatherUrl])
  if (weather) {
    return (
      <div>
        <h2>Weather in {props.filtered.name}</h2>
        <p><strong>temperature:</strong> {weather.current.temperature} Celcius</p>
        <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions[0]}/>
        <p><strong>wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
      </div>
    )
  }
  return (
    <></>
  )
}

const DetailedInfo = (props) => {

  const detailed = props.filtered.map(filtered => {
    return (
      <div key={filtered.name}>
        <h1>{filtered.name}</h1>
        <p>capital {filtered.capital}</p>
        <p>population {filtered.population}</p>
        <h2>languages</h2>
        <ul>
          {filtered.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={filtered.flag} alt={filtered.name} width='100'/>
        <Weather filtered={filtered}/>
      </div>
    )
  })

  return (detailed)
}

const Countries = (props) => {
  let filtered = [...props.countries]

  const handleClick = (filtered) => {
    return () => props.setFilter(filtered.name)
  }

  if(props.filter) {
    filtered = filtered.filter((country) => country.name.toLowerCase().includes(props.filter.toLowerCase()));
    if (filtered.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    }
    else if (filtered.length === 1) {
      console.log(filtered)
      return (
         <div>
           <DetailedInfo filtered={filtered}/>
         </div>
      )
    }
    else {
      const country = filtered.map(filtered => {
        return (
          <div key={filtered.name}>
            <p>{filtered.name} <button onClick={handleClick(filtered)}>show</button></p>
        </div>
          )
        })
    return (
      <div>
        {country}
      </div>
    )
}
}
return (
  <div></div>
)
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      console.log('responsed')
      setCountries(response.data)
    })
  }, [])

  const handleFilter = (event) => {
	  setFilter(event.target.value)
	}

  return (
    <div>
      <form>
        <div>
          find countries <input
          value={filter}
          onChange={handleFilter}
          />
        </div>
      </form>
      <Countries filter={filter} setFilter={setFilter} countries={countries}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

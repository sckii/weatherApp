import React, { useState, FormEvent } from 'react';
import './styles.css'

import api from '../../api/connection';

import hot from '../../assets/svg/001-sunny.svg';


interface DisplayConst {
  
}
const Display: React.FC<DisplayConst> = ({}) => {
  const API = "NsxS40UXS2JcMmrLAkwkTxamY0lhyQ8x";

  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState('rio de janeiro');
  const [iconName, setIconName] = useState('i')

  async function searchTemperature(e: FormEvent){
    e.preventDefault();

    

    api.get(`locations/v1/cities/search?apikey=${API}&q=${cityName}`).then(response => {
      const [{ Key }] = response.data
      const name = Key

      console.log(name)
      
      api.get(`currentconditions/v1/${ name }?apikey=${API}&details=false`).then(response => {
        const [{ WeatherIcon, Temperature:{"Metric":{Value}}}] = response.data;

        // const weatherChoose ;
        if (WeatherIcon > 10) {
          console.log(WeatherIcon)
          setIconName(WeatherIcon)
        } else { setIconName(`0${WeatherIcon}`) }
        console.log(Value)
        setTemperature( Value )
      })
    })}

  return (
    <div id='display-page'>
      <article>
        <div className="informations-container">
          <div className="informations">
            <form onSubmit={searchTemperature}>
              <label >
                <input 
                  value={cityName}
                  onChange={(e) => { setCityName(e.target.value) }}
                  type="text"
                />
                <span> City name </span>
                
              </label>
              <button type="submit" >Search</button>
            </form>
          </div>
          <div className='graus'>
            <img src={`https://developer.accuweather.com/sites/default/files/${iconName}-s.png`} alt="icone do tempo"/><h1>{temperature} °</h1>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Display;
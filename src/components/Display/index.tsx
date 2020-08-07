import React, { useState, FormEvent } from 'react';
import './styles.css'

import api from '../../api/connection';
import morning from '../../styles/img/sun rise.jpg'
import cloudy from '../../styles/img/cloudy.jpg'
import rain from '../../styles/img/rain.jpg'
import snow from '../../styles/img/snow.jpg'
import hot from '../../styles/img/hot.jpg'
import cold from '../../styles/img/cold.jpg'
import wind from '../../styles/img/wind.jpg'
import night from '../../styles/img/night.jpg'
import nightColudy from '../../styles/img/nightColudy.jpg'
import nightRain from '../../styles/img/nightRain.jpg'




interface DisplayConst {
  
}
const Display: React.FC<DisplayConst> = ({}) => {

  const API = "NsxS40UXS2JcMmrLAkwkTxamY0lhyQ8x";

  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState('Rio de Janeiro');
  const [iconName, setIconName] = useState('Sun rise')
  const [image, setImage] = useState(morning)
  const [dateTime, setDateTime] = useState()

  async function searchTemperature(e: FormEvent){
    e.preventDefault();

    

    api.get(`locations/v1/cities/search?apikey=${API}&q=${cityName}`).then(response => {
      const [{ Key }] = response.data
      const name = Key

      console.log(name)
      
      api.get(`currentconditions/v1/${ name }?apikey=${API}&details=false`).then(response => {
        const [{ EpochTime, WeatherIcon, WeatherText, Temperature:{"Metric":{Value}}}] = response.data;
        
    
        const weatherIcon = WeatherIcon;
        if (weatherIcon <= 1) {
          setImage(morning)
        } else if (weatherIcon <= 11) {
          setImage(cloudy)
        } else if (weatherIcon <= 18) {
          setImage(rain)
        } else if (weatherIcon <= 29) {
          setImage(snow)
        } else if (weatherIcon <= 30) {
          setImage(hot)
        } else if (weatherIcon <= 31) {
          setImage(cold)
        } else if (weatherIcon <= 32) {
          setImage(wind)
        } else if (weatherIcon <= 33) {
          setImage(night)
        } else if (weatherIcon <= 38) {
          setImage(nightColudy)
        }else if (weatherIcon <= 44) {
          setImage(nightRain)
        }

        setIconName(WeatherText)
        console.log(Value)
        setTemperature( Value )
      })
    }).catch((error) => {
      alert(`something are wroing cant find ${cityName} (only city) `)  
    })
  
  }
      

  return (
    <div id='display-page'>
      <article>
        <div className="informations-container" >
          <div className="informations">
            <form onSubmit={searchTemperature}>
              <div className="input">
                <label >
                  <input 
                    value={cityName}
                    onChange={(e) => { setCityName(e.target.value) }}
                    type="text"
                  />
                  <span> City name </span>
                
                </label>
              </div>
              <div className="button">
                <button type="submit" >Search</button>
              </div>
            </form>
          </div>
          <div className='graus'>
            <img 
              src={image} 
              alt='weather'/>
            <span className='date'><h2>{cityName}</h2><h4>{iconName}</h4><h6>{dateTime}</h6><h1>{temperature} °</h1></span>
            
          </div>
        </div>
      </article>
    </div>
  )
}

export default Display;
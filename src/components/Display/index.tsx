import React, { useState, FormEvent } from 'react';
import './styles.css'

import api from '../../api/connection';
import morning from '../../styles/img/sun rise.jpg'
import { url } from 'inspector';

interface DisplayConst {
  
}
const Display: React.FC<DisplayConst> = ({}) => {

  const API = "NsxS40UXS2JcMmrLAkwkTxamY0lhyQ8x";

  const [temperature, setTemperature] = useState(0);
  const [cityName, setCityName] = useState('Rio de Janeiro');
  const [iconName, setIconName] = useState('Sun rise')

  async function searchTemperature(e: FormEvent){
    e.preventDefault();

    

    api.get(`locations/v1/cities/search?apikey=${API}&q=${cityName}`).then(response => {
      const [{ Key }] = response.data
      const name = Key

      console.log(name)
      
      api.get(`currentconditions/v1/${ name }?apikey=${API}&details=false`).then(response => {
        const [{ WeatherText, Temperature:{"Metric":{Value}}}] = response.data;

        // const weatherChoose ;
        setIconName(WeatherText)
        console.log(Value)
        setTemperature( Value )
      })
    })}

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
              src={morning} 
              alt='weather'/>
            <span className='date'><h2>{cityName}</h2><h4>{iconName}</h4><h1>{temperature} °</h1></span>
            
          </div>
        </div>
      </article>
    </div>
  )
}

export default Display;
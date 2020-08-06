import React from 'react';
import Header from '../../components/Header';
import './styles.css'
import Display from '../../components/Display';


export default function Home() {
  
  return (
    <div id='home-page' className='container'>
      <Header />
      <main>
        <Display />
      </main>
    </div>
  );
}
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import banner from '../assets/images/banner2.jpg'
import { Slider } from '../components/Slider';
import { Cards} from '../components/Cards';
import catalogoSAM from '../assets/images/catalogoSAM.png';

import { useHistory } from 'react-router';


export function Homepage() {
  const history = useHistory();  

  return (
    <React.Fragment>
      <Header />
      <main className='main-home'>
        <span className='banner'><img src={banner}></img></span>
        <section className='carousel'>            
            <Slider />    
            </section> 
        <div className='main-btn'>
          <button className='code-btn' onClick={() => history.push('/code')}>
            ¿Tienes un código?
          </button>
          <Link to='/catalogue'>
            <button className='cat-btn'>Catálogo</button>
          </Link>
          <Link to='/register'>
            <button className='reg-btn'>Regístrate</button>
          </Link>
          </div> 
          <Cards />
      </main>
      <Footer />
    </React.Fragment>
  );
  }
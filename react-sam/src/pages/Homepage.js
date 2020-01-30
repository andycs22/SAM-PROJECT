import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Slider } from '../components/Slider';
import { Cards} from '../components/Cards';
import { useHistory } from 'react-router';


export function Homepage() {
  const history = useHistory();  

  return (
    <React.Fragment>
      <Header />
      <main className='main-home'>
        
        <div className='main-btn'>
          <h1>Software A Medida</h1>
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
        <section className='carousel'> 
        <h2>Novedades</h2>           
            <Slider />    
            </section> 
        <section className='cards-exp'>
          <h2>Elige tu experiencia SAM</h2>
          <Cards />
          </section>
      </main>
      <Footer />
    </React.Fragment>
  );
  }
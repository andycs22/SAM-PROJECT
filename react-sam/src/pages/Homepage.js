import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import discount from '../assets/images/BANNER-DESCUENTO.svg';
import demo1 from '../assets/images/demo1.jpg';
import demo2 from '../assets/images/demo2.jpg';
import demo3 from '../assets/images/demo3.jpg';
import catalogoSAM from '../assets/images/catalogoSAM.png';

import { useHistory } from 'react-router';

export function Homepage() {
  const history = useHistory();

  return (
    <React.Fragment>
      <Header />
      <main className='main-home'>
        <h1 className='main-top'>Software A Medida</h1>
        <div className='main-btn'>
          <button className='code-btn' onClick={() => history.push('/code')}>
            ¿Tienes un código?
          </button>
          <Link to='/register'>
            <button className='reg-btn'>Regístrate</button>
          </Link>

          <section className='demo-prod'>
            <div className='demo1-img'>
              <Link to='/catalogue'>
                <img src={catalogoSAM}></img>
                <p>Visita el catalogo</p>
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}

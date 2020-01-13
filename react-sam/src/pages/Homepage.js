import React from 'react';
import { Header } from '../components/Header';

import discount from '../assets/images/BANNER-DESCUENTO.svg';

export function Homepage() {
  return (
    <React.Fragment>
      <Header />
      <main className='main-homepage'>
        <div className='title-homepage'>
          <h1>Software</h1>
          <h2>a Medida</h2>
        </div>
        <div className='image-discount'>
          <img src={discount} alt='discount' />
        </div>
        <div className='code'>
          <input type='text' placeholder='código' />
          <button type='submit' className='btn-code'>
            Ingresar
          </button>
        </div>
      </main>
    </React.Fragment>
  );
}

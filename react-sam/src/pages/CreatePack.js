import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { usePack } from '../shared/context/package-context';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { createPack } from '../http/packService';
import { trash } from '../assets/images/trash.png';

export function CreatePack() {
  const [expireDate, setExpireDate] = useState();
  const [error, setError] = useState(false);
  const {
    pack,
    totalPrice,
    totalItems,
    removeItem,
    code,
    setCode,
    resetPack,
  } = usePack();

  console.log(pack);
  const history = useHistory();

  const expDate = e => {
    setExpireDate(e.target.value);
  };
  console.log(expireDate);

  const buy = () => {
    if (expireDate !== undefined) {
      const order = localStorage.getItem('pack');
      console.log(order);
      const date_end = expireDate;
      console.log(date_end);
      const createP = { order, date_end };
      console.log(createP);
      return createPack({ createP })
        .then(response => {
          console.log(response.data);
          setCode(response.data);
        })
        .then(resetPack())
        .then(history.push('/confirmation'))
        .catch(error => {
          console.log(error);
          setError(false);
        });
    } else {
      setError(true);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <main className='main-flex'>
        <h1 className='main-title top'>Generando un paquete</h1>
        <section className='create-pack'>
          {totalItems === 0 && (
            <React.Fragment>
              <h2 className='code-list'>No hay productos seleccionados</h2>
            </React.Fragment>
          )}
          {totalItems > 0 && (
            <React.Fragment>
              <h2 className='code-list'>Precios especiales:</h2>
              <ul>
                {pack.map(item => (
                  <li key={item.id}>
                    <p>
                      <span>{item.name}</span>
                      <span>{` ${item.oldPrice}€ `}</span>
                      <span>{`- ${item.discount}% `}</span>
                      <span>{`-> ${item.newPrice}€  `}</span>

                      <button
                        className='trash'
                        onClick={e => {
                          e.preventDefault();
                          removeItem(item);
                        }}
                      ></button>
                    </p>
                  </li>
                ))}
              </ul>
              <div className='group1'>
                <label>Paquete valido hasta:</label>
                <input
                  type='date'
                  name='expirationDate'
                  onChange={expDate}
                  required
                />
                <span className='bar'></span>

                {error && <p id='yellow'>Debe introducir una fecha de validez</p>}
              </div>
              <p>Total price = {`${totalPrice}€`}</p>
              <button className='red-btn' onClick={buy}>
                GENERAR PAQUETE
            </button>
            </React.Fragment>
          )}
          {code.length > 0 && <p>Codigo: {code}</p>}
          <Link to='/catalogue'>
            <button className='white-btn'>Volver al catalogo</button>
          </Link>
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
}

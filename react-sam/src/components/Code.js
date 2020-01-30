import React, { useState } from 'react';
import { getCodePack } from '../http/packService';
import { useCart } from '../shared/context/cart-context';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function Code() {
  const [getCode, setGetCode] = useState();
  const [productsInPack, setProductsInPack] = useState();
  const [dateEnd, setDateEnd] = useState();
  const { addItemToCart } = useCart();

  const showPack = (e) => {
    e.preventDefault();
    setProductsInPack(undefined);
    console.log(getCode);
    return getCodePack({ getCode }).then(response => {
      setProductsInPack(response.data.data);
      setDateEnd(response.data.dateEnd[0].date_end.substring(0, 10));
    });
  }

  console.log(productsInPack);
  console.log(dateEnd);

  const now = new Date();
  const today = now.toISOString().substring(0, 10);
  console.log(today);

  const showProducts = () => {
    if (productsInPack !== undefined && productsInPack.length > 0) {
      if (today < dateEnd || today === dateEnd) {
        return (
          <ul>
            {productsInPack.map(productIP => (
              <li key={productIP.id}>
                <div className='products-in-pack'>
                  <img src={productIP.photo} alt='productimage' />
                  <p>{productIP.name}</p>
                  <p>Precio catalogo: {productIP.old_price}€</p>
                  <p>con descuento adicional del {productIP.discount} %</p>
                  <p className='of-price'>Adquierelo al precio especial de: <span className='red-price'> {productIP.final_price}€</span></p>
                  <button className='white-btn' onClick={() => addItemToCart(productIP)}>Lo quiero</button>
                </div>
              </li>
            ))}
          </ul>
        )
      } else { return <p>El código introducido ya ha expirado</p> }

    }
  }
  return (
    <React.Fragment>
      <Header />
      <main id='main-code'>
        <h1 className='main-title top'>Código Promocinal</h1>
        <form onSubmit={showPack}
          className='form-catalogue-filters'
          id='show-code-pack'
        >
          <div className='group1'>
            <input
              type='text'
              name='codePack'
              id='codePack'
              placeholder='Introduce tu código'
              required
              onChange={(e) => setGetCode(e.target.value)} />
            <span className='bar'></span>
          </div>
          <button
            type='submit'
            className='red-btn'
            id='button-code'
          >
            Ver
        </button>
        </form>
        <div>{showProducts()}</div>
      </main>
      <Footer />
    </React.Fragment>
  );
}
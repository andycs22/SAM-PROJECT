import React, { useEffect, useReducer } from 'react';
import { getPack } from '../http/packService';
import { ProductPackListOr } from './ProductPackListOr';
import { ProductPackOr } from './ProductPackOr';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';


function productsPackReducer(state, action) {
  switch (action.type) {
    case 'GET_PRODUCTS_PACK':
      return { ...state, productsPack: action.initialProductsPack };
    case 'SELECT_PRODUCT_PACK':
      return { ...state, selectedProductPack: action.index };
    case 'TOOGLE_PRODUCT_PACK':
      return { ...state, isProductPackOpened: !state.isProductPackOpened };
    default: return state;
  }
}

export function PackOr() {

  const [state, dispatch] = useReducer(productsPackReducer, {
    productsPack: [],
    selectedProductPack: null,
    isProductPackOpened: false
  });

  useEffect(() => {
    getPack().then(response => {
      dispatch({ type: 'GET_PRODUCTS_PACK', initialProductsPack: response.data });
    });
  }, []);

  const selectProductPack = selectedIndex =>
    dispatch({ type: 'SELECT_PRODUCT_PACK', index: selectedIndex });

  const initialProductsPack = state.productsPack;
  console.log(initialProductsPack);
  console.log(state);
  console.log(state.selectedProductPack);

  return (
    <React.Fragment>
      <Header />
      <main className='main-flex'>
        <h1 className='main-title top'>Paquetes publicados</h1>
        <div className='packages-offered'>
          <div className={`grid ${state.isProductPackOpened}`} />
          <div>
            <ProductPackListOr
              productsPack={initialProductsPack}
              selectedIndex={state.selectedProductPack}
              onProductSelectedPack={i => {
                selectProductPack(i);
                dispatch({ type: 'TOGGLE_PRODUCT_PACK' });
              }}
            />
          </div>
          <div>
            {state.selectedProductPack !== null && (
              <ProductPackOr
                defaultProductPack={state.selectedProductPack}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  )
}

import React, { useEffect, useReducer } from 'react';
import { useHistory } from 'react-router';
import { getProductCo } from '../http';
import { deleteProduct } from '../http/ProductService';
import { ProductListCo } from './ProductListCo';
import { ProductCo } from './ProductCo';

function productsReducer(state, action) {

  switch (action.type) {
    case 'GET_PRODUCTS':
      return { ...state, products: action.initialProducts };
    case 'SELECT_PRODUCT':
      return { ...state, selectedProduct: action.index };
    case 'TOOGLE_PRODUCT':
      return { ...state, isProductOpened: !state.isProductOpened };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.id)
      };
    default:
      return state;
  }
}

export function EditProduct() {
  const history=useHistory();
  const [state, dispatch] = useReducer(productsReducer, {
    products: [],
    selectedProduct: null,
    isProductOpened: false
  });

  useEffect(() => {
    getProductCo().then(response => {
      dispatch({ type: 'GET_PRODUCTS', initialProducts: response.data });
    });
  }, []);

  const selectProduct = selectedIndex =>
    dispatch({ type: 'SELECT_PRODUCT', index: selectedIndex });

  const deleteP = async idProduct => {
    await deleteProduct(idProduct);
    dispatch({ type: 'DELETE_PRODUCT', idProduct });
    selectProduct(null);
    dispatch({ type: 'TOOGLE_PRODUCT' });
  };

  const initialProducts = state.products;
  console.log(initialProducts);
  console.log(state);
  console.log(state.selectedProduct);

  return (
    <React.Fragment>
      <main>
        <div className={`grid ${state.isProductOpened}`} />
        <div className='packages-offered'>
        <div>
          <ProductListCo
            products={initialProducts}
            selectedIndex={state.selectedProduct}
            onProductSelected={i => {
              selectProduct(i);
              dispatch({ type: 'TOGGLE_PRODUCT' });
            }}
          />
        </div>
        <div>
          {state.selectedProduct !== null && (
            <ProductCo
              defaultProduct={state.selectedProduct}
              onDeleteProduct={idProduct => deleteP(idProduct)}
            />
          )}
        </div>
        </div>
        <button
          className='white-btn'
          onClick={() => {
            dispatch({ type: 'TOGGLE_PRODUCT' });
            history.goBack();
          }}
        >
          Volver
        </button>
      </main>
    </React.Fragment>
  );
}

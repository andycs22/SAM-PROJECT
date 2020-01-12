import React from 'react';
import { useHistory } from 'react-router';
import { useCart } from '../shared/context/cart-context';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAuth } from '../shared/context/auth-context';
import { orderF } from '../http/orderFinal';

export function ShoppingCart() {
  const { role } = useAuth();
  const {
    cart,
    totalPrice,
    totalItems,
    removeItemFromCart,
    addItemToCart,
    removeItem
  } = useCart();

  const history = useHistory();

  const buy = () => {
    if (role) {
      const order = localStorage.getItem('cart');
      console.log(order);
      const price_final = totalPrice;
      console.log(price_final);
      const orderFinal = { order, price_final };
      console.log(orderFinal);
      history.push('/confirmation');
      return orderF({ orderFinal }).catch(error => {
        console.log(error);
      });
    } else {
      history.push('/login');
    }
  };
  return (
    <React.Fragment>
      <Header />
      <ul>
        {cart.map(item => (
          <li>
            <p>
              <Link to={`/catalogueProduct/${item.id}`}>{item.name}</Link>
              <span>{` ${item.final_price}€ - `}</span>
              <span>{` x ${item.quantity} - `}</span>
              <button
                onClick={e => {
                  e.preventDefault();
                  addItemToCart(item);
                }}
              >
                +
              </button>
              <button
                onClick={e => {
                  e.preventDefault();
                  removeItemFromCart(item);
                }}
              >
                -
              </button>
              <button
                onClick={e => {
                  e.preventDefault();
                  removeItem(item.id);
                }}
              >
                Remove
              </button>
            </p>
          </li>
        ))}
      </ul>
      <p>Total price = {`${totalPrice}€`}</p>
      {totalItems > 0 && <button onClick={buy}>Comprar</button>}
    </React.Fragment>
  );
}


import React, { useState, useContext } from "react";

const CartContext = React.createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addItemToCart = cartItem => {
    let updatedCart = null;

    if (cart.find(item => item.id === cartItem.id)) {
      updatedCart = cart.map(item => {
        if (item.id === cartItem.id) {
          item.quantity++;
        }
        return item;
      });
    } else {
      updatedCart = [{ ...cartItem, quantity: 1 }, ...cart];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItemFromCart = cartItem => {
    let updatedCart = null;

    if (cartItem.quantity > 1) {
      updatedCart = cart.map(item => {
        if (cartItem.id === item.id) {
          item.quantity--;
        }
        return item;
      });
    } else {
      updatedCart = cart.filter(item => cartItem.id !== item.id);
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = id => {
    const updatedCart = cart.filter(cartItem => cartItem.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * parseInt(item.final_price, 0),
    0
  );

  const resetCart = async () => {
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        removeItemFromCart,
        removeItem,
        totalItems,
        totalPrice,
        resetCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context;
}
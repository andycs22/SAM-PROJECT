import React, { useState, useContext } from "react";

const PackContext = React.createContext();

export function PackProvider({ children }) {
  const [pack, setPack] = useState(
    JSON.parse(localStorage.getItem("pack")) || []
  );

  const addItemToPack = packItem => {
    let updatedPack = null;

    updatedPack = [{ ...packItem, quantity: 1 }, ...pack];

    setPack(updatedPack);
    localStorage.setItem("pack", JSON.stringify(updatedPack));
  };

  const removeItem = id => {
    const updatedPack = pack.filter(packItem => packItem.id !== id);
    setPack(updatedPack);
    localStorage.setItem("pack", JSON.stringify(updatedPack));
  };

  const totalItems = pack.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = pack.reduce(
    (acc, item) => acc + 1 * parseInt(item.newPrice, 0),
    0
  );

  const resetPack = async () => {
    localStorage.removeItem("pack");
  };

  return (
    <PackContext.Provider
      value={{
        pack,
        addItemToPack,
        removeItem,
        totalItems,
        totalPrice,
        resetPack
      }}
    >
      {children}
    </PackContext.Provider>
  );
}

export function usePack() {
  const context = useContext(PackContext);
  return context;
}
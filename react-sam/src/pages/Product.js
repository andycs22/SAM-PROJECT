import React, { useState } from 'react';
import { CreateProduct } from '../components/CreateProduct';
import { EditProduct } from '../components/EditProduct';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function Product() {
  const [showCreate, setShowCreate] = useState();
  const [showEdit, setShowEdit] = useState();

  const choiceCreate = () => {
    setShowEdit('');
    setShowCreate(<CreateProduct />);
  };

  const choiceEdit = () => {
    setShowCreate('');
    setShowEdit(<EditProduct />);
  };
  return (
    <React.Fragment>
      <Header />
      <section className='product-co'>
        <h1 className='main-title top'>Gestionar mis productos</h1>
        <section className='select-product'>
          <button className='bto-product' onClick={choiceCreate}>
            Crear producto
          </button>
          <button className='bto-product' onClick={choiceEdit}>
            Editar producto
          </button>
        </section>
        <section className='selection-po'>
          <div>{showCreate}</div>
          <div>{showEdit}</div>
        </section>
      </section>
      <Footer />
    </React.Fragment>
  );
}

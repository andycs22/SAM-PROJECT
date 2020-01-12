import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { updateProduct } from '../http/ProductService';
import { EDITPRODUCT_VALIDATIONS } from '../shared/validations';

export function ProductCo({ defaultProduct = {}, onDeleteProduct }) {
  console.log(defaultProduct);
  const [product, setProduct] = useState(defaultProduct);

  const { register, handleSubmit, setError } = useForm({
    mode: "onBlur"
  });

  const handleUpdate = formData => {
    console.log(formData);
    const idProduct = product.id;
    console.log(idProduct);
    return updateProduct(idProduct, formData).catch(error => {
      setError(error);
    });
  };

  return (
    <div className='product-co' id='edit-prod'>
      <section className='imageData'>
        <img src={defaultProduct.photo} />
      </section>
      <section className='productData'>
        Nombre: <p>{defaultProduct.name}</p>
        Descripción: <p>{defaultProduct.description}</p>
        Categoría: <p>{defaultProduct.category}</p>
      </section>

      <form onSubmit={handleSubmit(handleUpdate)} className='editForm'>
        <div className='group1'>
          <input
            type='number'
            name='init_price'
            placeholder={defaultProduct.init_price}
            ref={register(EDITPRODUCT_VALIDATIONS.init_price)}
          />
          <span class='bar'></span>
          <label>Precio inical</label>
        </div>
        <div className='group1'>
          <input
            type='number'
            name='discount'
            placeholder={defaultProduct.discount}
            ref={register(EDITPRODUCT_VALIDATIONS.discount)}
          />
          <span class='bar'></span>
          <label>Descuento</label>
        </div>
        <div className='group1'>
          <input
            type='number'
            name='final_price'
            placeholder={defaultProduct.final_price}
            ref={register(EDITPRODUCT_VALIDATIONS.final_price)}
          />
          <span class='bar'></span>
          <label>Precio de venta</label>
        </div>
        <button type='submit' className='send-btn'>
          Guardar cambios
        </button>
      </form>
      <div className='delete-btn'>
        <button
          onClick={e => {
            e.preventDefault();
            onDeleteProduct(product.id);
          }}
          className='send-btn'
        >
          <a href='/'></a>Borrar
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { updateProduct } from '../http/ProductService';
import { EDITPRODUCT_VALIDATIONS } from '../shared/validations';
import {useHistory} from 'react-router';
export function ProductCo({ defaultProduct = {}, onDeleteProduct }) {
  console.log(defaultProduct);
  const [product, setProduct] = useState(defaultProduct);

  const { register, handleSubmit, setError } = useForm({
    mode: 'onBlur'
  });
const history=useHistory();
  const handleUpdate = formData => {
    console.log(formData);
    const idProduct = product.id;
    console.log(idProduct);
    return updateProduct(idProduct, formData)
    .then(response => alert(response.data))
    .then(history.push('/personalAccount'))
      .catch(error => {
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
          <label>Precio inical</label>
          <input
            type='number'
            name='init_price'
            placeholder={defaultProduct.init_price}
            ref={register(EDITPRODUCT_VALIDATIONS.init_price)}
          />
          <span className='bar'></span>
        </div>
        <div className='group1'>
          <label>Descuento</label>
          <input
            type='number'
            name='discount'
            placeholder={defaultProduct.discount}
            ref={register(EDITPRODUCT_VALIDATIONS.discount)}
          />
          <span className='bar'></span>
        </div>
        <div className='group1'>
          <label>Precio de venta</label>
          <input
            type='number'
            name='final_price'
            placeholder={defaultProduct.final_price}
            ref={register(EDITPRODUCT_VALIDATIONS.final_price)}
          />
          <span className='bar'></span>
        </div>
        <button type='submit' className='white-btn'>
          Guardar cambios
        </button>
      </form>

      <button
        onClick={e => {
          e.preventDefault();
          onDeleteProduct(product.id)
          .then(window.location.reload())
          .then(alert('producto eliminado de la oferta'));
        }}
        className='red-btn'
      >
        <a href='/'></a>Eliminar oferta
      </button>
    </div>
  );
}

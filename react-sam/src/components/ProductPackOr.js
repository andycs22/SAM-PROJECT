import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import { updateProductPack } from '../http/packService';
import { EDITPRODUCT_VALIDATIONS } from '../shared/validations';

export function ProductPackOr({ defaultProductPack = {} }) {
  console.log(defaultProductPack);
  const { register, handleSubmit, setError } = useForm({
    mode: "onBlur"
  });

  const handleUpdate = formData => {
    console.log(formData);
    const idProductPack = defaultProductPack.id;
    console.log(idProductPack);
    return updateProductPack(idProductPack, formData)
      .then(response => alert(response.data))
      .catch(error => {
        setError(error);
      });
  };

  return (
    <div className='product-co' id='edit-prod-pack'>
      <section className='productData'>
        <div>
          <h2>
            <span className='code'>{defaultProductPack.code_package}</span>
          </h2>
        </div>

      </section>

      <form onSubmit={handleSubmit(handleUpdate)} className='editForm'>
        <div className='group1'>
          <p>Fecha fin actual:</p>
          <p className='whi'>{(defaultProductPack.date_end).substring(0, 10)}</p>
          <label>Modifica la fecha de fin:</label>
          <input
            type='date'
            name='date_end'
            ref={register(EDITPRODUCT_VALIDATIONS.init_price)}
          />
        </div>
        <button className='red-btn' type='submit'>
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
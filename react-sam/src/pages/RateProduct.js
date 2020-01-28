import React from 'react';
import useForm from 'react-hook-form';
import { rate } from '../http/rateService';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useParams, useHistory } from 'react-router';

export function RateProduct() {
  const { register, formState, handleSubmit, setError } = useForm({
    mode: 'onBlur'
  });
  const history = useHistory();
  const params = useParams();
  const productId = params.productId;

  const handleRate = formData => {
    console.log(formData);
    return rate(formData, productId)
      .then(response => alert(response.data))
      .then (history.push('/catalogue'))
      .catch(error => {
        alert('ya ha valorado este producto con anterioridad');
        setError(error);
      });
  };

  return (
    <React.Fragment>
      <Header />
      <main className='main-rate'>
        <h1 className='main-title top'>Tu opinión nos importa</h1>
        <form
          onSubmit={handleSubmit(handleRate)}
          name='rate'
          className='form-rate'
        >
          <div className='group2'>
            Valoración
            <select name='value' id='document_type' ref={register({})}>
              <option>Seleccionar</option>
              <option value='5'>EXCELENTE</option>
              <option value='4'>MUY BUENO</option>
              <option value='3'>BUENO</option>
              <option value='2'>CUMPLE</option>
              <option value='1'>MALO</option>
            </select>
          </div>
          <div className='group1'>
            <label>Mi opinión</label>
            <textarea
              name='comment'
              id='comment'
              cols='30'
              rows='3'
              ref={register({})}
            ></textarea>
            <span className='bar'></span>
          </div>
          <button
            className='red-btn'
            type='submit'
            id='send'
            disabled={formState.isSubmitting}
          >
            VALORAR
          </button>
        </form>
        <a
          href='/'
          className='white-btn'
          onClick={e => {
            e.preventDefault();
            history.goBack();
          }}
        >
          Volver
        </a>
      </main>
      <Footer />
    </React.Fragment>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../shared/context/auth-context';
import useForm from 'react-hook-form';
import { REGISTER_VALIDATIONS } from '../shared/validations';
import { ButtonsType } from '../components/ButtonsType';
import logo from '../assets/images/SAMlogotipoBlanco.png';

export function Register() {
  const { signUp } = useAuth();

  const { register, errors, formState, handleSubmit, setError } = useForm({
    mode: 'onBlur'
  });

  const handleSignUp = formData => {
    console.log(formData);
    return signUp(formData).catch(error => {
      if (error.response.status === 409) {
        setError(
          'email',
          'conflict',
          'The email already exists. Please try again'
        );
      }
    });
  };

  const [type, setType] = useState('');
  console.log(type.length);

  const isType = () => {
    if (type.length === 0) {
      return 'Registro';
    }
    if (type === 'colaborator') {
      return 'Registrarse como COLABORADOR';
    }
    if (type === 'organizer') {
      return 'Registrarse como ORGANIZADOR';
    }
    if (type === 'buyer') {
      return 'Registrarse como COMPRADOR';
    }
  };

  return (
    <main className='main-register'>
      <Link to='/'>
        <img src={logo} alt='logo' />
      </Link>
      <h2 className='red'>Escoge como vivir tu experiencia</h2>
      <ButtonsType onTypeChange={setType} />
      {type.length > 0 && (
        <form
          onSubmit={handleSubmit(handleSignUp)}
          name='registry'
          className='form-register'
        >
          <h1>{isType()}</h1>
          <select
            name='user_type'
            id='user_type'
            className='hidden'
            ref={register({})}
          >
            <option value={type}></option>
          </select>
          <div className='group1'>
            <input type='text' name='name' ref={register({})} required/>
            <span className='bar'></span>
            <label className='label'>Nombre / Razón social:</label>
          </div>
          <div className='group1'>
            <input type='text' name='surname' ref={register({})} placeholder='Apellidos'/>
            <span className='bar'></span>
          </div>
          <div className='group1' id='span-mail'>
            <input
              type='email'
              name='email'
              id='email'
              ref={register(REGISTER_VALIDATIONS.email)}
              required
              />
            <span className='bar'>{errors.email && errors.email.message}</span>
              <label className='label'>Email:</label>
          </div>
          <div className='group1'>
            <input
              type='password'
              name='password'
              id='password'
              ref={register({})}
            />
            <span className='bar'></span>
            <label className='label'>Contraseña:</label>
          </div>
          <div className='group1'>
            <label className='label-docu'>Documento:</label>
            <select name='document_type' id='document_type' ref={register({})}>
              <option value='dni'>DNI</option>
              <option value='nie'>NIE</option>
              <option value='cif'>CIF</option>
            </select>
            <input
              type='text'
              name='document_number'
              id='document_number'
              ref={register({})}
            />
            <span className='bar'></span>
          </div>
          <div className='group1'>
            <label>Fecha de nacimiento:</label>
            <input
              type='date'
              name='birth_date'
              id='birth_date'
              ref={register({})}
            />
            <span className='bar'></span>
          </div>
          <div className='group1'>
            <input type='phone' name='phone' id='phone' ref={register({})} required/>
            <span className='bar'></span>
          <label className='label'>Teléfono:</label>
          </div>
          <button
            className='red-btn'
            type='submit'
            id='send'
            disabled={formState.isSubmitting}
          >
            REGISTRARSE
          </button>
          <div className='cancel'>
            <Link to='/'>CANCELAR</Link>
          </div>
        </form>
      )}
    </main>
  );
}

import React from 'react';
import useForm from 'react-hook-form';
import { Link } from 'react-router-dom';
import { editPassword } from '../http/authService';
import { REGISTER_VALIDATIONS } from '../shared/validations';
import { useHistory } from 'react-router';
import logo from '../assets/images/logo-a.png';

export function EditPassword() {
  const { register, handleSubmit, setError } = useForm({
    mode: 'onBlur'
  });
  const history = useHistory();

  const editP = formData => {
    console.log(formData);
    return editPassword(formData)
      .then(response => alert(response.data))
      .then(history.push('/login'))
      .catch(error => {
        setError(error);
      });
  };
  return (
    <React.Fragment>
      <main className='main-edit-password'>
        <Link to='/'>
          <img src={logo} alt='logo' />
        </Link>
        <section className='form-edit-password'>
          <h3>Editar contraseña</h3>
          <form onSubmit={handleSubmit(editP)} className='editForm'>
            <div className='group1'>
              <label>Contraseña antigua</label>
              <input
                type='password'
                name='oldPassword'
                ref={register(REGISTER_VALIDATIONS.password)}
              />
              <span className='bar'></span>
            </div>
            <div className='group1'>
              <label>Nueva contraseña</label>
              <input
                type='password'
                name='newPassword'
                ref={register(REGISTER_VALIDATIONS.password)}
              />
              <span className='bar'></span>
            </div>
            <div className='group1'>
              <label>Repetir contraseña</label>
              <input
                type='password'
                name='repeatPassword'
                ref={register(REGISTER_VALIDATIONS.password)}
              />
              <span className='bar'></span>
            </div>
            <button type='submit' className='red-btn'>
              Cambiar contraseña
            </button>
          </form>
          <a
            href='/'
            className='return-btn'
            onClick={e => {
              e.preventDefault();
              history.goBack();
            }}
          >
            Volver
          </a>
        </section>
      </main>
    </React.Fragment>
  );
}

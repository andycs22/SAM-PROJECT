import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useAuth } from '../shared/context/auth-context';
import { useHistory } from 'react-router-dom';
import { deleteAccount } from '../http/authService';

export function PersonalAccount() {
  const { logout, role } = useAuth();
  const history = useHistory();

  const out = () => {
    logout();
    history.push('/');
  };

  const delAccount = () => {
    const reply = prompt(
      'esta seguro de que quiere eliminar la cuenta ? (y / Y)'
    );
    if (reply === 'y' || reply === 'Y') {
      deleteAccount();
      history.push('/catalogue');
    }
  };

  return (
    <React.Fragment>
      <Header />
      <main className='personal'>
      <h1 className='main-title top'>Mi Cuenta</h1>
      <div>
        <section className='main-personalAccount'>
          <div className='ul'>
            <Link to='/password'>MODIFICAR CONTRASEÑA</Link>
            {role === 'colaborator' && (
              <Link to='/productCo'>GESTIONAR MIS PRODUCTOS</Link>
            )}
            {role === 'organizer' && (
              <Link to='/packOr'>GESTIONAR MIS PAQUETES</Link>
            )}
            <Link to='/ordersHistory'>VER HISTORIAL DE PEDIDOS</Link>
            <div onClick={out}>CERRAR SESIÓN</div>
            <div onClick={delAccount}>ELIMINAR CUENTA</div>
          </div>
        </section>
      </div>
      </main>
      <Footer />
    </React.Fragment >
  );
}

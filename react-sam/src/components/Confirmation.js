import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { usePack } from '../shared/context/package-context';
import { useAuth } from '../shared/context/auth-context';

import Lottie from 'react-lottie';
import noteData from '../assets/lotties/cart.json';

const defaultOptions = {
  loop: false,
  autoplay: true,
  renderSettings: {
    preserveAspectRatio: 'xMidyMid slice'
  }
};

function Confirmation() {
  const { code } = usePack();

  const history = useHistory();

  const goCatalogue = () => history.push('/catalogue');
  console.log(code);
  return (
    <React.Fragment>
      <Header />
      <div className='top'>
        {code.length > 0 && (
          <div>
            <p>
              CODIGO GENERADO: <span className='code'>{code}</span>
            </p>
            <button
              className='btn-white'
              onClick={() => window.location.reload()}
            >Copiado
            </button>
            <p>Gracias por usar SAM</p>
          </div>
        )}
        {code.length === 0 && (
          <div>
            <p className='main-title'>Gracias por usar SAM</p>
            <div className='animation-cart'>
              <Lottie options={{ animationData: noteData, ...defaultOptions }} />
            </div>
          </div>
        )}
        <button className='white-btn' onClick={goCatalogue}>
          Seguir comprando
        </button>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export { Confirmation };

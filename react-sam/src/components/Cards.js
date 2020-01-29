import React from 'react';
import { Link } from 'react-router-dom';


import colaborador from '../assets/images/colaborador.jpg';
import organizador from '../assets/images/organizador.jpg';
import comprador from '../assets/images/usuario.jpg';


export function Cards () {



    return (
        
    <div className='home-cards'>
       <div className='card'>
           <div className='photo-card'>
           <img src={colaborador}></img>
           </div>
           <div className='description-card'>
               <h2>Colaborador</h2>
               <p>Sube tu software a nuestra plataforma
                   y verás como tus ventas aumentan 
                   gracias a nuestra amplia red de organizadores.
               </p>
               <div className='reg-cards'>
            <Link to='/'> > Regístrate</Link>  
            </div> 
           </div>

        </div>         
        <div className='card'>
           <div className='photo-card'>
               <img src={organizador}></img>
           </div>
           <div className='description-card'>
               <h2>Organizador</h2>
               <p>Elige entre nuestro amplio y variado
                   catálogo y crea increibles paquetes de
                   software con los descuentos que tu elijas. 
               </p>
               <div className='reg-cards'>
            <Link to='/'> > Regístrate</Link>  
            </div>    
           </div>

        </div>         
        <div className='card'>
           <div className='photo-card'>
           <img src={comprador}></img>
           </div>
           <div className='description-card'>
               <h2>Comprador</h2>
               <p>Regístrate en nuestra web y descubre nuestro
                   fantástico catálogo lleno de apps y herramientas
                   con increíbles descuentos.
               </p>
               <div className='reg-cards'>
            <Link to='/'> > Regístrate</Link>  
            </div>    
           </div>

        </div>         
    </div>
    )
}




import React from 'react';
import { Link } from 'react-router-dom';


import colaborador from '../assets/images/colaborador.jpg';
import organizador from '../assets/images/organizador.jpg';
import comprador from '../assets/images/usuario.jpg';


export function Cards () {
    return (
        
        <div class="wrap">
		<div class="tarjeta-wrap">
			<div class="tarjeta">
				<div class="adelante card1"></div>
				<div class="atras">
                <h2>Colaborador</h2>        
					<p>Sube tus productos de software en nuestra web y verás aumentar tus ventas gracias a nuestra amplia red de usuarios</p>
				</div>
			</div>
		</div>
		<div class="tarjeta-wrap">
			<div class="tarjeta">
				<div class="adelante card2"></div>
				<div class="atras">
                <h2>Organizador</h2>            
					<p>Crea tus paquetes de software seleccionando las aplicaciones que elijas y con los descuentos que quieras ofrecer a tus invitados</p>
				</div>
			</div>
		</div>
		<div class="tarjeta-wrap">
			<div class="tarjeta">
				<div class="adelante card3"></div>
				<div class="atras">
                    <h2>Comprador</h2>                    
					<p>Disfruta en nuestra web de grandes descuentos en software.</p>
				</div>
			</div>
		</div>
	</div>
    )
}

/* */





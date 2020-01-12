import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { useCart } from '../shared/context/cart-context';
import { usePack } from '../shared/context/package-context';
import { useAuth } from '../shared/context/auth-context';
import { getCatalogueProduct } from '../http/CatalogueService';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import useForm from 'react-hook-form';
import { EDITPRODUCT_VALIDATIONS } from '../shared/validations';

export function CatalogueProduct() {
  const [product, setProduct] = useState();
  const [rate, setRate] = useState([]);
  const params = useParams();
  const history = useHistory();
  const { addItemToCart } = useCart();
  const { addItemToPack } = usePack();
  const { role } = useAuth();

  const { register, handleSubmit, setError } = useForm({
    mode: "onBlur"
  });

  const [productOffered, setProductOffered] = useState();

  useEffect(() => {
    getCatalogueProduct(params.productId)
      .then(response => setProduct(response.data));
  }, [params.producId]);
  
  console.log(product);
  if (!product) return null;

  const rateOfTheProduct = () => {
    let total = 0;
    let num = 0;
    for (let rate in product) {
      total += product[rate].value_in_rate;
      num += 1;
    }
    const result = total / num;
    if (isNaN(result)) {
      return 'sin valoraciones'
    } else {
      return result;
    }
  }

  const showRate = () => {
    const rat = [];
    for (let rate in product) {
      let r = { value: product[rate].value_in_rate, date: (product[rate].date_comment).substring(0, 10), comment: product[rate].comment_in_rate }
      rat.push(r);
    }
    setRate(rat);
  }
  console.log(rate);

  const showRates = () => {
    return (
      <ul>
        {rate.map(r => (
          <li key={rate.id}>
            <div>
              <p>Puntuación: {r.value}</p>
              <p>Fecha de comentario: {r.date}</p>
              <p>Comentario: {r.comment}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }
  console.log(rate);

  const handleModif = formData => {
    console.log(formData);
    setProductOffered(formData);
    // addItemToPack(productOffered)
  }

  return (
    <React.Fragment>
      <Header />
      <div>
        <div>
          <img src={product[0].photo} alt='ip' />
          <p>{product[0].name}</p>
          <p>Valoración media: {rateOfTheProduct()}  {!isNaN(rateOfTheProduct()) && (<button onClick={showRate}>Ver valoraciones</button>)}</p>
          <p>{product[0].description}</p>
          <p>
            <span className="iprice">{`${product[0].init_price}€ `}</span>
            ...<span className="dis">{` -${product[0].discount}% `}</span>
            ...<span className="fprice">{` ${product[0].final_price}€`}</span>
          </p>
        </div>
        <div>{showRates()}</div>
        {role === 'organizer' && (
          <form onSubmit={handleSubmit(handleModif)}>
            <h2>Editar producto para ofertar</h2>
            <input type='number' name='productId' value={product[0].id} ref={register(EDITPRODUCT_VALIDATIONS.productId)} className='inputHidden' />
            <input type='text' name='name' value={product[0].name} ref={register(EDITPRODUCT_VALIDATIONS.theRest)} className='inputHidden' />
            <input type='number' name='oldPrice' value={product[0].final_price} ref={register(EDITPRODUCT_VALIDATIONS.theRest)} className='inputHidden' />

            <label>Descuento adicional: </label>
            <input type='number' name='discount' ref={register(EDITPRODUCT_VALIDATIONS.discount)} />
            <label>Precio Oferta:</label>
            <input type='number' name='newPrice' ref={register(EDITPRODUCT_VALIDATIONS.final_price)} />
            <button type='submit'>Guardar</button>
          </form>
        )}
        <a
          href="/"
          onClick={e => {
            e.preventDefault();
            history.goBack();
          }}
        >
          Back
      </a>
        {role === 'organizer' && (
          // <button onClick={formPack()}>Ofertar en paquete</button>
          <button onClick={() => addItemToPack(productOffered)}>Añadir a paquete</button>
        )}
        <button onClick={() => addItemToCart(product[0])}>Añadir al carrito</button>
      </div>
      <Footer />
    </React.Fragment>
  );
}
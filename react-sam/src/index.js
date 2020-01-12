import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './shared/context/auth-context';
import { CartProvider } from './shared/context/cart-context';
import { PackProvider } from './shared/context/package-context';
import { PrivateRoute } from './components/PrivateRoute';

import './styles.css';
import { NotFound } from './pages/NotFound';
import { Homepage } from './pages/Homepage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Catalogue } from './pages/Catalogue';
import { Fqa } from './pages/Fqa';
import { Legal } from './pages/Legal';
import { ProfileColaborator } from './pages/ProfileColaborator';
import { ProfileOrganizer } from './pages/ProfileOrganizer';
import { ProfileBuyer } from './pages/ProfileBuyer';
import { About } from './pages/About';
import { Product } from './pages/Product';
import { ShoppingCart } from './pages/ShoppingCart';
import { Confirmation } from './components/Confirmation';
import { CatalogueProduct } from './components/CatalogueProduct';
import { OrderHistory } from './pages/OrderHistory';
import { RateProduct } from './pages/RateProduct';
import { PackOr } from './components/PackOr';
import { CreatePack } from './pages/CreatePack';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <PackProvider>
            <Switch>
              <Route exact path='/'>
                <Homepage />
              </Route>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/register'>
                <Register />
              </Route>
              <Route path='/catalogue'>
                <Catalogue />
              </Route>
              <Route path='/catalogueProduct/:productId'>
                <CatalogueProduct />
              </Route>
              <Route path="/ShoppingCart">
                <ShoppingCart />
              </Route>
              <Route path="/confirmation">
                <Confirmation />
              </Route>
              <Route path='/ordersHistory'>
                <OrderHistory />
              </Route>
              <Route path='/rateProduct/:productId'>
                <RateProduct />
              </Route>
              <Route path='/fqa'>
                <Fqa />
              </Route>
              <Route path='/legal'>
                <Legal />
              </Route>
              <Route path='/about'>
                <About />
              </Route>
              <PrivateRoute exact path='/profileBuyer' allowedRole='buyer'>
                <ProfileBuyer />
              </PrivateRoute>
              <PrivateRoute exact path='/profileColaborator' allowedRole='colaborator'>
                <ProfileColaborator />
              </PrivateRoute>
              <PrivateRoute exact path='/productCo' allowedRole='colaborator'>
                <Product />
              </PrivateRoute>
              <PrivateRoute exact path='/profileOrganizer' allowedRole='organizer'>
                <ProfileOrganizer />
              </PrivateRoute>
              <PrivateRoute exact path='/packOr' allowedRole='organizer'>
                <PackOr />
              </PrivateRoute>
              <PrivateRoute exact path='/createPack' allowedRole='organizer'>
                <CreatePack />
              </PrivateRoute>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </PackProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

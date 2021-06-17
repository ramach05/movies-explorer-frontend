/* eslint-disable max-len */
import { React, useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router';

import './App.css';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Navigation from '../Navigation/Navigation';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// import Authentification from '../Authentification/Authentification';
import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Preloader from '../Preloader/Preloader';
import Promo from '../Promo/Promo';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import NavTab from '../NavTab/NavTab';

function App() {
  const [isLogged, setIsLogged] = useState(true);
  const [isAuthentificationRoute, setIsAuthentificationRoute] = useState(false);
  const location = useLocation();

  let AuthentificationRoute;

  if (location.pathname !== '/signin' && location.pathname !== '/signup') {
    AuthentificationRoute = false;
  } else {
    AuthentificationRoute = true;
  }

  console.log('AuthentificationRoute :>> ', AuthentificationRoute);

  return (
    <>
      <div className="body">
        <div className="page">
          {isLogged
            ? (
              <>
                {!AuthentificationRoute ? <Header /> : null}
                <Switch>
                  <Route exact path="/" render={() => <Main />} />
                  <Route exact path="/movies" render={() => <Movies />} />
                  <Route exact path="/saved-movies" render={() => <SavedMovies />} />
                  <Route exact path="/profile" render={() => <Profile />} />
                  <Route exact path="/signin" render={() => (<Login isLogged={isLogged} />)} />
                  <Route exact path="/signup" render={() => (<Register isLogged={isLogged} />)} />
                  <Route path="*" render={() => <NotFoundPage />} />
                </Switch>
                {!AuthentificationRoute ? <Footer /> : null}
              </>
            ) : (
              <>
                <Switch>
                  <Route exact path="/signin" render={() => (<Login isLogged={isLogged} />)} />
                  <Route exact path="/signup" render={() => (<Register isLogged={isLogged} />)} />
                  <Route path="*" render={() => <NotFoundPage />} />
                </Switch>
              </>
            )}
        </div>
      </div>
    </>
  );
}

export default App;

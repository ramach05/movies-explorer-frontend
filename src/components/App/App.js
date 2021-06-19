/* eslint-disable max-len */
import { React, useState } from 'react';
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
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
  const [isLogged, setIsLogged] = useState(true);
  const [isOpenNavigation, setIsOpenNavigation] = useState(false);
  const location = useLocation();

  const authentificationRoute = ['/signin', '/signup'].includes(location.pathname);
  const menuRoute = ['/movies', '/saved-movies', '/profile'].includes(location.pathname);

  return (
    <>
      <div className="body">
        <div className="page">
          {isLogged
            ? (
              <>
                {!authentificationRoute ? (
                  <Header
                    setIsOpenNavigation={setIsOpenNavigation}
                    menuRoute={menuRoute}
                  />
                ) : null}
                <Navigation
                  isOpenNavigation={isOpenNavigation}
                  setIsOpenNavigation={setIsOpenNavigation}
                  menuRoute={menuRoute}
                />

                <Switch>
                  <Route exact path="/" render={() => <Main />} />
                  <Route exact path="/movies" render={() => <Movies />} />
                  <Route exact path="/saved-movies" render={() => <SavedMovies />} />
                  <Route exact path="/profile" render={() => <Profile />} />
                  <Route exact path="/signin" render={() => (<Login isLogged={isLogged} />)} />
                  <Route exact path="/signup" render={() => (<Register isLogged={isLogged} />)} />
                  <Route path="*" render={() => <NotFoundPage />} />
                </Switch>

                {!authentificationRoute ? <Footer /> : null}
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

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
import { useAppContext } from '../../utils/AppContext';

function App() {
  const { isLogged, setIsLogged } = useAppContext();
  const [isOpenNavigation, setIsOpenNavigation] = useState(false);
  const location = useLocation();

  const authentificationRoute = ['/signin', '/signup'].includes(location.pathname);
  const profileRoute = ['/profile'].includes(location.pathname);
  const menuRoute = ['/movies', '/saved-movies', '/profile'].includes(location.pathname);

  return (
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
                // menuRoute={menuRoute}
              />

              <Switch>
                <Route exact path="/" render={() => <Main />} />
                <Route exact path="/movies" render={() => <Movies />} />
                <Route exact path="/saved-movies" render={() => <SavedMovies />} />
                <Route exact path="/profile" render={() => <Profile />} />
                <Route
                  exact
                  path="/signin"
                  render={() => (
                    <Login />
                  )}
                />
                <Route
                  exact
                  path="/signup"
                  render={() => (
                    <Register />
                  )}
                />
                <Route path="*" render={() => <NotFoundPage />} />
              </Switch>

              {(!authentificationRoute && !profileRoute) ? <Footer /> : null}
            </>
          ) : (
            <>
              { !authentificationRoute ? (
                <Header
                  setIsOpenNavigation={setIsOpenNavigation}
                  menuRoute={menuRoute}
                />
              ) : null }

              <Switch>
                <Route exact path="/" render={() => <Main />} />
                <Route
                  exact
                  path="/signin"
                  render={() => (
                    <Login />
                  )}
                />
                <Route
                  exact
                  path="/signup"
                  render={() => (
                    <Register />
                  )}
                />
                <Route path="*" render={() => <NotFoundPage />} />
              </Switch>

              { !authentificationRoute ? <Footer /> : null }
            </>
          )}
      </div>
    </div>
  );
}

export default App;

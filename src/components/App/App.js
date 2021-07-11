import { React, useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';

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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import apiMain from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';

function App() {
  const {
    isLogged, setIsLogged, currentUser, setCurrentUser,
  } = useAppContext();
  const [isCheckToken, setIsCheckToken] = useState(false);
  const [isOpenNavigation, setIsOpenNavigation] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const authentificationRoute = ['/signin', '/signup'].includes(location.pathname);
  const profileRoute = ['/profile'].includes(location.pathname);
  const menuRoute = ['/movies', '/saved-movies', '/profile'].includes(location.pathname);

  useEffect(() => {
    apiMain.updateHeaders();

    apiMain.getMe()
      .then((myData) => {
        setCurrentUser(myData.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLogged, setCurrentUser]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (localStorage.getItem('token')) {
      apiMain.updateHeaders();

      apiMain.checkToken({ token })
        .then((data) => {
          if (data.user._id === currentUser._id) {
            setIsLogged(true);
            setIsCheckToken(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLogged(false);
          setIsCheckToken(true);
          localStorage.removeItem('token');
        });
    } else {
      setIsCheckToken(true);
    }
  }, [currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleClosePopup(e) {
    if (
      e.target.classList.contains('navigation_open')
      || e.target.classList.contains('navigation__close-button')
      || e.key === 'Escape'
    ) {
      setIsOpenNavigation(false);
      window.removeEventListener('keydown', handleClosePopup);
    }
  }

  return isCheckToken ? (
    <div className="body">
      <div className="page">

        {isLogged
          ? (
            <>
              {!authentificationRoute ? (
                <Header
                  setIsOpenNavigation={setIsOpenNavigation}
                  menuRoute={menuRoute}
                  handleClosePopup={handleClosePopup}
                />
              ) : null}

              <Navigation
                isOpenNavigation={isOpenNavigation}
                setIsOpenNavigation={setIsOpenNavigation}
                handleClosePopup={handleClosePopup}
              />

              <Switch>
                <Route exact path="/" render={() => <Main />} />
                <Route exact path="/about-project" render={() => <Main />} />

                <Route
                  exact
                  path="/movies"
                  render={() => <Movies />}
                />
                <Route
                  exact
                  path="/saved-movies"
                  render={() => <SavedMovies />}
                />
                <Route
                  exact
                  path="/profile"
                  render={() => <Profile />}
                />

                <Route
                  path="*"
                  render={() => <NotFoundPage />}
                />
              </Switch>

              {!profileRoute ? <Footer /> : null}
            </>
          ) : (
            <>
              { !authentificationRoute ? (
                <Header
                  setIsOpenNavigation={setIsOpenNavigation}
                  menuRoute={menuRoute}
                  handleClosePopup={handleClosePopup}
                />
              ) : null }

              <Switch>
                <Route exact path="/" render={() => <Main />} />
                <Route exact path="/about-project" render={() => <Main />} />

                <Route
                  exact
                  path="/signin"
                  render={() => (<Login />)}
                />
                <Route
                  exact
                  path="/signup"
                  render={() => (<Register />)}
                />

                <ProtectedRoute
                  component={Main}
                  menuRoute={menuRoute}
                  profileRoute={profileRoute}
                />
              </Switch>

              { !authentificationRoute ? <Footer /> : null }
            </>
          )}

      </div>
    </div>
  )
    : (
      <div className="initial-preloader">
        <Preloader />
      </div>
    );
}

export default App;

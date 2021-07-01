import { React, useState, useEffect } from 'react';
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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import apiMain from '../../utils/MainApi';

function App() {
  const {
    isLogged, setIsLogged, currentUser, setCurrentUser,
  } = useAppContext();
  const [isOpenNavigation, setIsOpenNavigation] = useState(false);
  const location = useLocation();

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
  }, [isLogged]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (localStorage.getItem('token')) {
      apiMain.checkToken({ token })
        .then((data) => {
          apiMain.updateHeaders();
          if (data.user._id === currentUser._id) {
            setIsLogged(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLogged(false);
          localStorage.removeItem('token');
        });
    }
  }, [isLogged, currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

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
  );
}

export default App;

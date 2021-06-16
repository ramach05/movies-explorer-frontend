import { React, useState } from 'react';
import { Route, Switch } from 'react-router';

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

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoginRoute, setIsLoginRoute] = useState(false);
  const [isRegisterRoute, setIsRegisterRoute] = useState(false);
  const [isMainRoute, setIsMainRoute] = useState(true);

  return (
    <>
      <div className="body">
        <div className="page">
          {isLogged
            ? (
              <>
                <Header />
                <Switch>
                  <Route exact path="/" render={() => <Main />} />
                  <Route exact path="/movies" render={() => <Movies />} />
                  <Route
                    exact
                    path="/saved-movies"
                    render={() => <SavedMovies />}
                  />
                  <Route exact path="/profile" render={() => <Profile />} />
                </Switch>
                <Footer />

                <Switch>
                  <Route
                    exact
                    path="/signin"
                    render={() => (
                      <Login isLogged={isLogged} />
                    )}
                  />
                  <Route
                    exact
                    path="/signup"
                    render={() => (
                      <Register isLogged={isLogged} />
                    )}
                  />
                  <Route path="*">
                    <NotFoundPage />
                  </Route>
                </Switch>
              </>
            ) : (
              <>
                <Switch>
                  <Route
                    exact
                    path="/signin"
                    render={() => (
                      <Login isLogged={isLogged} />
                    )}
                  />
                  <Route
                    exact
                    path="/signup"
                    render={() => (
                      <Register isLogged={isLogged} />
                    )}
                  />
                  <Route path="*">
                    <NotFoundPage />
                  </Route>
                </Switch>
              </>
            )}
        </div>
      </div>
    </>
  );
}

export default App;

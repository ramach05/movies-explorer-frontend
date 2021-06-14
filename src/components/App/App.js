import { React, useState } from 'react';
import { Route, Switch } from 'react-router';

import './App.css';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Authentication from '../Authentication/Authentication';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginRoute, setIsLoginRoute] = useState(true);
  const [isRegisterRoute, setIsRegisterRoute] = useState(true);
  const [isMainRoute, setIsMainRoute] = useState(true);

  return (
    <>
      <div className="body">
        <div className="page">
          {isLoggedIn && isMainRoute && (
            <>
              {!isLoginRoute && !isRegisterRoute && <Header />}
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
              {!isLoginRoute && !isRegisterRoute && <Footer />}
            </>
          )}

          {(!isLoggedIn || isRegisterRoute || isLoginRoute) && (
            <>
              <Switch>
                <Route
                  exact
                  path="/signin"
                  render={() => (
                    <Authentication
                      isLoggedIn={isLoggedIn}
                      isRegisterRoute={isRegisterRoute}
                      setIsLoginRoute={setIsLoginRoute}
                      setIsRegisterRoute={setIsRegisterRoute}
                    />
                  )}
                />
                <Route
                  exact
                  path="/signup"
                  render={() => (
                    <Authentication
                      isLoggedIn={isLoggedIn}
                      isRegisterRoute={isRegisterRoute}
                      setIsLoginRoute={setIsLoginRoute}
                      setIsRegisterRoute={setIsRegisterRoute}
                    />
                  )}
                />
              </Switch>
            </>
          )}

          <Route path="*">
            {/* {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />} */}
          </Route>
        </div>
      </div>
    </>
  );
}

export default App;

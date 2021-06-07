import { Route, Switch, Redirect } from "react-router";

import "./App.css";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function App() {
  return (
    <>
      <div className="body">
        <div className="page">
          <Header />

          <Switch>
            <Route exact path="/" render={() => <Main />} />
            <Route exact path="/movies" render={() => <Movies />} />
            <Route exact path="/saved-movies" render={() => <SavedMovies />} />
            <Route exact path="/profile" render={() => <Profile />} />
            <Route
              exact
              path="/signin"
              render={() => (
                <Login
                // setIsLoggedIn={setIsLoggedIn}
                // setIsGetLogged={setIsGetLogged}
                // setIsRegisted={setIsRegisted}
                // setIsInfoTooltipPopupOpen={setIsInfoTooltipPopupOpen}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={() => (
                <Register
                // setIsSingInPage={setIsSingInPage}
                // setIsInfoTooltipPopupOpen={setIsInfoTooltipPopupOpen}
                // setIsRegisted={setIsRegisted}
                // setIsGetLogged={setIsGetLogged}
                />
              )}
            />

            {/* <ProtectedRoute
          exact
          path="/"
          // onCardClick={handleCardClick}
          // onEditProfile={handleEditProfileClick}
          // onAddPlace={handleAddPlaceClick}
          // onEditAvatar={handleEditAvatarClick}
          // onCardLike={handleCardLike}
          // onConfirmCardDelete={handleConfirmCardDelete}
          // cards={cards}
          component={Main}
        /> */}

            <Route path="*">{/* <Redirect to="/" /> */}</Route>
          </Switch>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;

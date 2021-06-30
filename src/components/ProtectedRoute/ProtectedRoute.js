import { React } from 'react';
import { Redirect, Switch, Route } from 'react-router';
import { useAppContext } from '../../utils/AppContext';

import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Login from '../Login/Login';
import Register from '../Register/Register';

const ProtectedRoute = ({
  component: Component,
  menuRoute,
  profileRoute,
  authentificationRoute,
}) => {
  const { isLogged, setIsLogged } = useAppContext();

  if (!isLogged) {
    if (menuRoute && profileRoute) {
      return <Redirect to="/" />;
    } if (authentificationRoute) {
      <Switch>
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
      </Switch>;
    }
    return <NotFoundPage />;
  }
  return <Component />;
};

export default ProtectedRoute;

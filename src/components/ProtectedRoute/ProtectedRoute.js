import { React } from 'react';
import { Redirect } from 'react-router';
import { useAppContext } from '../../utils/AppContext';

import NotFoundPage from '../NotFoundPage/NotFoundPage';

const ProtectedRoute = ({ component: Component, menuRoute, profileRoute }) => {
  const { isLogged, setIsLogged } = useAppContext();

  if (!isLogged) {
    if (menuRoute && profileRoute) {
      return <Redirect to="/" />;
    } return <NotFoundPage />;
  }
  return <Component />;

  // return (
  //   <Route>
  //     {() => ((menuRoute && !isLogged)
  //       ? <Redirect to="/" />
  //       : <Component />)}
  //   </Route>
  // );
};

export default ProtectedRoute;

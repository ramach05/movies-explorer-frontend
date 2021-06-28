import React, { useContext, useState } from 'react';

const context = React.createContext({});

export const AppContext = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  return (
    <context.Provider value={{
      savedMovies, setSavedMovies, currentUser, setCurrentUser,
    }}
    >
      {children}
    </context.Provider>
  );
};

export const useAppContext = () => useContext(context);

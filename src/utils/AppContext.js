import React, { useContext, useState } from 'react';

const context = React.createContext({});

export const AppContext = ({ children }) => {
  const [savedMovies, setSavedMovies] = useState([]);

  return (
    <context.Provider value={{
      savedMovies, setSavedMovies,
    }}
    >
      {children}
    </context.Provider>
  );
};

export const useAppContext = () => useContext(context);

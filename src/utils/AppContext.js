import React, { useContext, useState } from 'react';

const context = React.createContext({});

export const AppContext = ({ children }) => {
  const [isLogged, setIsLogged] = useState(true);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  return (
    <context.Provider value={{
      isLogged,
      setIsLogged,

      movies,
      setMovies,

      savedMovies,
      setSavedMovies,

      filteredMovies,
      setFilteredMovies,

      currentUser,
      setCurrentUser,
    }}
    >
      {children}
    </context.Provider>
  );
};

export const useAppContext = () => useContext(context);

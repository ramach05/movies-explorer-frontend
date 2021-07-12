import React, { useContext, useState } from 'react';

const context = React.createContext({});

export const AppContext = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoadingMovies, setIsLoadingMovies] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isNoCards, setIsNoCards] = useState(false);
  const [isInitialMoreButton,
    setIsInitialMoreButton] = useState(false);

  return (
    <context.Provider value={{
      isLogged,
      setIsLogged,

      isLoadingMovies,
      setIsLoadingMovies,

      movies,
      setMovies,

      savedMovies,
      setSavedMovies,

      filteredMovies,
      setFilteredMovies,

      currentUser,
      setCurrentUser,

      isNoCards,
      setIsNoCards,

      isInitialMoreButton,
      setIsInitialMoreButton,
    }}
    >
      {children}
    </context.Provider>
  );
};

export const useAppContext = () => useContext(context);

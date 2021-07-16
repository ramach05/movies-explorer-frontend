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
  const [isMoreButton, setIsMoreButton] = useState(true);

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

      isMoreButton,
      setIsMoreButton,
    }}
    >
      {children}
    </context.Provider>
  );
};

export const useAppContext = () => useContext(context);

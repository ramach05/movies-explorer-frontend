const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  } return Promise.reject(new Error(`ОШИБКА: ${res.status}`));
};

class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  getInitialMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._headers,
    }).then(handleResponse);
  }
}

const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const apiMovies = new Api({
  baseUrl: MOVIES_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

export default apiMovies;

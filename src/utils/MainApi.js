const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`ОШИБКА: ${res.status}`);
};

class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  updateHeaders() {
    this._headers.authorization = localStorage.getItem('token');
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._headers,
    }).then(handleResponse);
  }

  getMe() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(handleResponse);
  }

  createUser({ name, password, email }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, password, email }),
    }).then(handleResponse);
  }

  login({ password, email }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ password, email }),
    }).then(handleResponse);
  }

  updateUserProfile({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, email }),
    }).then(handleResponse);
  }

  checkToken({ token }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      authorization: `Bearer ${token}`,

    })
      .then((res) => (res.ok ? res.json() : Promise.reject(`ОШИБКА: ${res.status}`)))
      .then((data) => data);
  }
}

const MAIN_URL = 'https://api.movies-explorer-roman.nomoredomains.icu';

const apiMain = new Api({
  baseUrl: MAIN_URL,
  headers: {
    authorization: localStorage.getItem('token'),
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default apiMain;

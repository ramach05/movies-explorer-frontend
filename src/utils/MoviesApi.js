const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  } return Promise.reject(new Error(`ОШИБКА: ${res.status}`));
};

export class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: this._headers,
    }).then(handleResponse);
  }
}

export const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const api = new Api({
  baseUrl: MOVIES_URL,
  headers: {
    // authorization: localStorage.getItem('token'),
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

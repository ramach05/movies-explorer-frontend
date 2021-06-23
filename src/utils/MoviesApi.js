const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  } return Promise.reject(new Error(`ОШИБКА: ${res.status}`));
};

export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }
}

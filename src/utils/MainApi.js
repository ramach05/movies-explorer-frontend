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

// 42
const a = [{
  id: 1,
  nameRU: '«Роллинг Стоунз» в изгнании',
  nameEN: 'Stones in Exile',
  director: 'Стивен Кайак ',
  country: 'США',
  year: '2010',
  duration: 61,
  description: 'В конце 1960-х группа «Роллинг Стоунз», несмотря на все свои мегахиты и сверхуспешные концертные туры, была разорена. Виной всему — бездарный менеджмент и драконовское налогообложение в Британии. Тогда музыканты приняли не самое простое для себя решение: летом 1971 года после выхода альбома «Stiсky Fingers» они отправились на юг Франции записывать новую пластинку. Именно там, на Лазурном Берегу, в арендованном Китом Ричардсом подвале виллы Неллькот родился сборник «Exile on Main St.», который стал лучшим альбомом легендарной группы.',
  trailerLink: 'https://www.youtube.com/watch?v=UXcqcdYABFw',
  created_at: '2020-11-23T14:12:21.376Z',
  updated_at: '2020-11-23T14:12:21.376Z',
  image: {
    id: 1,
    name: 'stones-in-exile',
    alternativeText: '',
    caption: '',
    width: 512,
    height: 279,
    formats: {
      thumbnail: {
        hash: 'thumbnail_stones_in_exile_b2f1b8f4b7', ext: '.jpeg', mime: 'image/jpeg', width: 245, height: 134, size: 8.79, path: null, url: '/uploads/thumbnail_stones_in_exile_b2f1b8f4b7.jpeg',
      },
      small: {
        hash: 'small_stones_in_exile_b2f1b8f4b7', ext: '.jpeg', mime: 'image/jpeg', width: 500, height: 272, size: 25.68, path: null, url: '/uploads/small_stones_in_exile_b2f1b8f4b7.jpeg',
      },
    },
    hash: 'stones_in_exile_b2f1b8f4b7',
    ext: '.jpeg',
    mime: 'image/jpeg',
    size: 25.53,
    url: '/uploads/stones_in_exile_b2f1b8f4b7.jpeg',
    previewUrl: null,
    provider: 'local',
    provider_metadata: null,
    created_at: '2020-11-23T14:11:57.313Z',
    updated_at: '2020-11-23T14:11:57.313Z',
  },
}];

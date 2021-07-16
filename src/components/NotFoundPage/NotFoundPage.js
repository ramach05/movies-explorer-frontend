import { React } from 'react';
import { useHistory } from 'react-router-dom';

import './NotFoundPage.css';

function NotFoundPage() {
  const history = useHistory();

  function handleClick() {
    history.goBack();
  }

  return (
    <main className="not-found-page">
      <h1 className="not-found-page__title">404</h1>
      <p className="not-found-page__text">Страница не найдена</p>

      <button
        type="button"
        className="not-found-page__link"
        onClick={handleClick}
      >
        Назад
      </button>
    </main>
  );
}

export default NotFoundPage;

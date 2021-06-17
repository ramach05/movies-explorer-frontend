import { React } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './NotFoundPage.css';

function NotFoundPage() {
  const history = useHistory();
  console.log('history :>> ', history);

  return (
    <main className="not-found-page">
      <h1 className="not-found-page__title">404</h1>
      <p className="not-found-page__text">Страница не найдена</p>
      <Link
        to="/"
        className="not-found-page__link"
      >
        Назад
      </Link>
    </main>
  );
}

export default NotFoundPage;

import { React } from 'react';
import { useHistory } from 'react-router';

import './Promo.css';

function Promo() {
  const history = useHistory();

  function handlePromoButton() {
    history.push('/signin');
  }

  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button
          type="button"
          className="promo__button"
          onClick={handlePromoButton}
        >
          Узнать больше
        </button>
      </div>
    </section>
  );
}

export default Promo;

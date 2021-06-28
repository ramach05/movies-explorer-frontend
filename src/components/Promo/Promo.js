import { React } from 'react';

import './Promo.css';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <a
          href="#about-project"
          className="promo__button"
        >
          Узнать больше
        </a>
      </div>
    </section>
  );
}

export default Promo;

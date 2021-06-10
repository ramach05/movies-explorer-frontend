import { useHistory } from "react-router";

import "./Promo.css";

function Promo() {
  const history = useHistory();

  function handlePromoButton() {
    history.push("/signin");
  }

  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
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
    </section>
  );
}

export default Promo;

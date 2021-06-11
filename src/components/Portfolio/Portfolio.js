import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>

      <nav>
        <ul className="portfolio__list">
          <li className="portfolio__list__item">
            <a
              className="portfolio__link"
              href="https://"
              target="_blank"
              rel="noreferrer"
            >
              Статичный сайт <span className="portfolio__link__icon"></span>
            </a>
          </li>
          <li className="portfolio__list__item">
            <a
              className="portfolio__link"
              href="https://"
              target="_blank"
              rel="noreferrer"
            >
              Адаптивный сайт <span className="portfolio__link__icon"></span>
            </a>
          </li>
          <li className="portfolio__list__item">
            <a
              className="portfolio__link"
              href="https://"
              target="_blank"
              rel="noreferrer"
            >
              Одностраничное приложение{" "}
              <span className="portfolio__link__icon"></span>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;

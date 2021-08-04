import { React } from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>

      <nav>
        <ul className="portfolio__list">
          <li className="portfolio__list__item">
            <a
              className="portfolio__link"
              href="https://github.com/ramach05/how-to-learn"
              target="_blank"
              rel="noreferrer"
            >
              Статичный сайт &apos;How-to-learn&apos;
              <span className="portfolio__link__icon" />
            </a>
          </li>
          <li className="portfolio__list__item">
            <a
              className="portfolio__link"
              href="https://github.com/ramach05/russian-travel"
              target="_blank"
              rel="noreferrer"
            >
              Адаптивный сайт &apos;Russian-Travel&apos;
              <span className="portfolio__link__icon" />
            </a>
          </li>
          <li className="portfolio__list__item">
            <a
              className="portfolio__link"
              href="https://github.com/ramach05/challenge-team-indigo"
              target="_blank"
              rel="noreferrer"
            >
              Адаптивный сайт &apos;Freelancer&apos;
              <span className="portfolio__link__icon" />
            </a>
          </li>
          <li className="portfolio__list__item">
            <a
              className="portfolio__link"
              href="https://github.com/ramach05/react-mesto-api-full"
              target="_blank"
              rel="noreferrer"
            >
              Одностраничное приложение &apos;Mesto&apos;
              <span className="portfolio__link__icon" />
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;

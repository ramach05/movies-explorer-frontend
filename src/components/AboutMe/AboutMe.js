import { React } from 'react';
import './AboutMe.css';
import Avatar from '../../images/about-me-avatar.jpeg';
import { getAge } from '../../utils/utils';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <img src={Avatar} alt="аватар" className="about-me__avatar" />
        <div className="about-me__container__item">
          <h3 className="about-me__subtitle">Роман</h3>
          <p className="about-me__text about-me__text_inter-medium">
            Фронтенд-разработчик,
            {' '}
            {getAge('1994/09/10')}
          </p>
          <p className="about-me__text">
            Я родился во Владимире, закончил Нижегородский ННГАСУ (строительство, бакалавриат) и Владимирский ВлГУ (экономика, магистатура). Живу в Санкт-Петербурге с 2016 года. Решил сменить род деятельности со строительной сферы на  Веб-разработку и в 2020 пошел учиться в Яндекс.Практикум. В свободное время занимаюсь бегом, велозаездами и люблю поплавать на Финском заливе вдали от городской суеты.
          </p>
          <nav className="about-me__nav">
            <ul className="about-me__list">
              <li>
                <a
                  className="about-me__link"
                  href="https://www.facebook.com/ramach05"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="about-me__link"
                  href="https://github.com/ramach05"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

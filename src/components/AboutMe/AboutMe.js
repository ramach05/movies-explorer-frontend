import "./AboutMe.css";
import Avatar from "../../images/about-me-avatar.jpeg";
import { getAge } from "../../utils/utils";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <img src={Avatar} alt="аватар" className="about-me__avatar" />
        <div className="about-me__container__item">
          <h3 className="about-me__subtitle">Роман</h3>
          <p className="about-me__text about-me__text_inter-medium">
            Фронтенд-разработчик, {getAge("1994/09/10")}
          </p>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <nav className="about-me__nav">
            <ul className="about-me__list">
              <li>
                <a
                  className="about-me__link"
                  href="https://"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  className="about-me__link"
                  href="https://"
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

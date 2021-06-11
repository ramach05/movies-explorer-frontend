import "./AboutMe.css";
import Avatar from "../../images/about-me-avatar.jpeg";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <img src={Avatar} alt="аватар" className="about-me__avatar" />
      <h3 className="about-me__subtitle">Роман</h3>
      <p className="about-me__text about-me__text_inter-medium">
        Фронтенд-разработчик, 30 лет
      </p>
      <p className="about-me__text">
        Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
        есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно
        начал кодить. С 2015 года работал в компании «СКБ Контур». После того,
        как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и
        ушёл с постоянной работы.
      </p>
      <nav>
        <ul className="about-me__nav__ul">
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
    </section>
  );
}

export default AboutMe;

import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <h2 className="footer__text footer__text_title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>

      <nav className="footer__nav">
        <ul className="footer__ul">
          <li className="footer__li">
            <a
              href="https://"
              target="_blank"
              rel="noreferrer"
              className="footer__li-text"
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__li">
            <a
              href="https://"
              target="_blank"
              rel="noreferrer"
              className="footer__li-text"
            >
              Github
            </a>
          </li>
          <li className="footer__li">
            <a
              href="https://"
              target="_blank"
              rel="noreferrer"
              className="footer__li-text"
            >
              Facebook
            </a>
          </li>
        </ul>
      </nav>
      <p className="footer__text footer__text_date">
        &copy; {new Date().getFullYear()}
      </p>
    </div>
  );
}

export default Footer;

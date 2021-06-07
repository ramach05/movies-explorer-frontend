import "./Footer.css";

function Footer() {
  return (
    <>
      <div className="footer">
        <h1 className="footer__text footer__text_border">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h1>

        <nav>
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
        <p className="footer__text">©{new Date().getFullYear()}</p>
      </div>
    </>
  );
}

export default Footer;

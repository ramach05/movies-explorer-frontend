import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <div className="techs__grid-container">
        <p className="techs__grid-container__item">HTML</p>
        <p className="techs__grid-container__item">CSS</p>
        <p className="techs__grid-container__item">JS</p>
        <p className="techs__grid-container__item">React</p>
        <p className="techs__grid-container__item">Git</p>
        <p className="techs__grid-container__item">Express.js</p>
        <p className="techs__grid-container__item">mongoDB</p>
      </div>
    </section>
  );
}

export default Techs;

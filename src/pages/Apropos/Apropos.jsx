import "./Apropos.css";
import maman from "../../Images/maman.jpg";

function Apropos() {
  return (
    <>
      <div className="div-text-aPropos">
        <div className="a-propos-div-image">
          <h1>Anne Sophie</h1>
          <img src={maman} alt="image_anne-sophie"></img>
        </div>
        <div className="a-propos-texte">
          <p>
            Je m’appelle Anne-Sophie, j’ai 50 ans. J’ai découvert l’univers des
            Pierres naturelles il y a 10 ans. <br />
            <br /> Depuis 2 ans maintenant, je suis créatrice de bijoux et
            accessoires en pierres naturelles. Le but est de vous accompagner au
            quotidien et tout cela accompagné de méditation et de relaxation.
            <br />
            <br /> Vous découvrirez différentes rubriques pour votre bien être
            personnel et pour votre bien être environnant.
          </p>
        </div>
      </div>
    </>
  );
}

export default Apropos;

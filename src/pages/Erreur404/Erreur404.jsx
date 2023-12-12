import { useNavigate } from "react-router-dom";
import prise from "../../Images/prise.png";
import rectangle from "../../Images/Rectangle.png";
import "./Erreur404.css";
import { useEffect, useState } from "react";
import { faL } from "@fortawesome/free-solid-svg-icons";

function Erreur404() {
  const navigate = useNavigate();
  const [btnBackHome, setBtnBackHomeClique] = useState(false);

  useEffect(() => {
    if (btnBackHome) {
      navigate("/");
    }
  }, [btnBackHome]);

  return (
    <>
      <div className="body-erreur-page">
        <div className="container-left-erreur">
          <img src={prise} alt="ellipse" />
        </div>
        <div className="container-right-erreur">
          <h1 className="erreur404">404</h1>
          <h2>Page non trouvé</h2>
          <h3>Nous somme désolé la page que vous recherchez n'existe pas</h3>
          <button
            className="btn-back-to-home"
            onClick={() => setBtnBackHomeClique(true)}
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </>
  );
}

export default Erreur404;

import { useEffect, useState } from "react";
import "./CardCommande.css";
import { useNavigate } from "react-router-dom";

function CardCommande({ idCommande, date, prixTotal }) {
  const [btnDetails, setBtnDetails] = useState(false);
  const navigate = useNavigate();

  const handleClickDetails = () => {
    navigate("/Profil/commandes/" + idCommande);
  };

  return (
    <div className="div-commande">
      <div className="container-left">
        <h4>Commande N°{idCommande}</h4>
        <h4>{prixTotal} €</h4>
      </div>
      <div className="container-right">
        <h4>{date}</h4>
        <button onClick={() => handleClickDetails()}>Voir détails</button>
      </div>
    </div>
  );
}

export default CardCommande;

import { useEffect, useState } from "react";
import "./CardCommande.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // ES6

function CardCommande({ idCommande, date, prixTotal, contenuCommande }) {
  const [btnDetails, setBtnDetails] = useState(false);
  const navigate = useNavigate();

  const tableauObjet = Object.values(contenuCommande);
  console.log(tableauObjet);

  const coverImages = tableauObjet.map((commande) => (
    <img src={commande.cover} height={100} width={100}></img>
  ));

  const handleClickDetails = () => {
    navigate("/Profil/commandes/" + idCommande, {
      state: {
        contenuCommande: tableauObjet,
      },
    });
  };
  console.log(contenuCommande);

  return (
    <div className="div-commande">
      <div className="container-left">{coverImages[1]}</div>
      <div>
        <h4>Commande N°{idCommande}</h4>
        <h4>{prixTotal} €</h4>
      </div>
      <div className="container-right" style={{ margin: "1em 1em 0 0" }}>
        <h4 style={{width: "6em"}}>{date}</h4>
        <button onClick={() => handleClickDetails()}>Voir détails</button>
      </div>
    </div>
  );
}

CardCommande.propTypes = {
  idCommande: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  prixTotal: PropTypes.number.isRequired,
  contenuCommande: PropTypes.object.isRequired,
};

export default CardCommande;

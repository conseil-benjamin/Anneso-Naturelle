import React, { useEffect, useState } from "react";
import "./CardCommande.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // ES6

function CardCommande({ idCommande, date, prixTotal, contenuCommande, status }) {
  const [btnDetails, setBtnDetails] = useState(false);
  const navigate = useNavigate();
  console.log(idCommande)

  const tableauObjet = Object.values(contenuCommande);
  console.log(tableauObjet);

  const coverImages = tableauObjet.map((commande) => (
    <img src={commande.cover} height={100} width={100}></img>
  ));

  const handleClickDetails = () => {
    navigate("/profil/commandes/" + idCommande, {
      state: {
        contenuCommande: tableauObjet,
      },
    });
  };

  return (
    <div className="div-commande">
      <div className="container-left">{coverImages[1]}</div>
      <div>
        <h4>Commande N°{idCommande}</h4>
        {status === "annulé" ? (
            <div className={"div-status-commande"}>
              <p><b>Statut : </b></p>
              <span style={{backgroundColor: "#FCE8E8", color: "#FF052D"}}>Annulé</span>
            </div>
        ) : status === "en cours de livraison" ? (
            <div className={"div-status-commande"}>
              <p><b>Statut : </b></p>
              <p style={{backgroundColor: "#ECF3F8", color: "#1A425B"}}>En cours de livraison</p>
            </div>
        ) : status === "livre" ? (
                <div className={"div-status-commande"}>
                  <p><b>Statut : </b></p>
                  <p style={{backgroundColor: "#DCF5D3", color: "#287834"}}>Livré</p>
                </div>
            ) :
            <div className={"div-status-commande"}>
              <p><b>Statut : </b> Inconnu</p>
            </div>
        }
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
  status: PropTypes.string.isRequired,
};

export default CardCommande;

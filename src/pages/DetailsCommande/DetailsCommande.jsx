import {useLocation, useParams} from "react-router-dom";
import "./DetailsCommande.css";
import React, { useEffect, useState } from "react";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";

function DetailsCommande() {
  const location = useLocation();
  const { contenuCommande } = location.state || {};
  const { numOrder } = useParams();
  const [commande, setCommande] = useState([]);
  const tableauObjet = Object.values(commande);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/commandes/" + numOrder
        );
        const commande = await response.json();
        console.log(commande);
        setCommande(commande);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const produitCommande = contenuCommande.map((commande) => (
      <>
        <h2>{commande.produit}</h2>
        <img
            src={commande.cover}
            height={100}
            width={100}
            alt="image_produit"
        ></img>
        <h3>{commande.prix} €</h3>
      </>
  ));

  return (
      <>
          <div className="div-principal-detailsCommande">
              <NavBarProfil></NavBarProfil>
              <div>
              <div className={"div-secondaire-details-commande"}>
                  <div className={"div-recap-commande-1"}>
                      <h3>Commande N°{commande.idCommande}</h3>
                      <p><b>Date :</b> {commande.date}</p>
                      <p><b>Statut:</b> {commande.status}</p>
                      <p><b>Type de livraison:</b> {commande.typeLivraison}</p>
                      <p>{commande.prixTotal} €</p>
                      <p>{commande.numeroSuivieMondialRelay}</p>
                  </div>
                  <div>
                      {// mettre une hr verticale ici
                      }
                      <hr/>
                      {
                          commande.typeLivraison === "domicile" ? (
                              <h3>Votre adresse de livraison</h3>
                          ) : (
                              <h3>Votre point Relais</h3>
                          )}
                      <h4>{commande.adresseLivraison}</h4>
                  </div>
              </div>
                  <div className="div-commandes">
                      {commande ? (
                          tableauObjet.map((commande, index) => <>{produitCommande[index]}</>)
                      ) : (
                          <div>
                              <h2>Aucune commande pour le moment</h2>
                          </div>
                      )}

                  </div>
              </div>
          </div>
      </>
  );
}

export default DetailsCommande;

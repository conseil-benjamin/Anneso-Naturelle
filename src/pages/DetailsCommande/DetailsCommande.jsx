import {useLocation, useParams} from "react-router-dom";
import "./DetailsCommande.css";
import React, { useEffect, useState } from "react";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import Cookies from "js-cookie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTruck, faTruckFast} from "@fortawesome/free-solid-svg-icons";

function DetailsCommande() {
  const location = useLocation();
  const { contenuCommande } = location.state || {};
  const { numOrder } = useParams();
  const [commande, setCommande] = useState([]);
  const [adresseId, setAdresseId] = useState("");
  const [adresse, setAdresse] = useState([]);
  const jwtToken = Cookies.get("auth_token");

  useEffect(() => {
    const fetchCommande = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/commandes/" + numOrder,
        );
        const commande = await response.json();
        console.log(commande);
        setCommande(commande);
        setAdresseId(commande.idAdresse);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchAdresse = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/adresses/" + adresseId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`
                },
            }
        );
        const adresse = await response.json();
        console.log(adresse);
        setAdresse(adresse);
      } catch (error) {
        console.error(error);
      }
    };
      fetchCommande().then(() => {
          fetchAdresse();
      });
  }, []);

    return (
        <>
            <div className="div-principal-detailsCommande">
                <NavBarProfil></NavBarProfil>
                <div>
                    <h2>DÉTAIL DE VOTRE COMMANDE</h2>
                    <div className={"div-secondaire-details-commande"}>
                        <div className={"div-recap-commande-1"}>
                            <h3>Commande N°{commande.idCommande}</h3>
                            <p><b>Date :</b> {commande.date}</p>
                            <p><b>Statut:</b> {commande.status}</p>
                            <p><b>Type de livraison:</b> {commande.typeLivraison}</p>
                            <p>{commande.prixTotal} €</p>
                            <p>{commande.numeroSuivieMondialRelay}</p>
                            {// mettre une hr verticale ici
                            }
                        </div>
                        <div className={"div-recap-commande-1"}>
                            {
                                commande.typeLivraison === "domicile" ? (
                                    <h3>Votre adresse de livraison</h3>
                                ) : (
                                    <h3>Votre point Relais</h3>
                                )}
                            {adresse.map((attribut) => {
                                return (<>
                                    <p>{attribut.adresse}</p>
                                    <p>{attribut.codePostal}</p>
                                </>);
                            })}
                        </div>
                    </div>
                    <button>
                        <FontAwesomeIcon icon={faTruck}></FontAwesomeIcon>
                        Suivre mon colis
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faTruckFast}></FontAwesomeIcon>
                        Retourner un produit</button>
                    <div className="div-commandes">
                        {commande ? (
                            contenuCommande.map((commande) => {
                                return (
                                    <div className={"div-produit-details-commande"}>
                                        <img
                                            src={commande.cover}
                                            height={100}
                                            width={100}
                                            alt="image_produit"
                                        ></img>
                                        <p>{commande.produit}</p>
                                        <p>Prix : {commande.prix} €</p>
                                    </div>
                                );
                            })
                        ) : (
                            <div>
                                <h2>Aucune commande pour le moment</h2>
                            </div>
                        )}
                    </div>
                    <h4>Frais de livraison : </h4>
                    <h4>Total commande TTC : </h4>
                </div>
            </div>
        </>
    );
}

export default DetailsCommande;

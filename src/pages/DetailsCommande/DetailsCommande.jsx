import {useLocation, useParams} from "react-router-dom";
import "./DetailsCommande.css";
import React, { useEffect, useState } from "react";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import Cookies from "js-cookie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTruck, faTruckFast} from "@fortawesome/free-solid-svg-icons";
import {Loader} from "../../utils/Loader";

function DetailsCommande() {
  const location = useLocation();
  const { contenuCommande } = location.state || {};
  const { idCommande } = useParams();
  const [commande, setCommande] = useState([]);
  const [adresseId, setAdresseId] = useState("");
  const [adresse, setAdresse] = useState({});
  const jwtToken = Cookies.get("auth_token");
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    const fetchCommande = async () => {
        setDataLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/commandes/" + idCommande,
            {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
        const commande = await response.json();
        console.log(commande);
        setCommande(commande);
        setAdresseId(commande.adresseLivraison);
        setDataLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCommande();
  }, []);

    useEffect(() => {
        const fetchAdresse = async () => {
            console.log(adresseId);
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
        fetchAdresse();
    }, [adresseId]);

    return (
        <>
            <div className="div-principal-detailsCommande">
                <NavBarProfil></NavBarProfil>
                {dataLoading ? (
                    <div className="loader-div-shopping-list">
                        <Loader/>
                    </div>
                ) : <div style={{margin: "2em 2em 3em 2em"}}>
                    <h2>DÉTAIL DE VOTRE COMMANDE</h2>
                    <div className={"div-secondaire-details-commande"}>
                        <div className={"div-recap-commande-1"}>
                            <h3>Commande N°{commande.idCommande}</h3>
                            <p><b>Date :</b> {commande.date}</p>
                            {console.log(commande.status)}
                            {commande.status === "annulé" ? (
                                <div className={"div-status-commande"}>
                                    <p><b>Statut : </b></p>
                                    <p style={{backgroundColor: "#FCE8E8", color: "#FF052D"}}>Annule</p>
                                </div>
                            ) : commande.status === "en cours de livraison" ? (
                                <div className={"div-status-commande"}>
                                    <p><b>Statut : </b></p>
                                    <p style={{backgroundColor: "#ECF3F8", color: "#1A425B"}}>En cours de livraison</p>
                                </div>
                            ) : commande.status === "livre" ? (
                                    <div className={"div-status-commande"}>
                                        <p><b>Statut : </b></p>
                                        <p style={{backgroundColor: "#DCF5D3", color: "#287834"}}>Livré</p>
                                    </div>
                                ) :
                                <div className={"div-status-commande"}>
                                    <p><b>Statut : </b> Inconnu</p>
                                </div>
                            }
                            <p><b>Type de livraison:</b> {commande.typeLivraison}</p>
                        </div>
                        <hr id={"vertical-hr"}/>
                        <div className={"div-recap-commande-1"}>
                            {
                                commande.typeLivraison === "A Domicile" ? (
                                    <h3>Votre adresse de livraison</h3>
                                ) : (
                                    <h3>Votre point Relais</h3>
                                )}
                                    <p>{adresse.adresse}</p>
                                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <p style={{margin: "0 0.5em 0.5em 0"}}>{adresse.codePostal}</p>
                                        <p style={{margin: "0 0.5em 0.5em 0"}}>{adresse.ville}</p>
                                    </div>
                                    <p>{adresse.pays}</p>
                        </div>
                    </div>
                    <div className={"div-buttons-actions-details-commande"}>
                        {commande.status === "En attente de livraison" ? (
                            <button>
                                Annuler ma commande
                                <FontAwesomeIcon id={"icon-buttons-actions-details-commande"}
                                                 icon={faTruckFast}></FontAwesomeIcon>
                            </button>
                        ) : commande.status !== "annule" ? (
                            <>
                                <button onClick={() => window.open(
                                    "https://www.mondialrelay.fr/suivi-de-colis?numeroExpedition=" + commande.numeroSuivieMondialRelay,
                                    "_blank"
                                )}>
                                    <FontAwesomeIcon id={"icon-buttons-actions-details-commande"} icon={faTruckFast}></FontAwesomeIcon>
                                    Suivre mon colis
                                </button>
                                <button>
                                    <FontAwesomeIcon id={"icon-buttons-actions-details-commande"} icon={faTruckFast}></FontAwesomeIcon>
                                    Retourner un produit
                                </button>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
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
                    <div className={"div-prix-details-commande"}>
                        <p><b>Frais de livraison :</b></p>
                        <p>{commande.fraisLivraison} €</p>
                    </div>
                    <div className={"div-prix-details-commande"}>
                        <p><b>Total commande TTC :</b></p>
                        <p id={"prix-total-details-commande"}>{commande.prixTotal} €</p>
                    </div>
                </div>}
            </div>
        </>
    );
}

export default DetailsCommande;

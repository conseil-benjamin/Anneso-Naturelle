import React, {useEffect, useState} from "react";
import {Loader} from "../../utils/Loader";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function AdminOrders(){
    const [commandes, setCommandes] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [btnValiderEnvoie, setBtnValiderEnvoie] = useState(false);
    const [idClientClique, setIdClientClique] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllOrders = async () => {
            setDataLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}commandes/getAllOrders`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            const commandes = await response.json();
            console.log(commandes)
            setCommandes(Object.values(commandes));
            console.log(commandes)
            }
            catch (error) {
                console.log(error);
            } finally {
                setDataLoading(false);
            }
        }
        fetchAllOrders();
    }, []);

    const sendOrder = async (idCommande) => {
            Swal.fire({
                title: "Tu t'apprêtes à valider l'envoi de la commande.",
                html: "J'aurais juste besoin que tu me fournisse le numéro de suivie mondial relay. Pour ceci, voici le lien mondial relais pour l'envoi : <a href='https://www.mondialrelay.fr/envoi-de-colis/' target='_blank'>https://www.mondialrelay.fr/envoi-de-colis/</a>.",
                icon: "warning",
                input: 'text',
                inputPlaceholder: 'Entrez le numéro de suivi du colis',
                showCancelButton: true,
                preConfirm: (trackingNumber) => {
                    if (!trackingNumber) {
                        Swal.showValidationMessage('Veuillez entrer le numéro de suivi du colis');
                    }
                    try{
                        fetch(`${process.env.REACT_APP_API_URL}commandes/update-tracking-number`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({idCommande, trackingNumber}),
                        });
                        Swal.fire({
                            title: "Numéro de suivie inséré",
                            icon: "success",
                        });
                    }
                    catch (error) {
                        console.log(error);
                    }
                },
            })
    }

    function fetchClientInformation(idClient) {
            try{
                const fetchClient = async () => {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}users/get-user-by-id/${idClient}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const client = await response.json();
                    Swal.fire({
                        title: "Informations du client",
                        html: `<p><strong>Nom :</strong> ${client.nom}</p>
                               <p><strong>Prénom :</strong> ${client.prenom}</p>
                               <p><strong>Email :</strong> ${client.adresseEmail}</p>
                               <p><strong>Téléphone :</strong> ${client.numeroTel}</p>`,
                        icon: "info",
                    });
                }
                fetchClient();
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setIdClientClique(false);
            }
        }

    return(
        <div>
            <Link to="/admin">
                <img
                    src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1700322943/Icon_retour_arriere.png"
                    alt="Retour en arrière"
                    width={25}
                    height={25}
                    style={{margin: "2em 0 0 2em"}}
                />
            </Link>
            <h1 style={{margin: "2em 0 0 2em"}}>Liste de toutes les commandes</h1>
            <div style={{display: "flex", flexDirection: "row", margin: "5em 5em 0 5em"}}>
                <h4 style={{padding: "0 1em 0 0", width: "10%"}}>Numéro</h4>
                <h4 style={{padding: "0 1em 0 0", width: "10%"}}>Date</h4>
                <h4 style={{padding: "0 1em 0 0", width: "10%"}}>Prix total</h4>
                <h4 style={{padding: "0 1em 0 0", width: "10%"}}>Type Livraison</h4>
                <h4 style={{padding: "0 4em 0 0", width: "10%"}}>Numéro client</h4>
                <h4 style={{padding: "0 1em 0 0", width: "10%"}}>Status</h4>
            </div>
            <hr style={{width: "91%"}}/>
            {dataLoading ? <Loader/> : commandes.map((commande, index) => {
                return (
                    <div style={{margin: "5em"}}>
                        <div key={index}
                             style={{display: "flex", flexDirection: "row", alignItems: "center", margin: "0.5em"}}>
                            <h4 style={{padding: "0 1em 0 0", width: "10%"}}>{index + 1}</h4>
                            <p style={{padding: "0 1em 0 0", width: "10%"}}>{commande.date}</p>
                            <p style={{padding: "0 1em 0 0", width: "10%"}}>{commande.prixTotal}</p>
                            <p style={{padding: "0 1em 0 0", width: "10%"}}>{commande.typeLivraison}</p>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", cursor: "pointer", padding: "0 5em 0 0"}} onClick={() =>  fetchClientInformation(commande.idClient)}>
                                <FontAwesomeIcon icon={faCircleInfo} style={{color: "blue"}}></FontAwesomeIcon>
                                <p style={{padding: "0 1em 0 0.5em", width: "10%"}}>{commande.idClient}</p>
                            </div>
                            {commande.status === "Annulé" ? (
                                    <p style={{backgroundColor: "#FCE8E8", color: "#FF052D", padding: "0.25em", borderRadius: "5px"}}>Annulé</p>
                            ) : commande.status === "En cours de livraison" ? (
                                    <p style={{backgroundColor: "#ECF3F8", color: "#1A425B", padding: "0.25em", borderRadius: "5px"}}>En cours de livraison</p>
                            ) : commande.status === "Livré" ? (
                                        <p style={{backgroundColor: "#DCF5D3", color: "#287834", padding: "0.25em", borderRadius: "5px"}}>Livré</p>
                                ) : commande.status === "En cours de préparation" ? (
                                <p>En cours de préparation</p>
                            ) : <p>Inconnu</p>
                            }
                            {commande.status === "En cours de préparation" ? <button style={{padding: "0.5em 1em", backgroundColor: "green", color: "white", border: "none"}} onClick={() => sendOrder(commande.idCommande)}>Valider envoie</button> : null}
                            {commande.status === "En cours de livraison" ? <button style={{padding: "0.5em 1em", margin: "0 0 0 1em", backgroundColor: "blue", color: "white", border: "none"}} onClick={() => window.open(
                                "https://www.mondialrelay.fr/suivi-de-colis?numeroExpedition=" + commande.numeroSuivieMondialRelay + "&codePostal=" + commande.codePostalCommande,
                                "_blank"
                            )}>Suivre le colis</button> : null}
                        </div>
                        <hr/>
                    </div>
                )
            })}
        </div>
    )
}

export default AdminOrders;
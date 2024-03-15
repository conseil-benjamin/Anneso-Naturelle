import OrderProgress from "../../components/OrderProgress/OrderProgress";
import './CheckoutDelivery.css';
import {useEffect, useState} from "react";
import CardAdresses from "../../components/CardAdresses/CardAdresses";
import Cookies from "js-cookie";
import {RadioGroup} from "@mui/material";
function CheckoutDelivery () {
    const [adresses, setAdresses] = useState([]);
    const [idAdresseDomicileChoisie, setidAdresseDomicileChoisie] = useState("");
    console.log(idAdresseDomicileChoisie);

    useEffect(() => {
        try{
            const getAllAdressesForAclient = async () => {
                const response = await fetch(`${process.env.REACT_APP_API_URL}adresses/`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${Cookies.get("auth_token")}`,
                        },
                    }
                );
                const adresses = await response.json();
                setAdresses(Object.values(adresses));
            }
            getAllAdressesForAclient();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <OrderProgress/>
            <div className={"div-main-checkout-delivery"}>
                <div>
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <h3>Livraison en point relais</h3>
                        <img src={"https://res.cloudinary.com/dc1p20eb2/image/upload/v1710505083/Anne%27so%20Naturelle/Image/image_point_relais.png"}/>
                        <h4>5.00 € de frais de port</h4>
                    </div>
                    <hr />
                    <p style={{textAlign: "center"}}>Chercher un point relais</p>
                    <input type={"text"} className={"input-login"}/>
                </div>
                <div>
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        <h3>Livraison à domicile</h3>
                        <img width={150} height={150} src={"https://res.cloudinary.com/dc1p20eb2/image/upload/v1710505531/Anne%27so%20Naturelle/Image/image_livraison_domicile.png"}/>
                        <h4>4.20€ de frais de port</h4>
                    </div>
                    <hr />
                    <p style={{textAlign: "center"}}>{adresses.length > 0 ? "Choisissez votre adresse de livraison" : "Entrez une adresse de livraison"}</p>
                    {adresses.map((adresse) => {
                        return (
                            <div style={{display: "flex", alignItems: "center", flexDirection: "row"}}>
                                <input type={"radio"} value={adresse._id}
                                       onChange={() => setidAdresseDomicileChoisie(adresse._id)}
                                       checked={idAdresseDomicileChoisie === adresse._id}
                                       style={{margin: "0 1em 0 0"}}/>
                                <CardAdresses
                                    adresseId={adresse._id}
                                    nomPersonne={adresse.nomPersonne}
                                    prenomPersonne={adresse.prenomPersonne}
                                    adresse={adresse.adresse}
                                    codePostal={adresse.codePostal}
                                    pays={adresse.pays}
                                    ville={adresse.ville}
                                    complementAdresse={adresse.complementAdresse}
                                    numTel={adresse.numTel}
                                    setAdresses={setAdresses}
                                    adresses={adresses}/>
                            </div>
                        )
                    })}
                    <hr/>
                    <h3 style={{textAlign: "center"}}>Ou ajouter une nouvelle adresse</h3>

                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <button style={{margin: "2em", width: "15%"}}>Valider le choix de livraison</button>
            </div>
        </div>
    )
}

export default CheckoutDelivery;
import OrderProgress from "../../components/OrderProgress/OrderProgress";
import './CheckoutDelivery.css';
import {useEffect, useState} from "react";
import CardAdresses from "../../components/CardAdresses/CardAdresses";
import Cookies from "js-cookie";
import {faLocationArrow} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

function CheckoutDelivery() {
    const [adresses, setAdresses] = useState([]);
    const [idAdresseDomicileChoisie, setidAdresseDomicileChoisie] = useState("");
    const [inputErreurChoixLivraison, setInputErreurChoixLivraison] = useState("");
    const [inputErreurCodePostal, setInputErreurCodePostal] = useState("");
    const [codePostal, setCodePostal] = useState("");
    const navigate = useNavigate();
    console.log(idAdresseDomicileChoisie);

    useEffect(() => {
        try {
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

    const validerChoixLivraison = () => {
        if (idAdresseDomicileChoisie === "") {
            setInputErreurChoixLivraison("Veuillez choisir une adresse de livraison ou en ajouter une.");
        } else {
            navigate("/checkout/payment");
        }
    }

    const fetchRelais = async () => {
        if (codePostal.length !== 5) {
            setInputErreurCodePostal("Veuillez renseigner un code postal valide.");
            return;
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}mondialRelay/${codePostal}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        const relais = await response.json();
        console.log(relais);
    }

    return (
        <div style={{display: "flex", flexDirection: "column", margin: "0 0 2em 0"}}>
            <OrderProgress/>
            <div className={"div-main-checkout-delivery"}>
                <div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <h3>Livraison en point relais</h3>
                        <img
                            src={"https://res.cloudinary.com/dc1p20eb2/image/upload/v1710505083/Anne%27so%20Naturelle/Image/image_point_relais.png"}/>
                        <h4>4.00 € de frais de port</h4>
                    </div>
                    <hr/>
                    <p style={{textAlign: "center"}}>Chercher un point relais</p>
                    <div className={"input-code-postal-relais"}>
                        <input type={"text"} className={"input-login"} value={codePostal}
                               onChange={(e) => setCodePostal(e.target.value)} placeholder="Code Postal"
                        />
                        <FontAwesomeIcon icon={faLocationArrow} style={{color: "black", cursor: "pointer"}}
                                         id={"icon-input-code-postal-relais"} onClick={() => fetchRelais()}/>
                    </div>
                    {inputErreurCodePostal !== "" &&
                        <p style={{color: "red", textAlign: "center", margin: "0"}}>{inputErreurCodePostal}</p>}
                </div>
                <div>
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        <h3>Livraison à domicile</h3>
                        <img width={150} height={150}
                             src={"https://res.cloudinary.com/dc1p20eb2/image/upload/v1710505531/Anne%27so%20Naturelle/Image/image_livraison_domicile.png"}/>
                        <h4>5.00€ de frais de port</h4>
                    </div>
                    <hr/>
                    <p style={{textAlign: "center"}}>{adresses.length > 0 ? "Choisissez votre adresse de livraison." : "Vous n'avez pour le moment renseigner aucune adresse."}</p>

                    {adresses ?
                        adresses.map((adresse) => {
                            return (
                                <>
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
                                </>
                            )
                        })
                        : null}
                    {adresses === [] && <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        margin: "0.5em 0 0 0"
                    }}>
                        <hr style={{flexGrow: 1, width: '8.5em', height: "1px"}}/>
                        <span style={{margin: '0 10px'}}>Ou</span>
                        <hr style={{flexGrow: 1, width: '8.5em', height: "1px"}}/>
                    </div>}

                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <button style={{margin: "1em 0 0 0", width: "50%"}}
                                onClick={() => navigate("/profil/adresses/ajoutAdresse")}>Ajouter une adresse
                        </button>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <button style={{margin: "2em 2em 0em 2em", width: "15%"}}
                        onClick={() => validerChoixLivraison()}>Valider le choix de livraison
                </button>
            </div>
            {inputErreurChoixLivraison !== "" &&
                <p style={{color: "red", textAlign: "center"}}>{inputErreurChoixLivraison}</p>}
        </div>
    )
}

export default CheckoutDelivery;
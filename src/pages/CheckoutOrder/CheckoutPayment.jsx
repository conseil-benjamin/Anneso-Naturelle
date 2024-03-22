import OrderProgress from "../../components/OrderProgress/OrderProgress";
import "./CheckOutPayment.scss";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import GoingBack from "../../components/GoingBack/GoingBack";
function CheckoutPayment () {
    const [adresse, setAdresse] = useState();
    // faire un get dans la bdd avec l'id de l'adresse choisit stocké en sessionStorage pour afficher les infos de l'adresse
    console.log(adresse)
    useEffect(() => {
        try {
            const getAdressInfo = async () => {
                const response = await fetch(`${process.env.REACT_APP_API_URL}adresses/${sessionStorage.getItem("adresseId")}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${Cookies.get("auth_token")}`,
                        },
                        });
                const adresse = await response.json();
                setAdresse(Object.values(adresse));
                console.log(adresse)
            }
            getAdressInfo();
        } catch (error) {
            console.log(error)
        }
    }, []);
    return (
        <div>
            <OrderProgress/>
            <div className={"main-div-checkout-payment"}>
                <div>
                    <h3>Détails de votre commande</h3>
                    <h4>Produits</h4>
                </div>
                <div>
                    <h3>Détails de votre livraison</h3>
                    <p>{adresse[2]} {adresse[3]}</p>
                    <p>{adresse[4]}</p>
                    <p>{adresse[5]} {adresse[6]}</p>
                    <p>{adresse[8]}</p>
                    <p>{adresse[9]}</p>
                </div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <h3>Total (TVA incluse)</h3>
                        <h3>300.00 €</h3>
                    </div>
                    <div>
                        <input type={"checkbox"}/>
                        <label>J'ai lu et j'accepte les <u>conditions générales de ventes</u></label>
                    </div>
                    <button style={{margin: "2.5em 0 0 0"}}>Valider la commande</button>
                </div>
            </div>
            <GoingBack/>
        </div>
    )
}

export default CheckoutPayment;
import OrderProgress from "../../components/OrderProgress/OrderProgress";
import "./CheckOutPayment.scss";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import GoingBack from "../../components/GoingBack/GoingBack";
import ProductItem from "../../components/ProductItem/ProductItem";
import {Loader} from "../../utils/Loader";
function CheckoutPayment () {
    const [adresse, setAdresse] = useState([]);
    const [products, setProducts] = useState([])
    const [totalCommande, setTotalCommande] = useState(0);
    const [conditionsAccepter, setConditionsAccepter] = useState(false);
    const [erreurConditionsNonAccepter, setErreurConditionsNonAccepter] = useState("");
    const [isDataLoading, setDataLoading] = useState(false);
    console.log(adresse)

    useEffect(() => {
        try {
            const fetchData = async () => {
                setDataLoading(true);
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

                const getProducts = await fetch(`${process.env.REACT_APP_API_URL}panier`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${Cookies.get("auth_token")}`,
                        },
                    });
                    const products = await getProducts.json();
                    setProducts(Object.values(products.contenuPanier));
                    setTotalCommande(products.total);
                    console.log(products)
                setDataLoading(false);
            }
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }, []);

    const handleClickPayerCommande = () => {
        if (!conditionsAccepter){
            setErreurConditionsNonAccepter("Vous devez accepter les conditions générales de ventes pour finaliser votre commande.")
            return;
        }
        try {
            const commande = {
                idCommande: "CMD55",
                idClient: Cookies.get("auth_token"),
                date: new Date(),
                nbArticles: products.length,
                adresseLivraison: sessionStorage.getItem("adresseId"),
                prixTotal: totalCommande,
                contenuCommande: products,
                numeroSuivieMondialRelay: "",
                status: "En cours de préparation",
                typeLivraison: sessionStorage.getItem("adresseId") ? "A domicile" : "En point relais",
                fraisLivraison: sessionStorage.getItem("adresseId") ? 5.99 : 3.99,
                codePostalCommande: adresse[6],
                numeroSuivieChronopost: ""
            }
            const ajoutCommande = async () => {
                const response = await fetch(`${process.env.REACT_APP_API_URL}commandes/addOrder`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${Cookies.get("auth_token")}`,
                        },
                        body: JSON.stringify(commande)
                    });
                const result = await response.json();
                console.log(result)
            }
            ajoutCommande();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <a href={"/"}>
                    <img
                        src={"https://res.cloudinary.com/dc1p20eb2/image/upload/v1711445140/Anne%27so%20Naturelle/logo/logo.png"}
                        alt={"logo"} height={125} width={200}/>
                </a>
            </div>

            <OrderProgress/>
            <GoingBack/>
            {isDataLoading ? (
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Loader/>
                    </div>
                ) :
                <div className={"main-div-checkout-payment"}>
                    <div>
                        <h2>Détails de votre commande</h2>
                        <div>
                            {products && products.map((product) => {
                                return (
                                    <div style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        justifyContent: "space-between",
                                        flexDirection: "row",
                                        borderBottom: "1px solid black",
                                        padding: "1em",
                                        width: "100%"
                                    }}>
                                        <div>
                                            <img src={product.cover} height={100} width={100}/>
                                        </div>
                                        <div style={{display: "flex", flexDirection: "column", margin: "0.5em 0 0 0"}}>
                                            <h4 style={{margin: "0 0 2em", maxWidth: "8em"}}>{product.name}</h4>
                                            <h4 style={{margin: "0"}}>x {product.amount}</h4>
                                        </div>
                                        <div style={{margin: "0.5em 0 0 0"}}>
                                            <h4 style={{margin: "0"}}>{product.price} €</h4>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        {adresse ? (
                            <>
                                <h2>Détails de votre livraison</h2>
                                <p>{adresse[2]} {adresse[3]}</p>
                                <p>{adresse[4]}</p>
                                <p>{adresse[5]} {adresse[6]}</p>
                                <p>{adresse[8]}</p>
                                <p>{adresse[9]}</p>
                            </>) : null}
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <h3>Total (TVA incluse)</h3>
                            <h3>{totalCommande.toFixed(2)} €</h3>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                onChange={(e) => setConditionsAccepter(e.target.checked)}
                            />
                            <label>J'ai lu et j'accepte les <a href={"/conditions-generales"}><u>conditions générales de
                                ventes</u></a></label>
                        </div>
                        {console.log(conditionsAccepter)}
                        {erreurConditionsNonAccepter && !conditionsAccepter && <p style={{
                            maxWidth: "25em",
                            color: "red",
                            margin: "1em 0 0 0",
                            textAlign: "center"
                        }}>{erreurConditionsNonAccepter}</p>}
                        <button style={{margin: "2em 0 0 0"}} onClick={() => handleClickPayerCommande()}>Payer ma
                            commande
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default CheckoutPayment;
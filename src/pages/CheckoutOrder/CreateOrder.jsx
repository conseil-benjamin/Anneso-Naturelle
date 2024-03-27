import {useEffect, useState} from "react";
import Cookies from "js-cookie";

function CreateOrder () {
    const [products, setProducts] = useState([])
    const [totalCommande, setTotalCommande] = useState(0);
    const [adresse, setAdresse] = useState([]);
    const [isDataLoading, setDataLoading] = useState(false);
    const [orderAdded, setOrderAdded] = useState(false);
    const clear = () => {
        sessionStorage.clear();
    }

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
                createOrder();
                console.log(products)
                setDataLoading(false);
            }
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }, []);

        const createOrder = () => {
                try {
                    const commande = {
                        idCommande: "CMD556",
                        idClient: Cookies.get("auth_token"),
                        date: new Date(),
                        nbArticles: products.length,
                        adresseLivraison: sessionStorage.getItem("adresseId") ? sessionStorage.getItem("adresseId") : "",
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
                } finally {
                    setOrderAdded(true);
                    clear();
                }
            }

    useEffect(() => {
        if (orderAdded !== true){
            return;
        }
        const sendConfirmationEmail = async () => {
            const sendEmail = await fetch(`${process.env.REACT_APP_API_URL}email`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("auth_token")}`,
                    },
                });
        }
    }, [orderAdded]);

    return(
        <h1>Commande crée avec succès. Vous venez de recevoir un email de confirmation dans votre boite mail.</h1>
    )
}

export default CreateOrder;
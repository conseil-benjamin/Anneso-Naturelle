import "./NavigationProductList.scss"
import {useEffect, useState} from "react";
import {useFiltre} from "../../utils/FiltreContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders} from "@fortawesome/free-solid-svg-icons";

function NavigationProductList({setProductList, setActiveCategory, activeCategory, setFiltreClique}) {
    const [category, setCategory] = useState("");
    const {filtreOuvert, setFiltreOuvert, toggleFiltre} = useFiltre();

    useEffect(() => {
        try {
            const fetchProductsFromOneCategory = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}products/category/${category}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const products = await response.json();
                    setProductList(products);
                    setActiveCategory(category);
                    sessionStorage.setItem('categorieFiltre', JSON.stringify(category));
                } catch (error) {
                    console.error("Erreur de connexion au serveur:", error);
                }
            };
            fetchProductsFromOneCategory();
        } catch (error) {
            console.log(error)
        }
    }, [category]);

    return (
        <>
            <div className={'main-div-navigation-products'}>
                <div className={'div-category-first-and-secondary'}>
                    <h3 onClick={() => setCategory("Bijoux")}>Bijoux et accessoires</h3>
                    <div className={"div-category-secondary"}>
                        <p onClick={() => setCategory("Bracelet")} style={activeCategory === "Bracelet" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>Bracelet</p>
                        <p onClick={() => setCategory("Boucle Oreille")} style={activeCategory === "Boucle Oreille" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>Boucle d'oreille</p>
                        <p onClick={() => setCategory("Accessoire")} style={activeCategory === "Accessoire" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>Accessoire</p>
                    </div>
                </div>
                <div className={'div-category-first-and-secondary'}>
                    <h3 onClick={() => setCategory("Zen")}>Ambiance zen</h3>
                    <div className={"div-category-secondary"}>
                        <p onClick={() => setCategory("Lampe sel")} style={activeCategory === "Lampe sel" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>Lampe de sel</p>
                        <p onClick={() => setCategory("Fontaine interieur")}
                           style={activeCategory === "Fontaine interieur" ? {
                               textDecoration: "underline",
                               fontWeight: "bold",
                               color: "blue"
                           } : {}}>Fontaine d'intérieur</p>
                        <p onClick={() => setCategory("Diffusseur")} style={activeCategory === "Diffusseur" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>Diffuseur d'ambiance</p>
                        <p onClick={() => setCategory("Statue")} style={activeCategory === "Statue" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>Statue</p>
                    </div>
                </div>
                <div className={'div-category-first-and-secondary'}>
                    <h3 onClick={() => setCategory("Bien etre")} style={activeCategory === "Bien etre" ? {
                        textDecoration: "underline",
                        fontWeight: "bold",
                        color: "blue"
                    } : {}}>Bien être</h3>
                    <div className={"div-category-secondary"}>
                        <p onClick={() => setCategory("Purifier")} style={activeCategory === "Purifier" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>Purifier / Assaisir</p>
                        <p onClick={() => setCategory("Plateau recharge")}
                           style={activeCategory === "Plateau recharge" ? {
                               textDecoration: "underline",
                               fontWeight: "bold",
                               color: "blue"
                           } : {}}>PLateau de recharge</p>
                        <p onClick={() => setCategory("Orgonite")} style={activeCategory === "Orgonite" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>Orgonite</p>
                    </div>
                </div>
                <div className={"div-button-filtrer-trier"} onClick={() => setFiltreOuvert(true)}>
                    <FontAwesomeIcon icon={faSliders}/>
                    <p>Trier & Filter</p>
                </div>
            </div>
        </>
    )
}

export default NavigationProductList;
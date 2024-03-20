import "./NavigationProductList.scss"
import {useEffect, useState} from "react";

function NavigationProductList({setProductList, setActiveCategory, activeCategory}) {
    const [category, setCategory] = useState("");

    useEffect(() => {
        try {
            const fetchProductsFromOneCategory = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}products/${category}`, {
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
        } catch (error){
            console.log(error)
        }
    }, [category]);

    return(
        <>
            <div className={'main-div-navigation-products'}>
                <div className={'div-category-first-and-secondary'}>
                    <h3 onClick={() => setCategory("Bijoux")}>Bijoux et accessoires</h3>
                    <div className={"div-category-secondary"}>
                        <h4 onClick={() => setCategory("Bracelet")} style={activeCategory === "Bracelet" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>Bracelet</h4>                        <h4
                        onClick={() => setCategory("Boucle Oreille")} style={activeCategory === "Boucle Oreille" ? {
                        textDecoration: "underline",
                        fontWeight: "bold",
                        color: "blue"
                    } : {}}>Boucle d'oreille</h4>
                        <h4 onClick={() => setCategory("Accessoire")} style={activeCategory === "Accessoire" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>Accessoire</h4>
                    </div>
                </div>
                <div className={'div-category-first-and-secondary'}>
                    <h3 onClick={() => setCategory("Zen")} >Ambiance zen</h3>
                    <div className={"div-category-secondary"}>
                        <h4 onClick={() => setCategory("Lampe sel")} style={activeCategory === "Lampe sel" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>Lampe de sel</h4>
                        <h4 onClick={() => setCategory("Fontaine interieur")} style={activeCategory === "Fontaine interieur" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>Fontaine d'intérieur</h4>
                        <h4 onClick={() => setCategory("Diffusseur")} style={activeCategory === "Diffusseur" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>Diffuseur d'ambiance</h4>
                        <h4 onClick={() => setCategory("Statue")} style={activeCategory === "Statue" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>Statue</h4>
                    </div>
                </div>
                <div className={'div-category-first-and-secondary'}>
                    <h3 onClick={() => setCategory("Bien etre")} style={activeCategory === "Bien etre" ? {
                        textDecoration: "underline",
                        fontWeight: "bold",
                        color: "blue"
                    } : {}}>Bien être</h3>
                    <div className={"div-category-secondary"}>
                        <h4 onClick={() => setCategory("Purifier")} style={activeCategory === "Purifier" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>Purifier / Assaisir</h4>
                        <h4 onClick={() => setCategory("Plateau recharge")} style={activeCategory === "Plateau recharge" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>PLateau de recharge</h4>
                        <h4 onClick={() => setCategory("Orgonite")} style={activeCategory === "Orgonite" ? {
                            textDecoration: "underline",
                            fontWeight: "bold",
                            color: "blue"
                        } : {}}>Orgonite</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavigationProductList;
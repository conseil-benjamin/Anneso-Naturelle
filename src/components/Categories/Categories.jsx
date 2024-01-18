import "./Categories.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronRight, faSliders} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import color from "../../utils/color";

function Categories({
    braceletClique,
    boucleOreilleClique,
    encensClique,
    accesoiresClique,
    setBraceletsClique,
    setBoucleOreilleClique,
    setEncensClique,
    setAccesoiresClique,
    setToutClique,
    toutClique,
    triageActive,
    setActiveTriage,
    setproductList,
    activeCategory,
    minPriceForThisCategory,
    maxPriceForThisCategory, productList,isDataLoading
}) {
    const [categoriesClique, setCategoriesClique] = useState(false);
    const [prixClique, setPrixClique] = useState(false);
    const [pierresClique, setPierresClique] = useState(false);
    const [colorClique, setColorClique] = useState(false);
    const [trieClique, setTrieClique] = useState(false);
    const [range, setRange] = useState([
        minPriceForThisCategory,
        maxPriceForThisCategory,
    ]);
    const [min, setMin] = useState(minPriceForThisCategory);
    const [max, setMax] = useState(maxPriceForThisCategory);
    const [changePriceClique, setChangePriceClique] = useState(false);
    const [hasPriceChanged, setPriceChanged] = useState(false);
    const [pierresBracelets, setPierresBracelets] = useState([]);
    const [pierresChoisies, setPierresChoisies] = useState(JSON.parse(sessionStorage.getItem('pierresChoisies')) || []);
    const [colors, setColors] = useState([]);
    const handleDeleteAllFilters = () => {
        setPierresChoisies([]);
        sessionStorage.removeItem('pierresChoisies');
        setproductList(productList);
    }

    const getProductsByPierresFilter = async () => {
        const infos = {
            pierres: pierresChoisies,
            category: activeCategory,
        }
        if (pierresChoisies.length !== 0) {
            try {
                const response = await fetch("http://localhost:5000/api/v1/products/filtre-pierres", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(infos),
                });

                if (response.ok) {
                    const data = await response.json();
                    setproductList(data);
                } else {
                    console.error("Produit non trouvés");
                }
            } catch (error) {
                console.error("Erreur de connexion au serveur:", error);
            }
        } else{
            try {
                const response = await fetch("http://localhost:5000/api/v1/products/category", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(activeCategory),
                });
                if (response.ok) {
                    const data = await response.json();
                    setproductList(data);
                } else {
                    console.error("Catégorie non trouvés");
                }
            }
        catch (error) {
                console.error("Erreur de connexion au serveur:", error);
            }
        }
        console.log(pierresChoisies);
        sessionStorage.setItem('pierresChoisies', JSON.stringify(pierresChoisies));
    };

    const handleChoixPierres = async (pierre) => {
        setPierresChoisies(prevPierresChoisies => {
            const estDeselectionnee = prevPierresChoisies.includes(pierre);

            let nouvellesPierresChoisies;

            if (estDeselectionnee) {
                // Si la pierre est déjà choisie, la retire de la liste
                nouvellesPierresChoisies = prevPierresChoisies.filter(p => p !== pierre);
            } else {
                // Ajoute la pierre à la liste
                nouvellesPierresChoisies = [...prevPierresChoisies, pierre];
            }

            // Mise à jour du state
            return nouvellesPierresChoisies;
        });
    }


    useEffect(() => {
        // Appel à getProductsByPierresFilter après la mise à jour du state
        getProductsByPierresFilter().then(r => console.log(r));
    }, [pierresChoisies]);


    const handleSliderChange = (minParam, maxParam, range) => {
        setMin(minParam);
        setMax(maxParam);
        setRange(range);
        minParam !== min || maxParam !== max
            ? setPriceChanged(true)
            : setPriceChanged(false);
    };

        const functionPierresBracelet = async () => {
            const pierresBracelet = productList.reduce((acc, product) => {
                if (product.category === "bracelet") {
                    acc = acc.concat(product.pierres);
                }
                return acc;
            }, []);
            return pierresBracelet.filter(
                (pierre, index) => pierresBracelet.indexOf(pierre) === index
            );
        }

        const functionColor = async () => {
            const colorsProduct = productList.reduce((acc, product) => {
                    acc = acc.concat(product.color);
                return acc;
            }, []);
            return colorsProduct.filter(
                (color, index) => colorsProduct.indexOf(color) === index
            );
        }

    useEffect(() => {
        const fetchPierresBracelet = async () => {
            const bracelets = await functionPierresBracelet();
            setPierresBracelets(bracelets);
        }
        fetchPierresBracelet().then(r => console.log(r));
    }, [braceletClique, boucleOreilleClique, encensClique, accesoiresClique, toutClique, productList]);

    useEffect(() => {
        const fetchColor = async () => {
            const colors = await functionColor();
            setColors(colors);
        }
        fetchColor().then(r => console.log(r));
    }, [braceletClique, boucleOreilleClique, encensClique, accesoiresClique, toutClique, productList]);

    useEffect(
        () =>
            async function () {
                try {
                    const response = await fetch(
                        `http://localhost:5000/api/v1/products/${min}/${max}/${activeCategory}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (response.ok) {
                    } else {
                        console.error("Erreur lors de l'insertion des données.");
                    }
                    const productList = await response.json();
                    setproductList(productList);
                } catch (error) {
                    console.error("Erreur de connexion au serveur:", error);
                }
                setChangePriceClique(false);
            },
        [changePriceClique]
    );
    const handleDivClique = (filter) => {
        if (filter === "category" && !categoriesClique) {
            setCategoriesClique(true);
        } else if (filter === "category" && categoriesClique) {
            setCategoriesClique(false);
        } else if (filter === "prix" && !prixClique) {
            setPrixClique(true);
        } else if (filter === "prix" && prixClique) {
            setPrixClique(false);
        } else if (filter === "trie" && !trieClique) {
            setTrieClique(true);
        } else if (filter === "trie" && trieClique) {
            setTrieClique(false);
        } else if(filter === "pierres" && !pierresClique){
            setPierresClique(true);
        } else if(filter === "pierres" && pierresClique){
            setPierresClique(false);
        } else if(filter === "color" && !colorClique){
            setColorClique(true);
        } else if(filter === "color" && colorClique){
            setColorClique(false);
        }
        /**
         * ! Marche pas totalement
         * ! Marche bien pour la div mais pas pour les chevrons
         if (filter === "category") {
         setCategoriesClique((prev) => !prev);
         } else if (filter === "prix") {
         setPrixClique((prev) => !prev);
         }
         */
    };

    const trackStyle = {
        backgroundColor: "#434748", // Remplacez par la couleur que vous souhaitez
        height: 7,
    };

    return (
        <>
            <div className="main-div-categories">
                <div style={{margin: "0 0 0.5em 0",display: "flex", justifyContent: "space-between"}}>
                    <div>
                        <FontAwesomeIcon icon={faSliders} style={{fontSize: "1.25em"}}/>
                        <span style={{margin: "0 0 0 0.5em", fontSize: "1.25em"}}>
                        Filtrer
                    </span>
                    </div>
                    {pierresChoisies.length > 0 ? (
                            <span style={{fontSize: "0.8em", textDecoration: "underline", cursor: "pointer"}} onClick={() =>handleDeleteAllFilters()}>Tout effacer</span>
                        ) : null}
                </div>
                <div className="categories-div">
                    <div
                        className="header-categories"
                        onClick={() => handleDivClique("trie")}
                    >
                        <span>Trier par</span>
                        {!trieClique ? (
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                onClick={() => setTrieClique(true)}
                                className="icon-categories"
                            ></FontAwesomeIcon>
                        ) : (
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                onClick={() => setTrieClique(false)}
                                className="icon-categories"
                            ></FontAwesomeIcon>
                        )}
                    </div>
                    {trieClique ? (
                        <>
                            <div className="radio-trie-div">
                                <label>
                                    <input
                                        type="radio"
                                        value="nom"
                                        checked={triageActive === "nom"}
                                        onChange={(e) => setActiveTriage(e.target.value)}
                                    ></input>
                                    Nom
                                </label>
                            </div>
                            <div className="radio-trie-div">
                                <label>
                                    <input
                                        type="radio"
                                        value="croissant"
                                        checked={triageActive === "croissant"}
                                        onChange={(e) => setActiveTriage(e.target.value)}
                                    ></input>
                                    Prix croissant
                                </label>
                            </div>
                            <div className="radio-trie-div">
                                <label>
                                    <input
                                        type="radio"
                                        value="decroissant"
                                        checked={triageActive === "decroissant"}
                                        onChange={(e) => setActiveTriage(e.target.value)}
                                    ></input>
                                    Prix décroissant
                                </label>
                            </div>
                        </>
                    ) : null}
                </div>
                <div className="categories-div">
                    <div
                        className="header-categories"
                        onClick={() => handleDivClique("category")}
                    >
                        <span>Catégorie</span>
                        {!categoriesClique ? (
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                onClick={() => setCategoriesClique(true)}
                                className="icon-categories"
                            ></FontAwesomeIcon>
                        ) : (
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                onClick={() => setCategoriesClique(false)}
                                className="icon-categories"
                            ></FontAwesomeIcon>
                        )}
                    </div>

                    {categoriesClique ? (
                        <>
                            <a
                                onClick={() =>{ setToutClique(true);
                                    setPierresClique(false);
                                    setColorClique(false);}}
                                style={{
                                    fontWeight: toutClique ? "bold" : "300",
                                    fontSize: 16,
                                }}
                            >
                                Tout
                            </a>
                            <a
                                onClick={() =>{ setBraceletsClique(true);
                                    setPierresClique(false);
                                    setColorClique(false);}}
                                style={{
                                    fontWeight: braceletClique ? "bold" : "300",
                                    fontSize: 16,
                                }}
                            >
                                Bracelets
                            </a>

                            <a
                                onClick={() =>{ setBoucleOreilleClique(true);
                                    setPierresClique(false);
                                    setColorClique(false);}}
                                style={{
                                    fontWeight: boucleOreilleClique ? "bold" : "300",
                                    fontSize: 16,
                                }}
                            >
                                Boucles d'oreilles
                            </a>
                            <a
                                onClick={() => { setEncensClique(true);
                                    setPierresClique(false);
                                    setColorClique(false);}}
                                style={{
                                    fontWeight: encensClique ? "bold" : "300",
                                    fontSize: 16,
                                }}
                            >
                                Esotérique Support à encens
                            </a>
                            <a
                                onClick={() => { setAccesoiresClique(true);
                                    setPierresClique(false);
                                    setColorClique(false);}}
                                style={{
                                    fontWeight: accesoiresClique ? "bold" : "300",
                                    fontSize: 16,
                                }}
                            >
                                Acessoires
                            </a>
                        </>
                    ) : null}
                </div>
                {braceletClique && !isDataLoading ? (
                    <>
                        <div className="categories-div">
                            <div
                                className="header-categories"
                                onClick={() => handleDivClique("pierres")}
                            >
                                <span>Pierres</span>
                                {!pierresClique ? (
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        onClick={() => setPierresClique(true)}
                                        className="icon-categories"
                                    ></FontAwesomeIcon>
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        onClick={() => setPierresClique(false)}
                                        className="icon-categories"
                                    ></FontAwesomeIcon>
                                )}
                            </div>
                            <div className="div-body-filter-card">
                            {pierresClique ? (
                                    pierresBracelets.map((pierre, index) => (
                                        <div key={index}>
                                            <input type="checkbox" id={`pierre-${index}`} value={pierre} checked={pierresChoisies.includes(pierre)} onChange={() => handleChoixPierres(pierre)}
                                            />
                                            <label htmlFor={`pierre-${index}`}>{pierre}</label>
                                        </div>
                                    ))
                            ) : null}
                            </div>
                        </div>
                        <div className="categories-div">
                            <div
                                className="header-categories"
                                onClick={() => handleDivClique("color")}
                            >
                                <span>Couleur</span>
                                {!colorClique ? (
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        onClick={() => setColorClique(true)}
                                        className="icon-categories"
                                    ></FontAwesomeIcon>
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        onClick={() => setColorClique(false)}
                                        className="icon-categories"
                                    ></FontAwesomeIcon>
                                )}
                            </div>
                            <div className="div-body-filter-card">
                                {colorClique ? (
                                        colors.map((color, index) => (
                                            <div key={index}>
                                                <input type="checkbox" id={`color-${index}`} value={color} />
                                                <label htmlFor={`color-${index}`}>{color}</label>
                                            </div>
                                        ))
                                ) : null}
                            </div>
                        </div>
                    </>
                ) : null}
                <div className="categories-div">
                    <div
                        className="header-categories"
                        onClick={() => handleDivClique("prix")}
                    >
                        <span>Prix</span>
                        {!prixClique ? (
                            <FontAwesomeIcon
                                icon={faChevronRight}
                                onClick={() => setPrixClique(true)}
                                className="icon-categories"
                            ></FontAwesomeIcon>
                        ) : (
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                onClick={() => setPrixClique(false)}
                                className="icon-categories"
                            ></FontAwesomeIcon>
                        )}
                    </div>
                    {prixClique ? (
                        <>
                            <div className="div-max-and-min-filter">
                                <input
                                    onChange={(newRange) => setMin(newRange)}
                                    value={min}
                                ></input>
                                <input
                                    onChange={(newRange) => setMax(newRange)}
                                    value={max}
                                ></input>
                            </div>
                            <div className="slider-div">
                                <Slider
                                    range
                                    defaultValue={[
                                        minPriceForThisCategory,
                                        maxPriceForThisCategory,
                                    ]}
                                    min={minPriceForThisCategory}
                                    max={maxPriceForThisCategory}
                                    value={range}
                                    onChange={(range) =>
                                        handleSliderChange(range[0], range[1], range)
                                    }
                                    trackStyle={[trackStyle]}
                                />
                                {hasPriceChanged ? (
                                    <button
                                        onClick={() => setChangePriceClique(true)}
                                        id="btn-valider-filtre-prix"
                                    >
                                        Valider
                                    </button>
                                ) : null}
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default Categories;

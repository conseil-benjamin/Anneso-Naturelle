import "./Categories.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronRight, faSliders} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import color from "../../utils/color";
import {isMobile} from 'react-device-detect';

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
    maxPriceForThisCategory, productList,isDataLoading, setFiltreCategorieMobile, filtreCategorieMobile, setMaxPrice, setminPrice
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
    const [filtrePrix, setFiltrePrix] = useState(JSON.parse(sessionStorage.getItem('filtrePrix')) || []);
    const [categorieFiltre, setCategorieFiltre] = useState(JSON.parse(sessionStorage.getItem('categorieFiltre')) || "");
    const [couleursFiltre, setCouleursFiltre] = useState(JSON.parse(sessionStorage.getItem('couleursFiltre')) || []);
    const [colors, setColors] = useState([]);

    const handleDeleteAllFilters = () => {
        setPierresChoisies([]);
        sessionStorage.clear();
        setToutClique(true);
        setproductList(productList);
    }

    const getProductsByPierresFilter = async () => {
        const infos = {
            pierres: pierresChoisies,
            category: activeCategory,
        }
        if (pierresChoisies.length !== 0) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}products/filtre-pierres`, {
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
                const response = await fetch(`${process.env.REACT_APP_API_URL}products/category`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({activeCategory: activeCategory}),
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
                console.log(activeCategory);
                try {
                    const response = await fetch(
                        `${process.env.REACT_APP_API_URL}products/${min}/${max}/${activeCategory}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if (response.ok) {
                        const productList = await response.json();
                        setproductList(productList);
                    } else {
                        console.error("Erreur lors de l'insertion des données.");
                    }
                } catch (error) {
                    console.error("Erreur de connexion au serveur:", error);
                }
                finally {
                    sessionStorage.setItem('filtrePrix', JSON.stringify([min, max]));
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
        backgroundColor: "#434748",
        height: 7,
    };

    useEffect(() => {
        if (categorieFiltre !== ""){
            setCategoriesClique(true);
            if (categorieFiltre === "tout"){
                setToutClique(true);
            } else if (categorieFiltre === "bracelet"){
                setBraceletsClique(true);
            } else if (categorieFiltre === "boucleOreille"){
                setBoucleOreilleClique(true);
            } else if (categorieFiltre === "encen"){
                setEncensClique(true);
            } else if (categorieFiltre === "accessoire"){
                setAccesoiresClique(true);
            }
        }
        if (filtrePrix.length !== 0){
            setPrixClique(true);
            setMin(filtrePrix[0]);
            setMax(filtrePrix[1]);
            setRange(filtrePrix);
        }
    }, []);

    useEffect(() => {
        setMin(minPriceForThisCategory);
        setMax(maxPriceForThisCategory);
        setRange([minPriceForThisCategory, maxPriceForThisCategory]);
    }, [minPriceForThisCategory, maxPriceForThisCategory]);

    return (
        <>
            <div className="main-div-categories">
                <div className={"header-filter"}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <FontAwesomeIcon icon={faSliders} style={{fontSize: "1.25em"}}/>
                        <span style={{fontSize: "1.10em", width: "100%", margin: "0 0 0 0.25em"}}>
                       Trier & filtrer
                    </span>
                    </div>
                    {/* Ajouter dans le localStorage les filtres suivant : Le prix, les couleurs, la catégorie en cours */}
                    {pierresChoisies.length > 0 || categorieFiltre !== "tout" ? (
                            <span style={{fontSize: "0.8em", textDecoration: "underline", cursor: "pointer", margin: "0 0 0 0.24em", padding: "0 0 0 1.5em"}} onClick={() =>handleDeleteAllFilters()}>Tout effacer</span>
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

                    {/* Faire un moyen de dissocier les filtres pc et mobile en désactivant pour mobile l'effet automatique des filtres.
                        Avec un unique bouton valider appliquer l'ensemble des filtres choisis. [Prix, Couleurs, Pierres, Catégorie]
                        Par exemple pour la catégorie, je stocke dans une variable la catégorie choisie avec un string, et en fonction de la catégorie choisit
                        je vais une fois le bouton valider appuyer faire par exemple un setBraceletsClique(true) si la catégorie choisit est "bracelets"
                     */}
                    {categoriesClique && !isMobile ? (
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
                    ) : categoriesClique && isMobile ? (
                        <>
                            <a
                                onClick={() =>{ setFiltreCategorieMobile("tout");
                                    setPierresClique(false);
                                    setColorClique(false);}}
                                style={{
                                    fontWeight: filtreCategorieMobile === "tout" ? "bold" : "300",
                                    fontSize: 16,
                                }}
                            >
                                Tout
                            </a>
                            <a
                                onClick={() =>{ setFiltreCategorieMobile("bracelet");
                                    setPierresClique(false);
                                    setColorClique(false);}}
                                style={{
                                    fontWeight: filtreCategorieMobile === "bracelet" ? "bold" : "300",
                                    fontSize: 16,
                                }}
                            >
                                Bracelets
                            </a>

                            <a
                                onClick={() =>{ setFiltreCategorieMobile("boucleOreille");
                                    setPierresClique(false);
                                    setColorClique(false);}}
                                style={{
                                    fontWeight: filtreCategorieMobile === "boucleOreille" ? "bold" : "300",
                                    fontSize: 16,
                                }}
                            >
                                Boucles d'oreilles
                            </a>
                            <a
                                onClick={() => { setFiltreCategorieMobile("encen");
                                    setPierresClique(false);
                                    setColorClique(false);}}
                                style={{
                                    fontWeight: filtreCategorieMobile === "encen" ? "bold" : "300",
                                    fontSize: 16,
                                }}
                            >
                                Esotérique Support à encens
                            </a>
                            <a
                                onClick={() => { setFiltreCategorieMobile("accessoire");
                                    setPierresClique(false);
                                    setColorClique(false);}}
                                style={{
                                    fontWeight: filtreCategorieMobile === "accessoire" ? "bold" : "300",
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
                                        <div key={index} className={"div-une-pierre"}>
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
                                            <div key={index} className={"div-une-pierre"}>
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
                                    min={minPriceForThisCategory}
                                    max={maxPriceForThisCategory}
                                    value={range}
                                    onChange={(range) =>
                                        handleSliderChange(range[0], range[1], range)
                                    }
                                    trackStyle={[trackStyle]}
                                />
                                {hasPriceChanged && !isMobile ? (
                                    <button
                                        onClick={() => setChangePriceClique(true)}
                                        id="btn-valider-filtre-prix"
                                    >
                                        Valider
                                    </button>
                                ) : hasPriceChanged && isMobile ? (
                                    setminPrice(min),
                                    setMaxPrice(max)
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

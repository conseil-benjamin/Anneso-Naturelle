import "./FiltreEtTrie.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import Slider from "rc-slider";
import {useSwipeable} from "react-swipeable";
import {useFiltre} from '../../utils/FiltreContext';

function FiltreEtTrie() {
    const {
        filtreOuvert,
        setFiltreOuvert,
        toggleFiltre,
        activeCategory,
        maxPriceForThisCategory,
        minPriceForThisCategory,
        setMaxPrice,
        setActiveTriage,
        triageActive,
        setFiltreValider,
        setminPrice,
        productList
    } = useFiltre();
    const [hasPriceChanged, setPriceChanged] = useState(false);
    const [changePriceClique, setChangePriceClique] = useState(false);
    const [min, setMin] = useState(minPriceForThisCategory);
    const [max, setMax] = useState(maxPriceForThisCategory);
    const [range, setRange] = useState([
        minPriceForThisCategory,
        maxPriceForThisCategory,
    ]);
    const [pierresBracelets, setPierresBracelets] = useState([]);
    const [pierresChoisies, setPierresChoisies] = useState(JSON.parse(sessionStorage.getItem('pierresChoisies')) || []);
    const [couleursChoisies, setCouleursChoisies] = useState(JSON.parse(sessionStorage.getItem('pierresChoisies')) || []);
    const [colors, setColors] = useState([]);


    const handleClose = () => {
        setFiltreOuvert(false);
        document.body.classList.remove('body-lock-scroll');
    };

    const handlers = useSwipeable({
        onSwipedDown: () => handleClose(),
        preventDefaultTouchmoveEvent: true,
    });

    const handleSliderChange = (minParam, maxParam, range) => {
        setMin(minParam);
        setMax(maxParam);
        setminPrice(minParam)
        setMaxPrice(maxParam)
        setRange(range);
        minParam !== min || maxParam !== max
            ? setPriceChanged(true)
            : setPriceChanged(false);
    };

    const trackStyle = {
        backgroundColor: "#040037",
        height: 8
    };

    /**
     * * Récupère les pierres de la liste de produit si les produits sont des bracelets
     * @returns {Promise<*>}
     */
    const functionPierresBracelet = async () => {
        console.log(productList)
        if (!productList) return [];
        const pierresBracelet = productList.reduce((acc, product) => {
            if (product.category === "Bracelet") {
                acc = acc.concat(product.pierres);
            }
            console.log(acc)
            return acc;
        }, []);
        return pierresBracelet.filter(
            (pierre, index) => pierresBracelet.indexOf(pierre) === index
        );
    }

    useEffect(() => {
        const fetchPierresBracelet = async () => {
            const bracelets = await functionPierresBracelet();
            setPierresBracelets(bracelets);
        }
        fetchPierresBracelet().then(r => console.log(r));
    }, [activeCategory, productList]);

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
            sessionStorage.setItem('pierresChoisies', JSON.stringify(nouvellesPierresChoisies));
            return nouvellesPierresChoisies;
        });
    }

    const handleChoixCouleurs = async (couleur) => {
        setCouleursChoisies(prevCouleurChoisie => {
            const estDeselectionnee = prevCouleurChoisie.includes(couleur);

            let nouvellesCouleursChoisies;

            if (estDeselectionnee) {
                // Si la pierre est déjà choisie, la retire de la liste
                nouvellesCouleursChoisies = prevCouleurChoisie.filter(p => p !== couleur);
            } else {
                // Ajoute la pierre à la liste
                nouvellesCouleursChoisies = [...prevCouleurChoisie, couleur];
            }
            // Mise à jour du state
            sessionStorage.setItem('couleursChoisies', JSON.stringify(nouvellesCouleursChoisies));
            return nouvellesCouleursChoisies;
        });
    }

    console.log(activeCategory)


    /**
     * Couleur des pierres de bracelets
     * @returns {Promise<*>}
     */
    const functionColor = async () => {
        if (!productList) return [];
        const colorsProduct = productList.reduce((acc, product) => {
            acc = acc.concat(product.color);
            return acc;
        }, []);
        return colorsProduct.filter(
            (color, index) => colorsProduct.indexOf(color) === index
        );
    }

    useEffect(() => {
        const fetchColor = async () => {
            const colors = await functionColor();
            setColors(colors);
        }
        fetchColor().then(r => console.log(r));
    }, [activeCategory, productList]);

    return (
        <>
            <div
                className={`main-div-filtre-et-trie ${filtreOuvert ? "filtre-visible" : ""}`}
                style={{visibility: filtreOuvert ? "visible" : "hidden"}}
                {...handlers}
            >
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <h3>Trier et filtrer</h3>
                    <FontAwesomeIcon icon={faXmark} onClick={() => setFiltreOuvert(false)}
                                     style={{margin: "0 1em 0 0", fontSize: "1.5em", cursor: "pointer"}}/>
                </div>
                <div>
                    <div style={{backgroundColor: "#F3F3F5", padding: "0.5em"}}>
                        <h4 style={{margin: 0}}>Trier par</h4>
                    </div>
                    <div className="div-trie">
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
                    <div className="div-trie">
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
                    <div className="div-trie">
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
                </div>
                <div style={{backgroundColor: "#F3F3F5", padding: "0.5em", margin: "1em 0 1em 0"}}>
                    <h4 style={{margin: 0}}>Filtrer par</h4>
                </div>
                <div style={{margin: "1em"}}>
                    {(activeCategory === "Bracelet" || activeCategory === "Boucle Oreille") && <h4>Pierres</h4>}
                    {activeCategory === "Bracelet" || activeCategory === "Boucle Oreille" ? (
                        pierresBracelets.map((pierre, index) => (
                            <div key={index} className={"div-une-pierre"}>
                                <input type="checkbox" id={`pierre-${index}`} value={pierre}
                                       checked={pierresChoisies.includes(pierre)}
                                       onChange={() => handleChoixPierres(pierre)}
                                />
                                <label htmlFor={`pierre-${index}`}>{pierre}</label>
                            </div>
                        ))
                    ) : null}
                </div>
                <div style={{margin: "1em"}}>
                    {(activeCategory === "Bracelet" || activeCategory === "Boucle Oreille") && <h4>Couleurs</h4>}
                    {activeCategory === "Bracelet" || activeCategory === "Boucle Oreille" ? (
                        colors.map((color, index) => (
                            <div key={index} className={"div-une-pierre"}>
                                <input type="checkbox" id={`color-${index}`} value={color}
                                       checked={couleursChoisies.includes(color)}
                                       onChange={() => handleChoixCouleurs(color)}/>
                                <label htmlFor={`color-${index}`}>{color}</label>
                            </div>
                        ))
                    ) : null}
                </div>

                <div className="div-max-and-min-filter">
                    <h4>Prix</h4>
                    <p>{min} € - {max} € </p>
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
                </div>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <button style={{width: "100%", backgroundColor: "#302D5B"}}
                            onClick={() => setFiltreValider(true)}>Valider
                    </button>
                </div>
            </div>
        </>
    )
}

export default FiltreEtTrie;
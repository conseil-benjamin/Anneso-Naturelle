import "./FiltreEtTrie.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import Slider from "rc-slider";
import {isMobile} from "react-device-detect";

function FiltreEtTrie({triageActive, setActiveTriage, setFiltreValider, setminPrice, setMaxPrice, minPriceForThisCategory, maxPriceForThisCategory, activeCategory ,productList}) {
    const [filtreClique, setFiltreClique] = useState(false);
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


    const handleSliderChange = (minParam, maxParam, range) => {
        setMin(minParam);
        setMax(maxParam);
        setRange(range);
        minParam !== min || maxParam !== max
            ? setPriceChanged(true)
            : setPriceChanged(false);
    };

    const trackStyle = {
        backgroundColor: "#434748",
        height: 7,
    };


    /**
     * * Récupère les pierres de la liste de produit si les produits sont des bracelets
     * @returns {Promise<*>}
     */
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

    useEffect(() => {
        const fetchPierresBracelet = async () => {
            const bracelets = await functionPierresBracelet();
            setPierresBracelets(bracelets);
        }
        fetchPierresBracelet().then(r => console.log(r));
    }, [activeCategory, productList]);

    return (
        <>
            <div className={"div-button-filtrer-trier"} onClick={() => setFiltreClique(true)}>
                <FontAwesomeIcon icon={faSliders}/>
                <p>Trier & Filter</p>
            </div>
            <div className={'main-div-filtre-et-trie'}
                 style={filtreClique ? {visibility: "visible"} : {visibility: "hidden"}}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <h3>Trier et filtrer</h3>
                    <FontAwesomeIcon icon={faXmark} onClick={() => setFiltreClique(false)}
                                     style={{margin: "0 1em 0 0", fontSize: "1.5em", cursor: "pointer"}}/>
                </div>
                <div>
                    <div style={{backgroundColor: "grey", padding: "0.5em"}}>
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
                <div style={{backgroundColor: "grey", padding: "0.5em", margin: "1em 0 1em 0"}}>
                    <h4 style={{margin: 0}}>Filtrer par</h4>
                </div>
                <h4 style={{margin: "0 0 2em 1em"}}>Prix</h4>
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
                {activeCategory === "Bracelet" ? (
                    pierresBracelets.map((pierre, index) => (
                        <div key={index} className={"div-une-pierre"}>
                            <input type="checkbox" id={`pierre-${index}`} value={pierre} checked={pierresChoisies.includes(pierre)} onChange={() => handleChoixPierres(pierre)}
                            />
                            <label htmlFor={`pierre-${index}`}>{pierre}</label>
                        </div>
                    ))
                ) : null}
                <div>

                </div>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", margin: "2em 0 0 0"}}>
                <button onClick={() => setFiltreValider(true)}>Valider</button>
                </div>
            </div>
        </>
    )
}

export default FiltreEtTrie;
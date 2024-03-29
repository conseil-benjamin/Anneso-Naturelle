import {useEffect, useState} from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import Categories from "../../components/Categories/Categories";
import "./ShoppingList.css";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faFilter, faXmark
} from "@fortawesome/free-solid-svg-icons";
import {Loader} from "../../utils/Loader";

function ShoppingList({cart, updateCart}) {
    const [activeCategory, setActiveCategory] = useState("");
    const [triageActive, setActiveTriage] = useState("");
    const [isAddElement, setAddElement] = useState(false);
    const [productList, setproductList] = useState([]);
    const [toutClique, setToutClique] = useState(false);
    const [braceletsClique, setBraceletsClique] = useState(false);
    const [boucleOreilleClique, setBoucleOreilleClique] = useState(false);
    const [encensClique, setEncensClique] = useState(false);
    const [accesoiresClique, setAccesoiresClique] = useState(false);
    /**
     * * Ceci pose problème car la barre ne s'actualise pas avec le prix minimum de la catégorie mais reste fixé avec ses
     * * valeurs par défaut.
     */
    const [minPriceForThisCategory, setminPriceForThisCategory] = useState(0);
    const [maxPriceForThisCategory, setmaxPriceForThisCategory] = useState(0);
    const [filtreMobileOpen, setfiltreMobileOpen] = useState(false);
    const [cancelFiltre, setCancelFiltre] = useState(false);
    const [isBtnValiderfiltreMobileOpenClique, setBtnValiderfiltreMobileOpenClique] =
        useState(false);

    const navigate = useNavigate();
    const [productAdd, setProductAdd] = useState(false);
    let nameTable = productList;
    const [isDataLoading, setDataLoading] = useState(false);

    const setMinAndMaxPrice = (productList) => {
        const minPrice = Math.min(...productList.map((product) => product.price));
        const maxPrice = Math.max(...productList.map((product) => product.price));
        console.log(minPrice, maxPrice);
        setminPriceForThisCategory(minPrice);
        setmaxPriceForThisCategory(maxPrice);
    };

    useEffect(() => {
        const fetchData = async () => {
            setDataLoading(true);
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}products`
                );
                const productList = await response.json();
                setproductList([]);
                setproductList(productList);
                setDataLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData().then(() => {
            setMinAndMaxPrice(productList);
        });
    }, []);

    useEffect(() => {
        const minPrice = Math.min(...productList.map((product) => product.price));
        const maxPrice = Math.max(...productList.map((product) => product.price));
        setminPriceForThisCategory(minPrice);
        setmaxPriceForThisCategory(maxPrice);
    }, [minPriceForThisCategory, maxPriceForThisCategory]);

    useEffect(() => {
        if (braceletsClique) {
            const fetchData = async () => {
                setDataLoading(true);
                try {
                    const response = await fetch(
                        `${process.env.REACT_APP_API_URL}products/bracelets`
                    );
                    const productList = await response.json();
                    setMinAndMaxPrice(productList);
                    setproductList([]);
                    setActiveCategory("bracelet");
                    setproductList(productList);
                    setAccesoiresClique(false);
                    setBoucleOreilleClique(false);
                    setEncensClique(false);
                    setToutClique(false);
                    setDataLoading(false);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
    }, [braceletsClique]);

    useEffect(() => {
        if (accesoiresClique) {
            const fetchData = async () => {
                setDataLoading(true);
                try {
                    const response = await fetch(
                        `${process.env.REACT_APP_API_URL}products/accessoires`
                    );
                    const productList = await response.json();
                    setMinAndMaxPrice(productList);
                    setproductList([]);
                    setActiveCategory("accessoire");
                    setproductList(productList);
                    setBraceletsClique(false);
                    setBoucleOreilleClique(false);
                    setEncensClique(false);
                    setToutClique(false);
                    setDataLoading(false);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
    }, [accesoiresClique]);

    useEffect(() => {
        if (toutClique) {
            const fetchData = async () => {
                setDataLoading(true);
                try {
                    const response = await fetch(
                        `${process.env.REACT_APP_API_URL}products`
                    );
                    const productList = await response.json();
                    setMinAndMaxPrice(productList);
                    setproductList([]);
                    setproductList(productList);
                    setBraceletsClique(false);
                    setBoucleOreilleClique(false);
                    setEncensClique(false);
                    setAccesoiresClique(false);
                    setDataLoading(false);
                    setActiveCategory("tout");
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
    }, [toutClique]);

    useEffect(() => {
        if (encensClique) {
            const fetchData = async () => {
                setDataLoading(true);
                try {
                    const response = await fetch(
                        `${process.env.REACT_APP_API_URL}products/encens`
                    );
                    const productList = await response.json();
                    setMinAndMaxPrice(productList);
                    setproductList([]);
                    setActiveCategory("encen");
                    setproductList(productList);
                    setMinAndMaxPrice(productList);
                    setBraceletsClique(false);
                    setBoucleOreilleClique(false);
                    setAccesoiresClique(false);
                    setToutClique(false);
                    setDataLoading(false);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
    }, [encensClique]);

    useEffect(() => {
        if (boucleOreilleClique) {
            const fetchData = async () => {
                setDataLoading(true);
                try {
                    const response = await fetch(
                        `${process.env.REACT_APP_API_URL}products/boucles-oreilles`
                    );
                    const productList = await response.json();
                    setMinAndMaxPrice(productList);
                    setproductList([]);
                    setActiveCategory("boucleOreille");
                    setproductList(productList);
                    setBraceletsClique(false);
                    setAccesoiresClique(false);
                    setEncensClique(false);
                    setToutClique(false);
                    setDataLoading(false);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
    }, [boucleOreilleClique]);

    useEffect(() => {
        if (productAdd) {
            navigate("/panier");
            setProductAdd(false);
        }
    }, [productAdd]);

    const trie = () => {
        nameTable = [...productList];

        const sortFunctions = {
            croissant: (a, b) => a.price - b.price,
            decroissant: (a, b) => b.price - a.price,
            nom: (a, b) => (a.name > b.name ? 1 : -1),
            /**
             *
             *       moinsArrosage: (a, b) => a.water - b.water,
             *       plusArrosage: (a, b) => b.water - a.water,
             *       moinsLumiere: (a, b) => a.light - b.light,
             *       plusLumiere: (a, b) => b.light - a.light,
             */
        };

        if (sortFunctions[triageActive]) {
            nameTable = [...nameTable].sort(sortFunctions[triageActive]);
        }
    }

    if (filtreMobileOpen && triageActive) {
        nameTable = [...productList];
    } else if (triageActive) {
        trie();
    }

    const cancelAndClosefiltreMobileOpen = () => {
        if (isBtnValiderfiltreMobileOpenClique) {
            setActiveTriage("");
            trie(); // Appliquer le tri ici si le bouton de validation a été cliqué
        } else {
            setActiveTriage(""); // Ne pas appliquer le tri si le bouton de validation n'a pas été cliqué
        }
        setBtnValiderfiltreMobileOpenClique(false);
        setfiltreMobileOpen(false);
    };


    const validerTrie = () => {
        setBtnValiderfiltreMobileOpenClique(true);
        (triageActive && isBtnValiderfiltreMobileOpenClique) && trie();
        setfiltreMobileOpen(false);
    }

    const openfiltreMobileOpen = () => {
        setfiltreMobileOpen(true);
        setCancelFiltre(false);
        setBtnValiderfiltreMobileOpenClique(false);
        console.log(triageActive);
    }

    return (
        <>
            {filtreMobileOpen ? (
                <>
                    <div>
                        <FontAwesomeIcon icon={faXmark} size="2x" id={"xmark-filtre-mobile"}
                                         onClick={() => cancelAndClosefiltreMobileOpen()} style={{cursor: "pointer"}}/>
                    </div>
                    <div className={"categories-div-mobile"}>
                        <Categories
                            braceletClique={braceletsClique}
                            boucleOreilleClique={boucleOreilleClique}
                            encensClique={encensClique}
                            accesoiresClique={accesoiresClique}
                            setBraceletsClique={setBraceletsClique}
                            setAccesoiresClique={setAccesoiresClique}
                            setBoucleOreilleClique={setBoucleOreilleClique}
                            setEncensClique={setEncensClique}
                            setToutClique={setToutClique}
                            toutClique={toutClique}
                            triageActive={triageActive}
                            setActiveTriage={setActiveTriage}
                            activeCategory={activeCategory}
                            minPriceForThisCategory={minPriceForThisCategory}
                            maxPriceForThisCategory={maxPriceForThisCategory}
                            productList={productList}
                            setproductList={setproductList}
                            isDataLoading={isDataLoading}
                        ></Categories>
                        <button onClick={() => validerTrie()}>Valider</button>
                    </div>
                </>
            ) : (
                <div className="lmj-shopping-list">
                    {/**
                     * Je ne sais pas si je garde la search bar
                     <div className="div-recherche-produit">
                     <input style={{cursor: "default"}}></input>
                     <FontAwesomeIcon
                     icon={faSearch}
                     className="search-bar-class"
                     ></FontAwesomeIcon>
                     </div>
                     */
                    }

                    <div className="div-button-filtre-mobile-vue" onClick={() => openfiltreMobileOpen()
                    }>
                        <button>
                            <FontAwesomeIcon icon={faFilter} style={{margin: "0 0.5em 0 0"}}></FontAwesomeIcon>
                            Filtrer
                        </button>
                    </div>
                    <div className="div-categories-plus-products-list">
                        <div className="categories-and-filtre-and-trie">
                            <Categories
                                braceletClique={braceletsClique}
                                boucleOreilleClique={boucleOreilleClique}
                                encensClique={encensClique}
                                accesoiresClique={accesoiresClique}
                                setBraceletsClique={setBraceletsClique}
                                setAccesoiresClique={setAccesoiresClique}
                                setBoucleOreilleClique={setBoucleOreilleClique}
                                setEncensClique={setEncensClique}
                                setToutClique={setToutClique}
                                toutClique={toutClique}
                                triageActive={triageActive}
                                setActiveTriage={setActiveTriage}
                                setproductList={setproductList}
                                activeCategory={activeCategory}
                                minPriceForThisCategory={minPriceForThisCategory}
                                maxPriceForThisCategory={maxPriceForThisCategory}
                                productList={productList}
                                isDataLoading={isDataLoading}
                            ></Categories>
                        </div>
                        {isDataLoading ? (
                            <div className="loader-div-shopping-list">
                                <Loader/>
                            </div>
                        ) : (
                            <ul className="lmj-plant-list">
                                {nameTable.map(({id, cover, name, water, light, price, category, description, pierres }) => (
                                    !activeCategory || activeCategory === category ? (
                                        <div key={id} className="div-product">
                                            <ProductItem
                                                id={id}
                                                cover={cover}
                                                name={name}
                                                water={water}
                                                light={light}
                                                price={price}
                                                description={description}
                                                category={category}
                                                pierres={pierres}
                                            />
                                        </div>
                                    ) : null
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default ShoppingList;

import {useEffect, useState} from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import Categories from "../../components/Categories/Categories";
import "./ShoppingList.css";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faFilter, faXmark, faSliders
} from "@fortawesome/free-solid-svg-icons";
import {Loader} from "../../utils/Loader";
import async from "async";

function ShoppingList({cart, updateCart}) {
    const [activeCategory, setActiveCategory] = useState("");
    const [triageActive, setActiveTriage] = useState("");
    const [productList, setproductList] = useState([]);
    const [toutClique, setToutClique] = useState(false);
    const [braceletsClique, setBraceletsClique] = useState(false);
    const [boucleOreilleClique, setBoucleOreilleClique] = useState(false);
    const [encensClique, setEncensClique] = useState(false);
    const [accesoiresClique, setAccesoiresClique] = useState(false);
    const [minPriceForThisCategory, setminPriceForThisCategory] = useState(JSON.parse(sessionStorage.getItem('filtrePrix')) ? JSON.parse(sessionStorage.getItem('filtrePrix'))[0] : 0);
    const [maxPriceForThisCategory, setmaxPriceForThisCategory] = useState(JSON.parse(sessionStorage.getItem('filtrePrix')) ? JSON.parse(sessionStorage.getItem('filtrePrix'))[1] : 0);
    const [minPrice, setminPrice] = useState(JSON.parse(sessionStorage.getItem('filtrePrix')) ? JSON.parse(sessionStorage.getItem('filtrePrix'))[0] : 0);
    const [maxPrice, setmaxPrice] = useState(JSON.parse(sessionStorage.getItem('filtrePrix')) ? JSON.parse(sessionStorage.getItem('filtrePrix'))[1] : 0);
    const [filtreMobileOpen, setfiltreMobileOpen] = useState(false);
    const [cancelFiltre, setCancelFiltre] = useState(false);
    const [isBtnValiderfiltreMobileOpenClique, setBtnValiderfiltreMobileOpenClique] =
        useState(false);

    const navigate = useNavigate();
    const [productAdd, setProductAdd] = useState(false);
    console.log(productList);
    let nameTable = productList;
    const [isDataLoading, setDataLoading] = useState(false);
    const [filtreCategorieMobile, setFiltreCategorieMobile] = useState("");

    const setMinAndMaxPrice = (productList) => {
        const minPrice = Math.min(...productList.map((product) => product.price));
        const maxPrice = Math.max(...productList.map((product) => product.price));
        console.log(minPrice, maxPrice);
        setminPriceForThisCategory(minPrice);
        setmaxPriceForThisCategory(maxPrice);
        setminPrice(minPrice);
        setmaxPrice(maxPrice);
    };

    useEffect(() => {
        // faire la même chose pour les pierres par exemple
        if (sessionStorage.getItem('categorieFiltre') && sessionStorage.getItem('filtrePrix')) {
            const getProductsByPrixPlusCategory = async () => {
                try {
                    const response = await fetch(
                        `${process.env.REACT_APP_API_URL}products/${JSON.parse(sessionStorage.getItem('filtrePrix'))[0]}/${JSON.parse(sessionStorage.getItem('filtrePrix'))[1]}/${JSON.parse(sessionStorage.getItem('categorieFiltre'))}`,
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
            }
            getProductsByPrixPlusCategory();
        } else{
            const fetchData = async () => {
                setDataLoading(true);
                try {
                    const response = await fetch(
                        `${process.env.REACT_APP_API_URL}products`
                    );
                    const productList = await response.json();
                    setproductList(productList);
                    setDataLoading(false);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData().then(() => {
                setMinAndMaxPrice(productList);
            });
        }
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
                    sessionStorage.setItem('categorieFiltre', JSON.stringify("bracelet"));
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
    }, [braceletsClique]);

    useEffect(() => {
        sessionStorage.setItem('filtrePrix', JSON.stringify([minPriceForThisCategory, maxPriceForThisCategory]));
    }, [minPriceForThisCategory, maxPriceForThisCategory]);

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
                    sessionStorage.setItem('categorieFiltre', JSON.stringify("accessoire"));
                    //sessionStorage.setItem('filtrePrix', JSON.stringify([minPriceForThisCategory, maxPriceForThisCategory]));
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
                    setproductList(productList);
                    setBraceletsClique(false);
                    setBoucleOreilleClique(false);
                    setEncensClique(false);
                    setAccesoiresClique(false);
                    setDataLoading(false);
                    setActiveCategory("tout");
                    sessionStorage.setItem('categorieFiltre', JSON.stringify("tout"));
                    sessionStorage.setItem('filtrePrix', JSON.stringify([minPriceForThisCategory, maxPriceForThisCategory]));
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
                    setActiveCategory("encen");
                    setproductList(productList);
                    setBraceletsClique(false);
                    setBoucleOreilleClique(false);
                    setAccesoiresClique(false);
                    setToutClique(false);
                    setDataLoading(false);
                    sessionStorage.setItem('categorieFiltre', JSON.stringify("encen"));
                    sessionStorage.setItem('filtrePrix', JSON.stringify([minPriceForThisCategory, maxPriceForThisCategory]));
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
                    sessionStorage.setItem('categorieFiltre', JSON.stringify("boucleOreille"));
                    sessionStorage.setItem('filtrePrix', JSON.stringify([minPriceForThisCategory, maxPriceForThisCategory]));
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
    }, [boucleOreilleClique]);

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

    /*
    useEffect(() => {
        console.log("dzqdzqdzqdqdqzdqz")
        if (activeCategory === "bracelet") {
            setBraceletsClique(true);
        } else if (activeCategory === "accessoire") {
            setAccesoiresClique(true);
        } else if (activeCategory === "tout") {
            setToutClique(true);
        } else if (activeCategory === "encen") {
            setEncensClique(true);
        } else if (activeCategory === "boucleOreille") {
            setBoucleOreilleClique(true);
        }
    }, [activeCategory]);
*/

    const validerTrie = () => {
        setBtnValiderfiltreMobileOpenClique(true);
        (triageActive && isBtnValiderfiltreMobileOpenClique) && trie();
        setfiltreMobileOpen(false);
    }

    useEffect(() => {
        if (!isBtnValiderfiltreMobileOpenClique) {
            return;
        }
        setActiveCategory(filtreCategorieMobile);
        console.log(filtreCategorieMobile);
        console.log(activeCategory);
    }, [filtreCategorieMobile && isBtnValiderfiltreMobileOpenClique]);

    useEffect(() => {
        if (!isBtnValiderfiltreMobileOpenClique || !minPrice || !maxPrice) {
            return;
        }
        const getProductsByPrixPlusCategory = async () => {
            console.log("salutttttttttttttttttttttttttttttt")
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}products/${minPrice}/${maxPrice}/${activeCategory}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.ok) {
                    const productList = await response.json();
                    console.log(productList);
                    setproductList(productList);
                } else {
                    console.error("Erreur lors de l'insertion des données.");
                }
            } catch (error) {
                console.error("Erreur de connexion au serveur:", error);
            } finally {
                sessionStorage.setItem('filtrePrix', JSON.stringify([minPrice, maxPrice]));
                sessionStorage.setItem('categorieFiltre', JSON.stringify(activeCategory));
                console.log(activeCategory)
            }
        }
        getProductsByPrixPlusCategory();
    }, [minPrice, maxPrice, activeCategory]);

    const openfiltreMobileOpen = () => {
        setfiltreMobileOpen(true);
        setCancelFiltre(false);
        setBtnValiderfiltreMobileOpenClique(false);
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
                            setFiltreCategorieMobile={setFiltreCategorieMobile}
                            filtreCategorieMobile={filtreCategorieMobile}
                            setminPrice={setminPrice}
                            setMaxPrice={setmaxPrice}
                        ></Categories>
                        <button onClick={() => validerTrie()}>Valider</button>
                    </div>
                </>
            ) : (
                <div className="lmj-shopping-list">
                    <div className="div-button-filtre-mobile-vue" onClick={() => openfiltreMobileOpen()
                    }>
                        <button>
                            <FontAwesomeIcon icon={faSliders} style={{margin: "0 0.5em 0 0"}}></FontAwesomeIcon>
                            Trier et filtrer
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

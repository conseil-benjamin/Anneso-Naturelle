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
import NavigationProductList from "../../components/NavigationProductList/NavigationProductList";
import FiltreEtTrie from "../../components/FiltreEtTrie/FiltreEtTrie";

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
    const [filtreValider, setFiltreValider] = useState(false);
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
        setMinAndMaxPrice(productList);
    }, [productList]);

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

    if (triageActive && filtreValider === true) {
        trie();
    }

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

    return (
        <>
                <div className="lmj-shopping-list">
                    <div className="div-categories-plus-products-list">
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <NavigationProductList setProductList={setproductList} setActiveCategory={setActiveCategory} activeCategory={activeCategory}/>
                            <FiltreEtTrie setActiveTriage={setActiveTriage} triageActive={triageActive} filtreValide={filtreValider} setFiltreValider={setFiltreValider} maxPriceForThisCategory={maxPriceForThisCategory} minPriceForThisCategory={minPriceForThisCategory} setMaxPrice={setmaxPrice} setminPrice={setminPrice} activeCategory={activeCategory} productList={productList}/>
                        </div>
                        {isDataLoading ? (
                            <div className="loader-div-shopping-list">
                                <Loader/>
                            </div>
                        ) : (
                            <ul className="lmj-plant-list">
                                {nameTable.map(({
                                                    id,
                                                    cover,
                                                    name,
                                                    price,
                                                    category,
                                                    description,
                                                    pierres
                                                }) => (
                                    !activeCategory || activeCategory === category ? (
                                        <div key={id} className="div-product">
                                            <ProductItem
                                                id={id}
                                                cover={cover}
                                                name={name}
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
        </>
    );
}

export default ShoppingList;

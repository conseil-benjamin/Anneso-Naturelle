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
import {useFiltre} from "../../utils/FiltreContext";

function ShoppingList({cart, updateCart, setproductList, productList, minPrice, setMinPrice, maxPrice, setMaxPrice}) {
    //const [activeCategory, setActiveCategory] = useState("");
    //const [triageActive, setActiveTriage] = useState("");
    //const [minPriceForThisCategory, setminPriceForThisCategory] = useState(JSON.parse(sessionStorage.getItem('filtrePrix')) ? JSON.parse(sessionStorage.getItem('filtrePrix'))[0] : 0);
    //const [maxPriceForThisCategory, setmaxPriceForThisCategory] = useState(JSON.parse(sessionStorage.getItem('filtrePrix')) ? JSON.parse(sessionStorage.getItem('filtrePrix'))[1] : 0);
    //const [filtreValider, setFiltreValider] = useState(false);

    const [toutClique, setToutClique] = useState(false);
    const [braceletsClique, setBraceletsClique] = useState(false);
    const [boucleOreilleClique, setBoucleOreilleClique] = useState(false);
    const [encensClique, setEncensClique] = useState(false);
    const [accesoiresClique, setAccesoiresClique] = useState(false);
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

    /**
     * MISE A JOUR
     * @param productList
     */
    const {
        activeCategory,
        setActiveCategory,
        triageActive,
        setActiveTriage,
        minPriceForThisCategory,
        setminPriceForThisCategory,
        maxPriceForThisCategory,
        setmaxPriceForThisCategory,
        filtreValider,
        setFiltreValider
    } = useFiltre();

    const setMinAndMaxPrice = (productList) => {
        const minPrice = Math.min(...productList.map((product) => product.price));
        const maxPrice = Math.max(...productList.map((product) => product.price));
        console.log(minPrice, maxPrice);
        setminPriceForThisCategory(minPrice);
        setmaxPriceForThisCategory(maxPrice);
        setMinPrice(minPrice);
        setMaxPrice(maxPrice);
    };

    useEffect(() => {
        // faire la même chose pour les pierres par exemple
        if (sessionStorage.getItem('categorieFiltre')){
            console.log("dzqdzqdzq")
            try {
                const fetchProductsFromOneCategory = async () => {
                    try {
                        console.log(JSON.parse((sessionStorage.getItem('categorieFiltre'))))
                        const response = await fetch(`${process.env.REACT_APP_API_URL}products/category/${JSON.parse(sessionStorage.getItem('categorieFiltre'))}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });
                        const products = await response.json();
                        setproductList(products);
                    } catch (error) {
                        console.error("Erreur de connexion au serveur:", error);
                    }
                };
                fetchProductsFromOneCategory();
        } catch (error){
                console.log(error)}
        }
        else {
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
        sessionStorage.setItem('filtrePrix', JSON.stringify([minPriceForThisCategory, maxPriceForThisCategory]));
    }, [minPriceForThisCategory, maxPriceForThisCategory]);


    const trie = () => {
        nameTable = [...productList];
        const filteredData = nameTable.filter(item => item.price >= minPrice && item.price <= maxPrice)
        const sortFunctions = {
            croissant: (a, b) => a.price - b.price,
            decroissant: (a, b) => b.price - a.price,
            nom: (a, b) => (a.name > b.name ? 1 : -1),
        };
        if (sortFunctions[triageActive]) {
            nameTable = [...filteredData].sort(sortFunctions[triageActive]);
        }
    }

    if (triageActive && filtreValider === true) {
        trie();
    }

    return (
        <>
            <div className="lmj-shopping-list">
                <div className="div-categories-plus-products-list">
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                        <NavigationProductList setProductList={setproductList} setActiveCategory={setActiveCategory}
                                               activeCategory={activeCategory}/>
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

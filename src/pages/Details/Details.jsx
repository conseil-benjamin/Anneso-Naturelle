import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Details.css";
import { Loader } from "../../utils/Loader";
import Categories from "../../components/Categories/Categories";
import FiltreTrie from "../../components/FiltreTrie/FiltreTrie";
import Select from "../../components/Select/Select.tsx";

function Details({ cart, updateCart }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isDataLoading, setDataLoading] = useState(false);
  const [productAdd, setProductAdd] = useState(false);
  const [isAddElement, setAddElement] = useState(false);
  const [produit, setProduit] = useState([]);
  const tableauObjet = Object.values(produit);
  const [selectedBraceletSize, setSelectedBraceletSize] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/products/${id}`
        );
        const product = await response.json();
        setProduit(product);
      } catch (error) {
        console.error(error);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, [id]);

  function addToCart(cover, name, price, idProduct) {
    setProductAdd(true);
    const currentPlantSaved = cart.find((plant) => plant.name === name);
    if (currentPlantSaved) {
      let amountTotal = currentPlantSaved.amount;
      const cartFilteredCurrentPlant = cart.filter(
          (plant) => plant.name !== name
      );
      updateCart([
        ...cartFilteredCurrentPlant,
        { cover, name, price, idProduct, amount: amountTotal + 1 },
      ]);
      localStorage.setItem("nbElement", JSON.stringify(amountTotal + 1));
    } else {
      updateCart([...cart, { cover, name, price, idProduct, amount: 1 }]);
      localStorage.setItem("nbElement", JSON.stringify(1));
      const nbArticles = JSON.parse(localStorage.getItem("nbArticles"));
      localStorage.setItem("nbArticles", JSON.stringify(nbArticles + 1));
    }
    setAddElement(true);
  }

  useEffect(() => {
    if (productAdd) {
      navigate("/Panier");
      setProductAdd(false);
    }
  }, [productAdd]);

  return (
    <div className="bodyElementDetails">
      {isDataLoading ? (
        <div className="loader-div">
          <Loader />
        </div>
      ) : (
        <>
          <div className="return-to-collection">
            <Link to="/collections">
              <img
                src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1700322943/Icon_retour_arriere.png"
                alt="Description de l'image"
                width={25}
                height={25}
              />
            </Link>
          </div>
          <div className="div-container-left-plus-right">
            <div className="container-left-details">
              {tableauObjet.map((produit) => (
                <img
                  key={produit.id}
                  src={produit.cover}
                  width={250}
                  height={250}
                  alt="Image plante"
                  id="image_produit"
                />
              ))}
            </div>
            <div className="details-list">
              {tableauObjet.map((produit) => (
                  <div key={produit.id}>
                    <h1>{produit.name}</h1>
                    <p>Prix : {produit.price} €</p>
                    <p className="description">{produit.description}</p>
                      {produit.category === "bracelet" ? (
                          <>
                            <div>
                              <p>Pierres présentes sur le bracelet :</p>
                              <ul>
                                {tableauObjet.map((produit) => (
                                    produit.pierres.map((pierre) => (
                                        <li>{pierre}</li>
                                    ))
                                ))}
                              </ul>
                            </div>
                              <Select/>
                          </>
                      ) : null}
                    <button
                        role="button"
                        onClick={() =>
                            addToCart(produit.cover, produit.name, produit.price, produit.id)
                        }
                    >
                      Ajouter au panier
                    </button>
                  </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Details;

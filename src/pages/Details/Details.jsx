import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Details.css";
import CareScale from "../../components/CareScale/CareScale";
import { Loader } from "../../utils/Loader";

function Details({ cart, updateCart }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isDataLoading, setDataLoading] = useState(false);
  const [productAdd, setProductAdd] = useState(false);
  const [isAddElement, setAddElement] = useState(false);
  const [produit, setProduit] = useState([]);
  const tableauObjet = Object.values(produit);

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

  function addToCart(cover, name, price) {
    setProductAdd(true);
    setAddElement(true);
    const currentPlantSaved = cart.find((plant) => plant.name === name);
    const updatedCart = currentPlantSaved
      ? cart.filter((plant) => plant.name !== name)
      : [...cart, { cover, name, price, amount: 0 }];

    updateCart([
      ...updatedCart,
      {
        name,
        price,
        amount: currentPlantSaved ? currentPlantSaved.amount + 1 : 1,
      },
    ]);
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
                <p>Nom : {produit.name}</p>
                <p>Plante {produit.category}</p>
                <div className="careScaleDetails">
                  <p> Echelle d'arrosage nécessaire : (1-3) </p>
                  <CareScale careType="water" scaleValue={produit.water} />
                </div>
                <div className="careScaleDetails">
                  <p> Echelle de luminosité nécessaire : (1-3) </p>
                  <CareScale careType="light" scaleValue={produit.light} />
                </div>
                <p>Prix : {produit.price} €</p>
                <p className="description">{produit.description}</p>
                <button
                  className="button-56"
                  role="button"
                  onClick={() =>
                    addToCart(produit.cover, produit.name, produit.price)
                  }
                >
                  Ajouter au panier
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Details;

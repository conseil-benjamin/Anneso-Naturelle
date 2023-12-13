import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "./Details.css";
import CareScale from "../../components/CareScale/CareScale";
import { useState, useEffect } from "react";
import { Loader } from "../../utils/Loader";

function Details({ cart, updateCart }) {
  const navigate = useNavigate();
  const [isDataLoading, setDataLoading] = useState(false);
  const [productAdd, setProductAdd] = useState(false);
  const [isAddElement, setAddElement] = useState(false);
  const [produit, setProduit] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setDataLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/products/" + id
        );
        const product = await response.json();
        setProduit(product);
        console.log(product);
      } catch (error) {
        console.error(error);
      } finally {
        setDataLoading(false);
      }
    };
    fetchData();
  }, []);

  function addToCart(name, price) {
    const currentPlantSaved = cart.find((plant) => plant.name === name);
    if (currentPlantSaved) {
      const cartFilteredCurrentPlant = cart.filter(
        (plant) => plant.name !== name
      );
      updateCart([
        ...cartFilteredCurrentPlant,
        { name, price, amount: currentPlantSaved.amount + 1 },
      ]);
      setProductAdd(true);
    } else {
      updateCart([...cart, { name, price, amount: 1 }]);
      setProductAdd(true);
    }
    setAddElement(true);
    productAdd && navigate("/Panier");
    setProductAdd(false);
  }

  return (
    <div className="bodyElementDetails">
      {isDataLoading ? (
        <Loader />
      ) : (
        <>
          <div className="return-to-collection">
            <Link to="/collections">
              <img
                src={
                  "https://res.cloudinary.com/dc1p20eb2/image/upload/v1700322943/Icon_retour_arriere.png"
                }
                alt="Description de l'image"
                width={25}
                height={25}
              />
            </Link>
          </div>
          <div className="container-left-details">
            <img
              src={produit.cover}
              width={250}
              height={250}
              alt="Image plante"
              id="image_produit"
            ></img>
          </div>
          <div className="details-list">
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
              class="button-56"
              role="button"
              onClick={() => addToCart(produit.name, produit.price)}
            >
              Ajouter au panier
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Details;

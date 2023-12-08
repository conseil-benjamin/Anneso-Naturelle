import { useLocation, useParams } from "react-router-dom";
import "./DetailsCommande.css";
import { useEffect, useState } from "react";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";

function DetailsCommande() {
  const location = useLocation();
  const { contenuCommande } = location.state || {};
  const { numOrder } = useParams();
  const [commande, setCommande] = useState([]);
  const tableauObjet = Object.values(commande);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/commandes/" + numOrder
        );
        const commande = await response.json();
        console.log(commande);
        setCommande(commande);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const produitCommande = contenuCommande.map((commande) => (
    <>
      <h2>{commande.produit}</h2>
      <img
        src={commande.cover}
        height={100}
        width={100}
        alt="image_produit"
      ></img>
      <h3>{commande.prix} €</h3>
    </>
  ));

  return (
    <>
      <div className="div-principal-detailsCommande">
        <NavBarProfil></NavBarProfil>
        <div className="div-commandes">
          <h2>
            <u>Commande N°{numOrder}</u>
          </h2>
          {commande ? (
            tableauObjet.map((commande, index) => <>{produitCommande[index]}</>)
          ) : (
            <div>
              <h1>Aucune commande pour le moment</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DetailsCommande;

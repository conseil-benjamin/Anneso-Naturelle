import { useParams } from "react-router-dom";
import "./DetailsCommande.css";
import { useEffect, useState } from "react";

function DetailsCommande() {
  const { numOrder } = useParams();
  const [commande, setCommande] = useState([]);

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

  return (
    <>
      <h2>Commande N°{numOrder}</h2>
      {/*

      <div className="div-commande">
        {commande ? (
          commande.map((commandeDetails) => (
            <h1>{commandeDetails.idCommande}</h1>
          ))
        ) : (
          <div>
            <h1>Aucune commande pour le moment</h1>
          </div>
        )}
      </div>
      */}
    </>
  );
}

export default DetailsCommande;

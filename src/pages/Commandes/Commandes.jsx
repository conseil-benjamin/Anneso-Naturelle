import { useLocation, useNavigate } from "react-router-dom";

function Commandes() {
  const location = useLocation();
  const { idCommande, date, prixTotal, contenuCommande } = location.state || {};
  return (
    <>
      <h1>Vos Commandes</h1>
      <h2>Id :{idCommande}</h2>
      <h2>Date : {date}</h2>
      <h2>Contenu commande : {contenuCommande}</h2>
      <h2>Prix total : {prixTotal}</h2>
    </>
  );
}

export default Commandes;

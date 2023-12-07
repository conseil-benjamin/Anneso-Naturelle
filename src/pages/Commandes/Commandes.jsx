import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import CardCommande from "../../components/CardCommande/CardCommande";

function Commandes() {
  const location = useLocation();
  const { commandes } = location.state || {};

  const tableauObjet = Object.values(commandes);

  const isLogged = localStorage.getItem("id");
  // faire en sorte que quand le client arrive sur cette page sans cliquer sur un bouton qui l'anmmène (un navigate)
  // on récupère son id, et on refais une requete api pour récupérer les données du client connecté
  // a voir plus tard - pas essentielle maintenant
  const [clientId, setClientId] = useState(
    isLogged ? JSON.parse(isLogged) : null
  );
  //!location.state && isLogged ?

  return (
    <>
      <div className="div-main-profil">
        <NavBarProfil></NavBarProfil>
        <div className="div-commandes">
          <h1>Vos Commandes</h1>
          {commandes ? (
            tableauObjet.map((commande) => (
              <CardCommande
                key={commande.idCommande}
                idCommande={commande.idCommande}
                date={commande.date}
                prixTotal={commande.prixTotal}
              ></CardCommande>
            ))
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

export default Commandes;

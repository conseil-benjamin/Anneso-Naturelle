import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import "./Adresses.css";
import CardAdressses from "../../components/CardAdresses/CardAdresses";

function Adresses() {
  const navigate = useNavigate();
  const location = useLocation();
  const { adresses } = location.state || {};
  console.log(adresses);

  const tableauObjet = Object.values(adresses);
  const isLogged = localStorage.getItem("id");
  const [btnAddAdresseClique, setbtnAddAdresseClique] = useState(false);

  // faire en sorte que quand le client arrive sur cette page sans cliquer sur un bouton qui l'anmmène (un navigate)
  // on récupère son id, et on refais une requete api pour récupérer les données du client connecté
  // a voir plus tard - pas essentielle maintenant
  const [clientId, setClientId] = useState(
    isLogged ? JSON.parse(isLogged) : null
  );

  useEffect(() => {
    if (btnAddAdresseClique) {
      navigate("/Profil/adresses/ajoutAdresse");
    }
  }, [btnAddAdresseClique]);

  return (
    <>
      <div className="div-main-page-adresses">
        <NavBarProfil></NavBarProfil>
        <div className="div-adresses">
          <h1>Mes adresses</h1>
          {adresses ? (
            tableauObjet.map((adresse) => (
              <CardAdressses
                adresseId={adresse.adresseId}
                nomPersonne={adresse.nomPersonne}
                prenomPersonne={adresse.prenomPersonne}
                adresse={adresse.adresse}
                codePostal={adresse.codePostal}
                pays={adresse.pays}
                ville={adresse.ville}
                complementAdresse={adresse.complementAdresse}
                numTel={adresse.numTel}
              ></CardAdressses>
            ))
          ) : (
            <div>
              <h2>Aucune adresse pour le moment</h2>
            </div>
          )}
          <button onClick={() => setbtnAddAdresseClique(true)} id="btn-add-adresse">
            Ajouter une adresse
          </button>
        </div>
      </div>
    </>
  );
}

export default Adresses;

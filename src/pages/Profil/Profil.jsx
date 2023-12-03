import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Profil.css";
import { useState, useEffect } from "react";

function Profil() {
  const location = useLocation();
  const {
    id,
    nom,
    prenom,
    adresses,
    adresseEmail,
    mdp,
    numeroTel,
    iconProfil,
  } = location.state || {};
  const navigate = useNavigate();

  const [infosPersoClique, setInfosPersoClique] = useState(true);
  const [commandesClique, setCommandesClique] = useState(false);
  const [adressesClique, setAdressesClique] = useState(false);

  function deconnect() {
    localStorage.removeItem("id");
    navigate("/");
  }

  useEffect(() => {
    if (commandesClique) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/api/v1/commandes"
          );
          const commandes = await response.json();
          const commandesFound = commandes.find(
            ({ idClient }) => id === idClient
          );
          navigate("/Profil/commandes", {
            state: {
              idCommande: commandesFound.idCommande,
              date: commandesFound.date,
              // marche pas fait crash
              //contenuCommande: commandesFound.contenuCommande,
              prixTotal: commandesFound.prixTotal,
            },
          });
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [commandesClique]);

  return (
    <div className="div-infos-client">
      <img src={iconProfil} alt="icone_profil"></img>
      <div className="navbar-profil">
        <a
          href="/Profil/infos-persos"
          onClick={() => setInfosPersoClique(true)}
        >
          Infos personnelles
        </a>
        <hr />
        <hr />
        <a href="">Mes commandes</a>
        <button onClick={() => setCommandesClique(true)}>Commandes</button>
      </div>
      {infosPersoClique ? (
        <div className="div-infos-perso">
          <h2>Identifiant {id}</h2>
          <h2>Nom : {nom}</h2>
          <h2>Prénom : {prenom}</h2>
          <h2>Adresse Email : {adresseEmail}</h2>
          <h2>Mot de passe : {mdp}</h2>
          <h2>Numéro de téléphone : {numeroTel}</h2>
        </div>
      ) : null}
      <button className="btn-sign-out" onClick={() => deconnect()}>
        Se déconnecter
        <FontAwesomeIcon className="icon-signOut" icon={faSignOutAlt} />
      </button>
    </div>
  );
}

export default Profil;

import { useLocation, useParams } from "react-router-dom";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import "./DetailsAdresses.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DetailsAdresses() {
  const location = useLocation();
  const {
    adresseId,
    adresse,
    ville,
    codePostal,
    pays,
    complementAdresse,
    nomPersonne,
    prenomPersonne,
    numTel,
  } = location.state || {};
  const { numAdresse } = useParams();

  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [societe, setSociete] = useState("");
  const [Telephone, setTelephone] = useState("");
  const [CodePostal, setCodePostal] = useState("");
  const [Ville, setVille] = useState("");
  const [Adresse, setAdresse] = useState("");
  const [ComplementAdresse, setComplementAdresse] = useState("");
  const [Pays, setPays] = useState("");

  useEffect(() => {
    setNom(nomPersonne);
    setPrenom(prenomPersonne);
    setTelephone(numTel);
    setCodePostal(codePostal);
    setVille(ville);
    setAdresse(adresse);
    setComplementAdresse(complementAdresse);
    setPays(pays);
  }, []);

  return (
    <div className="div-main-details-adresse">
      <NavBarProfil></NavBarProfil>
      <div className="div-infos-adresse">
        <div className="infos-details-adresse" id="form1">
          <label>Adresse</label>
          <input
            className="input-login"
            value={Adresse}
            placeholder="Adresse"
            //onBlur={handleBlurPassword}
            onChange={(e) => setAdresse(e.target.value)}
          />
          <label>Code postal</label>
          <input
            className="input-login"
            value={CodePostal}
            placeholder="Code Postal"
            //onBlur={handleBlurPassword}
            onChange={(e) => setCodePostal(e.target.value)}
          />
          <label>Ville</label>
          <input
            className="input-login"
            value={Ville}
            placeholder="Ville"
            //onBlur={handleBlurPassword}
            onChange={(e) => setVille(e.target.value)}
          />
          <label>Complément d'adresse</label>
          <input
            className="input-login"
            value={ComplementAdresse}
            placeholder="Complément d'adresse"
            //onBlur={handleBlurPassword}
            onChange={(e) => setComplementAdresse(e.target.value)}
          />
          <label>Pays</label>
          <input
            className="input-login"
            value={Pays}
            placeholder="Pays"
            //onBlur={handleBlurPassword}
            onChange={(e) => setPays(e.target.value)}
          />
        </div>
        <div className="div-infos-perso">
          <label>Nom</label>
          <input
            className="input-login"
            placeholder="Nom"
            value={Nom}
            //onBlur={handleBlurNameLength}
            onChange={(e) => setNom(e.target.value)}
          ></input>
          <label>Prénom</label>
          <input
            className="input-login"
            placeholder="Prénom"
            value={Prenom}
            //onBlur={handleBlurFirstNameLength}
            onChange={(e) => setPrenom(e.target.value)}
          ></input>
          <label>Téléphone</label>
          <input
            className="input-login"
            placeholder="Téléphone"
            value={Telephone}
            //onBlur={handleBlurEmail}
            onChange={(e) => setTelephone(e.target.value)}
          ></input>
        </div>
        <button className="btn-login">
          Enregistrer Changement
          <FontAwesomeIcon className="icon-signIn" />
        </button>
      </div>
    </div>
  );
}

export default DetailsAdresses;

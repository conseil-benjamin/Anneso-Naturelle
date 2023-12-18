import "./AjoutAdresse.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";

function AjoutAdresse() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [societe, setSociete] = useState("");
  const [telephone, setTelephone] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  const [adresse, setAdresse] = useState("");
  const [complementAdresse, setComplementAdresse] = useState("");
  const [pays, setPays] = useState("");

  const [isBtnCliquer, setBtnCliquer] = useState(false);
  const navigate = useNavigate();

  const isLogged = localStorage.getItem("id");

  /*
  useEffect(() => {
    if (isBtnCliquer) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/v1/users");
          const users = await response.json();
          const clientFound = users.find(
            ({ adresseEmail, mdp }) =>
              emailValue === adresseEmail && passwordValue === mdp
          );
          if (clientFound) {
            navigate("/Profil", {
              state: {
                id: clientFound.id,
                nom: clientFound.nom,
                prenom: clientFound.prenom,
                adresses: clientFound.adresses,
                adresseEmail: clientFound.adresseEmail,
                mdp: clientFound.mdp,
                numeroTel: clientFound.numeroTel,
              },
            });
            localStorage.setItem("id", JSON.stringify(clientFound.id));
          } else {
            alert("Compte non trouvé");
            setBtnCliquer(false);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [isBtnCliquer]);
*/
  /*
  const handleBlur = () => {
    if (confPasswordValue !== passwordValue) {
      alert("Confirmation mot de passe non correcte");
    }
  };

  const handleBlurNameLength = () => {
    if (nomValue.length === 0) {
      alert("Renseignez un nom s'il vous plaît");
    }
  };

  const handleBlurFirstNameLength = () => {
    if (prenomValue.length === 0) {
      alert("Renseignez un prénom s'il vous plaît");
    }
  };

  const handleBlurEmail = () => {
    const isValidEmail = validator.isEmail(emailValue);
    if (!isValidEmail) {
      alert("Email non correcte");
    }
  };

  const handleBlurTel = () => {
    const isNumeroTel = validator.isMobilePhone(numeroTelValue);
    if (!isNumeroTel) {
      alert("Numéro de téléphone non correcte");
    }
  };

  const handleBlurPassword = () => {
    const isStrongPassword = validator.isStrongPassword(passwordValue);
    if (!isStrongPassword) {
      alert("Mot de passe ne respecte pas les contraintes");
    }
  };

  useEffect(() => {}, []);
*/
  return (
    <div className="body-page-addAdresse">
      <NavBarProfil></NavBarProfil>
      <div className="formulaire-ajout-adresse">
        <div className="formulaire-en-colonne" id="form1">
          <h1>Ajout d'une adresse</h1>
          <input
            className="input-login"
            value={adresse}
            placeholder="Adresse"
            //onBlur={handleBlurPassword}
            onChange={(e) => setAdresse(e.target.value)}
          />
          <input
            className="input-login"
            value={codePostal}
            placeholder="Code Postal"
            //onBlur={handleBlurPassword}
            onChange={(e) => setCodePostal(e.target.value)}
          />
          <input
            className="input-login"
            value={ville}
            placeholder="Ville"
            //onBlur={handleBlurPassword}
            onChange={(e) => setVille(e.target.value)}
          />
          <input
            className="input-login"
            value={complementAdresse}
            placeholder="Complément d'adresse"
            //onBlur={handleBlurPassword}
            onChange={(e) => setComplementAdresse(e.target.value)}
          />
          <input
            className="input-login"
            value={pays}
            placeholder="Pays"
            //onBlur={handleBlurPassword}
            onChange={(e) => setPays(e.target.value)}
          />
        </div>
        <div className="formulaire-en-colonne">
          <input
            className="input-login"
            placeholder="Nom"
            value={nom}
            //onBlur={handleBlurNameLength}
            onChange={(e) => setNom(e.target.value)}
          ></input>
          <input
            className="input-login"
            placeholder="Prénom"
            value={prenom}
            //onBlur={handleBlurFirstNameLength}
            onChange={(e) => setPrenom(e.target.value)}
          ></input>
          <input
            className="input-login"
            placeholder="Téléphone"
            value={telephone}
            //onBlur={handleBlurEmail}
            onChange={(e) => setTelephone(e.target.value)}
          ></input>
        </div>
        <button className="btn-login" onClick={() => setBtnCliquer(true)}>
          Ajouter l'adresse
          <FontAwesomeIcon className="icon-signIn" />
        </button>
      </div>
    </div>
  );
}

export default AjoutAdresse;

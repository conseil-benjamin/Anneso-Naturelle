import "./Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

function Register() {
  const [inputType, setInputType] = useState("password");
  const [passwordValue, setPasswordValue] = useState("");
  const [confPasswordValue, setConfPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [nomValue, setNomValue] = useState("");
  const [prenomValue, setPrenomValue] = useState("");
  const [numeroTelValue, setNumeroTelValue] = useState("");

  const [isBtnCliquer, setBtnCliquer] = useState(false);
  const navigate = useNavigate();

  const isLogged = localStorage.getItem("id");

  isLogged ? navigate("/Profil/infos-perso") : console.log("dzqdqz");

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

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

  return (
    <div className="body-element-register">
      <h1>Création de compte</h1>
      <input
        className="input-login"
        placeholder="Nom"
        value={nomValue}
        onBlur={handleBlurNameLength}
        onChange={(e) => setNomValue(e.target.value)}
      ></input>
      <input
        className="input-login"
        placeholder="Prénom"
        value={prenomValue}
        onBlur={handleBlurFirstNameLength}
        onChange={(e) => setPrenomValue(e.target.value)}
      ></input>
      <input
        className="input-login"
        placeholder="Numéro de téléphone"
        value={numeroTelValue}
        onBlur={handleBlurTel}
        onChange={(e) => setNumeroTelValue(e.target.value)}
      ></input>
      <input
        className="input-login"
        placeholder="Adresse Email"
        value={emailValue}
        onBlur={handleBlurEmail}
        onChange={(e) => setEmailValue(e.target.value)}
      ></input>
      <div className="div-password">
        <input
          className="input-login"
          type={inputType}
          value={passwordValue}
          placeholder="Mot de passe"
          onBlur={handleBlurPassword}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <button onClick={togglePasswordVisibility}>
          {inputType === "password" ? (
            <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
          )}
        </button>
      </div>
      <input
        className="input-login"
        type={inputType}
        value={confPasswordValue}
        placeholder="Confirmer mot de passe"
        onBlur={handleBlur}
        onChange={(e) => setConfPasswordValue(e.target.value)}
      />
      <p>
        Contrainte mot de passe : - 8 caractères - 1 Majuscules - 1 chiffre - 1
        caractère spéciale (,?;.:/! ...)
      </p>
      <button className="btn-login" onClick={() => setBtnCliquer(true)}>
        Créer un compte
        <FontAwesomeIcon icon={faSignInAlt} className="icon-signIn" />
      </button>
      <div className="div-text-bold">
        <p>Déjà un compte ?</p>
        <a href="Login" className="bold-text">
          Connectez-vous
        </a>
      </div>
    </div>
  );
}

export default Register;

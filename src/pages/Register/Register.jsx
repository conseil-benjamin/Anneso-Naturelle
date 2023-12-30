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
import Swal from "sweetalert2";

function Register() {
  const [inputType, setInputType] = useState("password");
  const [password, setpassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [email, setemail] = useState("");
  const [nomValue, setNomValue] = useState("");
  const [prenomValue, setPrenomValue] = useState("");
  const [numeroTelValue, setNumeroTelValue] = useState("");
  const [Civilite, setCivilite] = useState("Madame");

  const [isBtnCliquer, setBtnCliquer] = useState(false);
  const navigate = useNavigate();

  const isLogged = localStorage.getItem("id");

  isLogged && navigate("/Profil/infos-perso");

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleBlurConfirmPassword = () => {
    return confPassword === password;
  };

  const handleBlurNameLength = () => {
    return nomValue.length > 0;
  };

  const handleBlurFirstNameLength = () => {
    return prenomValue.length > 0;
  };

  const handleBlurEmail = () => {
    return validator.isEmail(email);
  };

  const handleBlurTel = () => {
    return validator.isMobilePhone(numeroTelValue);
  };

  const handleBlurPassword = () => {
    return validator.isStrongPassword(password);
  };

  const checkFormValidity = () => {
    return (
      handleBlurTel() &&
      handleBlurEmail() &&
      handleBlurFirstNameLength() &&
      handleBlurNameLength() &&
      handleBlurPassword() &&
      handleBlurConfirmPassword()
    );
  };

  const generateUniqueId = () => {
    const timestamp = new Date().getTime();
    const uniqueId = `${timestamp}`;
    return uniqueId;
  };

  const isClientWithThisEmail = async () => {
    try {
      const response = await fetch(
        "https://anneso-naturelle-api.onrender.com/api/v1/users/" + email
      );
      const user = await response.json();
      return !!user;
    } catch (error) {
      console.error(error);
    }
  };

  const getTokenAuthentification = async () => {
    try {
      const response = await fetch(
        `https://anneso-naturelle-api.onrender.com/api/v1/auth/${email}/${password}`
      );
      const user = await response.json();
      return !!user;
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickRegister = async () => {
    if (checkFormValidity()) {
      const newId = generateUniqueId();
      const user = {
        id: newId,
        nom: nomValue,
        prenom: prenomValue,
        adresseEmail: email,
        mdp: password,
        numeroTel: numeroTelValue,
        civilite: Civilite,
      };
      console.log(user);
      try {
        const response = await fetch(
          "https://anneso-naturelle-api.onrender.com/api/v1/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );

        if (response.ok) {
          console.log("Client créé avec succès !");
        } else {
          console.error("Erreur lors de la création du compte");
        }
      } catch (error) {
        console.error("Erreur de connexion au serveur:", error);
      }
    } else {
      Swal.fire({
        text: "Compte non trouvé avec cette combinaison email/mot de passe",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    //navigate("/profil/infos-persos");
  };

  return (
    <div className="body-element-register">
      <h1>Création de compte</h1>
      <label>Nom</label>
      <input
        className="input-login"
        placeholder="Nom"
        value={nomValue}
        onBlur={handleBlurNameLength}
        onChange={(e) => setNomValue(e.target.value)}
      ></input>
      <label>Prénom</label>
      <input
        className="input-login"
        placeholder="Prénom"
        value={prenomValue}
        onBlur={handleBlurFirstNameLength}
        onChange={(e) => setPrenomValue(e.target.value)}
      ></input>
      <label>Numéro de téléphone</label>
      <input
        className="input-login"
        placeholder="Numéro de téléphone"
        value={numeroTelValue}
        onBlur={handleBlurTel}
        onChange={(e) => setNumeroTelValue(e.target.value)}
      ></input>
      <label>Adresse email</label>
      <input
        className="input-login"
        placeholder="Adresse Email"
        value={email}
        onBlur={handleBlurEmail}
        onChange={(e) => setemail(e.target.value)}
      ></input>
      <label>Mot de passe</label>
      <div className="div-password">
        <input
          className="input-login"
          type={inputType}
          value={password}
          placeholder="Mot de passe"
          onBlur={handleBlurPassword}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button onClick={togglePasswordVisibility}>
          {inputType === "password" ? (
            <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
          ) : (
            <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
          )}
        </button>
      </div>
      <label>Confirmation mot de passe</label>
      <input
        className="input-login"
        type={inputType}
        value={confPassword}
        placeholder="Confirmer mot de passe"
        onBlur={handleBlurConfirmPassword}
        onChange={(e) => setconfPassword(e.target.value)}
      />
      <div className="radio-btn-genre-register">
        {Civilite === "Monsieur" ? (
          <>
            <button
              className="btn-genre"
              style={{ backgroundColor: "white", color: "black" }}
              onClick={() => setCivilite("Madame")}
            >
              Madame
            </button>
            <button className="btn-genre">Monsieur</button>
          </>
        ) : (
          <>
            <button className="btn-genre">Madame</button>
            <button
              className="btn-genre"
              style={{ backgroundColor: "white", color: "black" }}
              onClick={() => setCivilite("Monsieur")}
            >
              Monsieur
            </button>
          </>
        )}
      </div>
      <p>
        Contrainte mot de passe : - 8 caractères - 1 Majuscules - 1 chiffre - 1
        caractère spéciale (,?;.:/! ...)
      </p>
      <button className="btn-login" onClick={() => handleClickRegister()}>
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

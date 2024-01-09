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
import { Loader } from "../../utils/Loader";

function Register() {
  const [inputType, setInputType] = useState("password");
  const [password, setpassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [email, setemail] = useState("");
  const [nomValue, setNomValue] = useState("");
  const [prenomValue, setPrenomValue] = useState("");
  const [numeroTelValue, setNumeroTelValue] = useState("");
  const [Civilite, setCivilite] = useState("Madame");
  const [isDataLoading, setDataLoading] = useState(false);
  const [nomLenght, setNomLength] = useState("1");
  const [prenomLenght, setPrenomLenght] = useState("1");

  const [isBtnCliquer, setBtnCliquer] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const confirmPasswordVerif = () => {
    return confPassword === password;
  };

  const nameLengthVerif = () => {
      setNomLength(nomValue);
    return nomValue.length > 0;
  };

  const firstNameLengthVerif = () => {
    return prenomValue.length > 0;
  };

  const emailVerif = () => {
    return validator.isEmail(email);
  };

  const numeroTelVerif = () => {
    return validator.isMobilePhone(numeroTelValue);
  };

  const passwordVerif = () => {
    return validator.isStrongPassword(password);
  };

  const checkFormValidity = () => {
    return (
      numeroTelVerif() &&
      emailVerif() &&
      firstNameLengthVerif() &&
      nameLengthVerif() &&
      passwordVerif() &&
      confirmPasswordVerif()
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

  const handleClickRegister = async () => {
    if (checkFormValidity()) {
        if (!await isClientWithThisEmail()) {
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
                setDataLoading(true)
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
                    Swal.fire({
                        text: "Compte créé avec succès !",
                        icon: "success",
                        confirmButtonText: "Ok",
                    });
                } else {
                    console.error("Erreur lors de la création du compte");
                }
                setDataLoading(false);
                !isDataLoading && navigate("/profil/infos-persos");
            } catch (error) {
                console.error("Erreur de connexion au serveur:", error);
            }
        } else {
            Swal.fire({
                text: "Adresse email déjà associé à un compte. Connectez-vous, ou réinitialiser votre mot de passe.",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    } else{
        Swal.fire({
            text: "Erreur dans le formulaire",
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
        onBlur={nameLengthVerif}
        onChange={(e) => setNomValue(e.target.value)}
      ></input>
        {!nomLenght === 0 ? <p style={{color: "red"}}>Nom mal renseigné</p> : null}
        <label>Prénom</label>
      <input
        className="input-login"
        placeholder="Prénom"
        value={prenomValue}
        onBlur={firstNameLengthVerif}
        onChange={(e) => setPrenomValue(e.target.value)}
      ></input>
        {!firstNameLengthVerif() ? <p style={{color: "red"}}>Prénom non renseigné </p> : null}
      <label>Numéro de téléphone</label>
      <input
        className="input-login"
        placeholder="Numéro de téléphone"
        value={numeroTelValue}
        onBlur={numeroTelVerif}
        onChange={(e) => setNumeroTelValue(e.target.value)}
      ></input>
        {!numeroTelVerif() ? <p style={{color: "red"}}>Format numéro de téléphone incorrecte </p> : null}
        <label>Adresse email</label>
      <input
        className="input-login"
        placeholder="Adresse Email"
        value={email}
        onBlur={emailVerif}
        onChange={(e) => setemail(e.target.value)}
      ></input>
        {!emailVerif() ? <p style={{color: "red"}}>Format email invalide</p> : null}
        <label>Mot de passe</label>
      <div className="div-password">
        <input
          className="input-login"
          type={inputType}
          value={password}
          placeholder="Mot de passe"
          onBlur={passwordVerif}
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
        {!passwordVerif() ? <p style={{color: "red"}}>Mot de passe ne respecte pas les consignes   </p> : null}
        <div className={"div-label-register"}>
            <label>Confirmation mot de passe</label>
        </div>
        <input
            className="input-login"
            type={inputType}
        value={confPassword}
        placeholder="Confirmer mot de passe"
        onBlur={confirmPasswordVerif}
        onChange={(e) => setconfPassword(e.target.value)}
      />
        {!confirmPasswordVerif() ? <p style={{color: "red"}}>Confirmation mot de passe différent du mot de passe</p> : null}
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
      <span>
        Contrainte mot de passe : - 8 caractères - 1 Majuscules - 1 chiffre - 1
        caractère spéciale (,?;.:/! ...)
      </span>
        {isDataLoading ?
        <Loader></Loader> :
      <button className="btn-login" onClick={() => handleClickRegister()}>
        Créer un compte
        <FontAwesomeIcon icon={faSignInAlt} className="icon-signIn" />
      </button>
        }
      <div className="div-text-login">
        <span>Déjà un compte ?</span>
        <a href="Login" className="bold-text">
          Connectez-vous
        </a>
      </div>
    </div>
  );
}

export default Register;

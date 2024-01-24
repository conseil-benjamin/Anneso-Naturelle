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
import isStrongPassword from "validator/es/lib/isStrongPassword";
import Cookies from "js-cookie";

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
  const [erreurInputName, setErreurInputName] = useState(null);
  const [erreurInputFirstName, setErreurInputFirstName] = useState(null);
  const [erreurInputEmail, setErreurInputEmail] = useState(null);
  const [erreurInputTel, setErreurInputTel] = useState(null);
  const [erreurInputPassword, setErreurInputPassword] = useState(null);
  const [erreurInputPasswordConf, setErreurInputPasswordConf] = useState(null);

  const navigate = useNavigate();

    const setCookie = (token) => {
        Cookies.set("auth_token", token, { expires: 7 });
    };

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const confirmPasswordVerif = () => {
    return confPassword === password;
  };

  const handleOnblurName = () => {
        if (nomValue.length === 0) {
            setErreurInputName("Nom non renseigné");
        } else {
            setErreurInputName(null)
        }
  }

  const handleOnblurFirstName = () => {
        if (prenomValue.length === 0) {
            setErreurInputFirstName("Prénom non renseigné");
        } else {
            setErreurInputFirstName(null)
        }
  }

  const handleOnblurEmail = () => {
        if (!validator.isEmail(email)) {
            setErreurInputEmail("Format email invalide");
        } else {
            setErreurInputEmail(null)
        }
  }

    const handleOnblurTel = () => {
        if (!validator.isMobilePhone(numeroTelValue)) {
            setErreurInputTel("Format numéro de téléphone incorrecte");
        } else {
            setErreurInputTel(null)
        }
    }

    const handleOnblurPassword = () => {
        if (!validator.isStrongPassword(password)) {
            setErreurInputPassword("Mot de passe ne respecte pas les consignes");
        } else {
            setErreurInputPassword(null)
        }
    }

    const handleOnblurConfPassword = () => {
        if (confPassword !== password) {
            setErreurInputPasswordConf("Diffère du mot de passe");
        } else {
            setErreurInputPasswordConf(null)
        }
    }

  const nameLengthVerif = () => {
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
        "http://localhost:5000/api/v1/users/" + email
      );
      const user = await response.json();
      return user.length <= 0;
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
                    "http://localhost:5000/api/v1/auth/register",
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
                        timer: 2000,
                        showConfirmButton: false
                    });
                    const data = await response.json();
                    setCookie(data.token);
                    const userName = `${user.nom} ${user.prenom}`;
                    Cookies.set("name", userName, { expires: 7 })
                } else {
                    console.error("Erreur lors de la création du compte");
                }
                setDataLoading(false);
                !isDataLoading && navigate("/profil/infos-persos",
                    {
                        state: {
                            nom: user.nom,
                            prenom: user.prenom,
                            adresseEmail: user.adresseEmail,
                            numeroTel: user.numeroTel,
                            civilite: user.civilite,
                        }
                    } );
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
            text: "Erreur dans le formulaire de création de compte  ",
            icon: "error",
            confirmButtonText: "Ok",
        });
        !isStrongPassword(password) ? setErreurInputPassword("Mot de passe ne respecte pas les consignes") : setErreurInputPassword(null);
        !confirmPasswordVerif() ? setErreurInputPasswordConf("Diffère du mot de passe") : setErreurInputPasswordConf(null);
        !validator.isMobilePhone(numeroTelValue) ? setErreurInputTel("Format numéro de téléphone incorrecte") : setErreurInputTel(null);
        !validator.isEmail(email) ? setErreurInputEmail("Format email invalide") : setErreurInputEmail(null);
        !prenomValue.length > 0 ? setErreurInputFirstName("Prénom non renseigné") : setErreurInputFirstName(null);
        !nomValue.length > 0 ? setErreurInputName("Nom non renseigné") : setErreurInputName(null);
    }
    //navigate("/profil/infos-persos");
  };

  return (
    <div className="body-element-register">
      <h1>Création de compte</h1>
        <div className={"div-input-register"}>
        <label>Nom</label>
        <input
            className="input-login"
            value={nomValue}
            onBlur={handleOnblurName}
            onChange={(e) => setNomValue(e.target.value)}
        ></input>
            {erreurInputName && nomValue <= 0 && <p style={{color: "red"}}>{erreurInputName} </p>}
        </div>
        <div className={"div-input-register"}>

        <label>Prénom</label>
      <input
        className="input-login"
        value={prenomValue}
        onBlur={handleOnblurFirstName}
        onChange={(e) => setPrenomValue(e.target.value)}
      ></input>
        {erreurInputFirstName && prenomValue <= 0 && <p style={{color: "red"}}>{erreurInputFirstName} </p>}
        </div>
<div className={"div-input-register"}>

        <label>Numéro de téléphone</label>
      <input
        className="input-login"
        value={numeroTelValue}
        onBlur={handleOnblurTel}
        onChange={(e) => setNumeroTelValue(e.target.value)}
      ></input>
        {erreurInputTel && !numeroTelVerif(numeroTelValue) && <p style={{color: "red"}}>{erreurInputTel}</p>}
</div>
<div className={"div-input-register"}>

        <label>Adresse email</label>
      <input
        className="input-login"
        value={email}
        onBlur={handleOnblurEmail}
        onChange={(e) => setemail(e.target.value)}
      ></input>
        {erreurInputEmail && !emailVerif(email) && <p style={{color: "red"}}>{erreurInputEmail}</p>}
</div>
        <div className={"div-input-register"}>
            <label id={"label-mdp"}>Mot de passe</label>
            <div className="div-password">
                <input
                    className="input-login"
                    type={inputType}
                    value={password}
                    onBlur={handleOnblurPassword}
                    onChange={(e) => setpassword(e.target.value)}
                />
                {inputType === "password" ? (
                    <FontAwesomeIcon icon={faEye} id={"icon-eye-see-password"} onClick={togglePasswordVisibility}></FontAwesomeIcon>
                ) : (
                    <FontAwesomeIcon icon={faEyeSlash} id={"icon-eye-see-password"} onClick={togglePasswordVisibility}></FontAwesomeIcon>
                )}
            </div>
            {erreurInputPassword ? <p style={{color: "red"}}>{erreurInputPassword}</p> : null}
        </div>

        <div className={"div-input-register"}>
            <label>Confirmation mot de passe</label>
            <input
                className="input-login"
                type={inputType}
                value={confPassword}
                onBlur={handleOnblurConfPassword}
                onChange={(e) => setconfPassword(e.target.value)}
            />
            {erreurInputPasswordConf && !confirmPasswordVerif(confPassword) && <p style={{color: "red"}}>{erreurInputPasswordConf}</p>}
        </div>
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

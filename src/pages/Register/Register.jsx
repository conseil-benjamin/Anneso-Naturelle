import "./Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSignInAlt,
    faCircleInfo
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
        if (!validator.isMobilePhone(numeroTelValue) && numeroTelValue.length !== 10) {
            setErreurInputTel("Format numéro de téléphone incorrecte");
        } else {
            setErreurInputTel(null)
        }
    }

    const handleOnblurPassword = () => {
        if (!validator.isStrongPassword(password)) {
            setErreurInputPassword(
                <>
                    1 majuscules,minuscules,chiffre,<br/>
                    1 caractère spéciale, <br/>
                    8 caractères
                </>
            );        } else {
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
    return validator.isMobilePhone(numeroTelValue) && numeroTelValue.length === 10;
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


    /**
     * * Check if a client with this email already exists
     * @returns {Promise<boolean>} - True if a client with this email already exists, false otherwise
     */
  const isClientWithThisEmail = async () => {
    try {
      const response = await fetch(
          `${process.env.REACT_APP_API_URL}users/${email}`
      );
      const user = await response.json();
      return user.length > 0;
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickRegister = async () => {
    if (checkFormValidity()) {
        const emailNoneAlreadyUse = await isClientWithThisEmail();
        if (emailNoneAlreadyUse) {
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
                    `${process.env.REACT_APP_API_URL}auth/register`,
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
                    const userName = `${user.prenom}`;
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
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/auth/login");
                }
            });
        }
    } else{
        Swal.fire({
            text: "Erreur dans le formulaire de création de compte  ",
            icon: "error",
            confirmButtonText: "Ok",
        });
        !isStrongPassword(password) ? setErreurInputPassword( <>
            1 majuscules,minuscules,chiffre,<br/>
            1 caractère spéciale, <br/>
            8 caractères
        </>) : setErreurInputPassword(null);
        !confirmPasswordVerif() ? setErreurInputPasswordConf("Diffère du mot de passe") : setErreurInputPasswordConf(null);
        !validator.isMobilePhone(numeroTelValue) ? setErreurInputTel("Format numéro de téléphone incorrecte") : setErreurInputTel(null);
        !validator.isEmail(email) ? setErreurInputEmail("Format email invalide") : setErreurInputEmail(null);
        !prenomValue.length > 0 ? setErreurInputFirstName("Prénom non renseigné") : setErreurInputFirstName(null);
        !nomValue.length > 0 ? setErreurInputName("Nom non renseigné") : setErreurInputName(null);
    }
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
            style={erreurInputName ? {borderColor: "red"} : {borderColor: "#CFCFD0"}}
        ></input>
            {erreurInputName && nomValue <= 0 &&
                <div className={"div-error-message-register"}>
                    <FontAwesomeIcon id={"icon-infos-error"} icon={faCircleInfo}></FontAwesomeIcon>
                    <p style={{color: "red"}}>{erreurInputName} </p>
                </div>
            }
        </div>
        <div className={"div-input-register"}>

        <label>Prénom</label>
      <input
        className="input-login"
        value={prenomValue}
        onBlur={handleOnblurFirstName}
        onChange={(e) => setPrenomValue(e.target.value)}
        style={erreurInputFirstName ? {borderColor: "red"} : {borderColor: "#CFCFD0"}}
      ></input>
        {erreurInputFirstName && prenomValue <= 0 &&
            <div className={"div-error-message-register"}>
                <FontAwesomeIcon id={"icon-infos-error"} icon={faCircleInfo}></FontAwesomeIcon>
                <p style={{color: "red"}}>{erreurInputFirstName} </p>
            </div>
        }
        </div>
        <div className={"div-input-register"}>

        <label>Numéro de téléphone</label>
      <input
        className="input-login"
        value={numeroTelValue}
        onBlur={handleOnblurTel}
        onChange={(e) => setNumeroTelValue(e.target.value)}
        style={erreurInputTel ? {borderColor: "red"} : {borderColor: "#CFCFD0"}}
      ></input>
        {erreurInputTel && !numeroTelVerif(numeroTelValue) &&
            <div className={"div-error-message-register"}>
                <FontAwesomeIcon id={"icon-infos-error"} icon={faCircleInfo}></FontAwesomeIcon>
                <p style={{color: "red"}}>{erreurInputTel}</p>
            </div>
        }
</div>
        <div className={"div-input-register"}>

        <label>Adresse email</label>
      <input
        className="input-login"
        value={email}
        onBlur={handleOnblurEmail}
        onChange={(e) => setemail(e.target.value)}
        style={erreurInputEmail ? {borderColor: "red"} : {borderColor: "#CFCFD0"}}
      ></input>
        {erreurInputEmail && !emailVerif(email) &&
            <div className={"div-error-message-register"}>
                <FontAwesomeIcon id={"icon-infos-error"} icon={faCircleInfo}></FontAwesomeIcon>
                <p style={{color: "red"}}>{erreurInputEmail}</p>
            </div>}
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
                    style={erreurInputPassword ? {borderColor: "red"} : {borderColor: "#CFCFD0"}}
                />
                {inputType === "password" ? (
                    <FontAwesomeIcon icon={faEye} id={"icon-eye-see-password"} onClick={togglePasswordVisibility}></FontAwesomeIcon>
                ) : (
                    <FontAwesomeIcon icon={faEyeSlash} id={"icon-eye-see-password"} onClick={togglePasswordVisibility}></FontAwesomeIcon>
                )}
            </div>
            {erreurInputPassword ?
                <div className={"div-error-message-register"}>
                    <FontAwesomeIcon id={"icon-infos-error"} icon={faCircleInfo}></FontAwesomeIcon>
                    <p style={{color: "red"}}>{erreurInputPassword}</p>
                </div>
                : null}
        </div>

        <div className={"div-input-register"}>
            <label>Confirmation mot de passe</label>
            <input
                className="input-login"
                type={inputType}
                value={confPassword}
                onBlur={handleOnblurConfPassword}
                onChange={(e) => setconfPassword(e.target.value)}
                style={erreurInputPasswordConf ? {borderColor: "red"} : {borderColor: "#CFCFD0"}}
            />
            {erreurInputPasswordConf && !confirmPasswordVerif(confPassword) &&
                <div className={"div-error-message-register"}>
                    <FontAwesomeIcon id={"icon-infos-error"} icon={faCircleInfo}></FontAwesomeIcon>
                    <p style={{color: "red"}}>{erreurInputPasswordConf}</p>
                </div>
            }
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
        {isDataLoading ?
        <Loader></Loader> :
      <button className="btn-login" onClick={() => handleClickRegister()}>
        Créer mon compte
        <FontAwesomeIcon icon={faSignInAlt} className="icon-signIn" />
      </button>
        }
      <div className="div-text-login">
        <span>Déjà un compte ?</span>
        <span className="bold-text" onClick={() => navigate("/auth/login")} style={{cursor: "pointer"}}>
          Connectez-vous
        </span>
      </div>
    </div>
  );
}

export default Register;

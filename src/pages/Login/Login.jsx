import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Loader } from "../../utils/Loader";

function Login() {
  const [inputType, setInputType] = useState("password");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [isBtnCliquer, setBtnCliquer] = useState(false);
  const [isDataLoading, setDataLoading] = useState(false);
  const navigate = useNavigate();
  const Swal = require("sweetalert2");

  const isLogged = localStorage.getItem("id");
  const [clientId, setClientId] = useState(
    isLogged ? JSON.parse(isLogged) : null
  );

  isLogged && navigate("/Profil/infos-persos");

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleKeyPress = (e) => {
    if (e.key === "enter") {
      console.log(e.key);
      setBtnCliquer(true);
    }
  };

  useEffect(() => {
    if (isBtnCliquer) {
      const fetchData = async () => {
        setDataLoading(true);
        try {
          const response = await fetch("http://localhost:5000/api/v1/users");
          const users = await response.json();
          console.log(users);
          const clientFound = users.find(
            ({ adresseEmail, mdp }) =>
              emailValue === adresseEmail && passwordValue === mdp
          );
          if (clientFound) {
            navigate("/Profil/infos-persos", {
              state: {
                id: clientFound.id,
                nom: clientFound.nom,
                prenom: clientFound.prenom,
                adresses: clientFound.adresses,
                adresseEmail: clientFound.adresseEmail,
                mdp: clientFound.mdp,
                numeroTel: clientFound.numeroTel,
                iconProfil: clientFound.iconProfil,
              },
            });
            localStorage.setItem("id", JSON.stringify(clientFound.id));
          } else {
            // loader pendant la recherce d'un compte
            Swal.fire({
              text: "Compte non trouvé avec cette combinaison email/mot de passe",
              icon: "error",
              confirmButtonText: "Ok",
            });
            setBtnCliquer(false);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setDataLoading(false);
        }
      };
      fetchData();
    }
  }, [isBtnCliquer]);

  return (
    <div className="body-element">
      {isDataLoading ? (
        <div className="loader-div">
          <Loader />
        </div>
      ) : (
        <>
          <h1>Connexion</h1>
          <input
            className="input-login"
            placeholder="Adresse Email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
          ></input>
          <div className="div-password">
            <input
              className="input-login"
              type={inputType}
              value={passwordValue}
              placeholder="Mot de passe"
              onChange={(e) => setPasswordValue(e.target.value)}
              onKeyUp={(e) => handleKeyPress(e)}
            />
            <button onClick={togglePasswordVisibility} onke>
              {inputType === "password" ? (
                <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
              )}
            </button>
          </div>
          <button className="btn-login" onClick={() => setBtnCliquer(true)}>
            Se connecter
            <FontAwesomeIcon icon={faSignInAlt} className="icon-signIn" />
          </button>
          <div className="div-text-bold">
            <p>Première visite ?</p>
            <a href="Register" className="bold-text">
              Inscrivez-vous
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;

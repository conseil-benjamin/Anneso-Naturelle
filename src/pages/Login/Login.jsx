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
import Cookies from "js-cookie";

function Login() {
  const [inputType, setInputType] = useState("password");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [isBtnCliquer, setBtnCliquer] = useState(false);
  const [isDataLoading, setDataLoading] = useState(false);
  const navigate = useNavigate();
  const Swal = require("sweetalert2");

  const setCookie = (token) => {
    Cookies.set("auth_token", token, { expires: 7 });
  };

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleKeyPress = (e) => {
    if (e.key === "enter") {
      console.log(e.key);
      setBtnCliquer(true);
    }
  };

  const getTokenAuthentification = async () => {
    const user = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        setCookie(data.token);
      } else {
        console.error("Client non trouvé");
      }
    } catch (error) {
      console.error("Erreur de connexion au serveur:", error);
    }
  };

  useEffect(() => {
    if (isBtnCliquer) {
      try {
        setDataLoading(true);
        const token = getTokenAuthentification();
        if (token) {
          navigate("/Profil/infos-persos");
        } else {
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
            value={email}
            onChange={(e) => setemail(e.target.value)}
          ></input>
          <div className="div-password">
            <input
              className="input-login"
              type={inputType}
              value={password}
              placeholder="Mot de passe"
              onChange={(e) => setpassword(e.target.value)}
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

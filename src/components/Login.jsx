import "../styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { clients } from "../datas/clients";
import { useNavigate } from "react-router-dom"; // Utilisation de useNavigate pour la redirection

function Login() {
  const [inputType, setInputType] = useState("password");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [isBtnCliqer, setBtnCliquer] = useState(false);

  const isLogged = localStorage.getItem("id");

  const navigate = useNavigate();

  if (isLogged) {
    navigate("/Profil");
  }

  const togglePasswordVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const checkLogin = () => {
    const users = getUsers();
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
          age: clientFound.age,
          adresses: clientFound.adresses,
          adresseEmail: clientFound.adresseEmail,
          mdp: clientFound.mdp,
          numeroTel: clientFound.numeroTel,
          statusClient: clientFound.statutClient,
          historiqueCommandes: clientFound.historiqueCommandes,
        },
      });
      localStorage.setItem("id", JSON.stringify(clientFound.id));
    } else {
      alert("Compte non trouvé");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/users");
        const users = await response.json();
        setData(response.data);
      } catch (error) {
        // Gérer les erreurs ici
        console.error(error);
      }
    };
    fetchData();
  }, [isBtnCliqer]);

  async function getUsers() {
    const users = await fetch("http://localhost:5000/api/v1/users")
      .then((res) => res.json())
      .catch((error) => console.error("ERROR"));

    console.log(users);
    return users;
  }

  return (
    <div className="body-element">
      <h1>Connexion</h1>
      <input
        placeholder="Adresse Email"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
      ></input>
      <input
        type={inputType}
        value={passwordValue}
        placeholder="Mot de passe"
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      <button onClick={togglePasswordVisibility}>
        {inputType === "password" ? (
          <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
        )}
      </button>
      <button onClick={setBtnCliquer(true)}>Se connecter</button>
    </div>
  );
}

export default Login;

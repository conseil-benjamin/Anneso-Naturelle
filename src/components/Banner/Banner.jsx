import "./Banner.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

function Banner({
  logo,
  collection,
  aPropos,
  contact,
  panier,
  creationPersonalise,
}) {
  const isLoggedOrNot = localStorage.getItem("id");
  const [profilClique, setProfilClique] = useState(false);
  const navigate = useNavigate();

  const [clientId, setClientId] = useState(
    isLoggedOrNot ? JSON.parse(isLoggedOrNot) : null
  );

  useEffect(() => {
    if (clientId && profilClique) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/v1/users");
          const users = await response.json();
          console.log(users);
          console.log(isLoggedOrNot);
          const clientFound = users.find(({ id }) => id === clientId);
          if (clientFound) {
            setProfilClique(false);
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
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    } else if (profilClique) {
      navigate("Login");
    }
  }, [profilClique]);

  return (
    <>
      <div className="lmj-banner">
        <div>
          <h2>Anne'so Naturelle</h2>
        </div>
        <div className="second-barre-banner">
        <div>
          <h2>Test</h2>
        </div>
          {/**
             <Link to="/collections">{logo}</Link>
           */}
          <a href="/">Accueil</a>
          <Link to="/collections">{collection}</Link>
          {creationPersonalise}
          {aPropos}
          {contact}
          <div className="icon-header">
            <a href="login">
              <FontAwesomeIcon
                icon={faUserAlt}
                onClick={() => setProfilClique(true)}
              />
            </a>
            {panier}
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;

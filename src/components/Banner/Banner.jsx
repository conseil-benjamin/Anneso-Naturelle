import "./Banner.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
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

  const handleClickSocials = (redirection) => {
    redirection === "facebook"
      ? window.open(
          "https://www.facebook.com/profile.php?id=100075994402255",
          "_blank"
        )
      : redirection === "instagram"
      ? window.open(
          "https://www.instagram.com/anneso2273/?igshid=OGQ5ZDc2ODk2ZA%3D%3D",
          "_blank"
        )
      : window.open("https://www.tiktok.com/@anneso2273", "_blank");
  };

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
            navigate("/profil/infos-persos", {
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
          <div className="icon-socials-banner">
            {" "}
            <span>
              <FontAwesomeIcon
                className="iconSocial"
                icon={faFacebook}
                onClick={() => handleClickSocials("facebook")}
              />
            </span>
            <span>
              <FontAwesomeIcon
                className="iconSocial"
                icon={faInstagram}
                onClick={() => handleClickSocials("instagram")}
              />
            </span>
            <span>
              <FontAwesomeIcon
                className="iconSocial"
                icon={faTiktok}
                onClick={() => handleClickSocials("tiktok")}
              />
            </span>
          </div>
          {/**
             <Link to="/collections">{logo}</Link>
           */}
          <a href="/" className="lmj-title">
            Accueil
          </a>
          <Link to="/collections">{collection}</Link>
          {creationPersonalise}
          {aPropos}
          {contact}
          <div className="icon-header">
            <a id="icon-user-a">
              <FontAwesomeIcon
                icon={faUserAlt}
                onClick={() => setProfilClique(true)}
                size="2x"
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

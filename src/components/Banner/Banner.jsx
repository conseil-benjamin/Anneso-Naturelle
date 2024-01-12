import "./Banner.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import {faBars, faXmark} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import Cookies from "js-cookie";

function Banner({ collection, aPropos, contact, panier, creationPersonalise }) {
  const [profilClique, setProfilClique] = useState(false);
  const navigate = useNavigate();
  const nbArticles = JSON.parse(localStorage.getItem("nbArticles"));
  const [mobileMenuClique, setMobileMenuClique] = useState(false);

  const jwtToken = Cookies.get("auth_token");

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
    if (jwtToken && profilClique) {
      const fetchData = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/v1/users/", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          });
          const user = await response.json();
          if (user) {
            setProfilClique(false);
            navigate("/profil/infos-persos", {
              state: {
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                adresseEmail: user.adresseEmail,
                numeroTel: user.numeroTel,
              },
            });
          }
        } catch (error) {
          console.error("Erreur de connexion au serveur:", error);
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
          <div className="banner-mobile">
            <h2 className="banner-title">Anne'so Naturelle</h2>
            <div id={"icon-menu-mobile"}>
              {mobileMenuClique ?
                  <FontAwesomeIcon icon={faXmark} size="2x" onClick={() => setMobileMenuClique(false)}/>:
              <FontAwesomeIcon icon={faBars} size="2x" onClick={() => setMobileMenuClique(true)}/>}
              </div>
          </div>
          <div className="second-barre-banner">
            <div className="icon-socials-banner">
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
              {nbArticles > 0 ? (
                  <a href="/panier">
                    <span className="span-nb-articles">{nbArticles}</span>
                  </a>
              ) : null}
            </div>
          </div>
        </div>
        <div className="mobile-banner" style={mobileMenuClique ? { transform: 'translateX(0%)'} : {}}>
          {mobileMenuClique && (
              <div id={"menu-mobile"}>
                <div className="icon-socials-banner-mobile">
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
                <div className={"div-mobile-liens-page-banner"}>
                  <a href="/" className="lmj-title" onClick={() => setMobileMenuClique(false
                  )}>
                    Accueil
                  </a>
                  <Link to="/collections" onClick={() => setMobileMenuClique(false)}>{collection}</Link>
                  {creationPersonalise}
                  {aPropos}
                  {contact}
                </div>

                <div className="icon-header-mobile">
                  <a id="icon-user-a">
                    <FontAwesomeIcon
                        icon={faUserAlt}
                        onClick={() => setProfilClique(true)}
                        size="2x"
                    />
                  </a>
                  {panier}
                  {nbArticles > 0 ? (
                      <a href="/panier">
                        <span className="span-nb-articles">{nbArticles}</span>
                      </a>
                  ) : null}
                </div>
              </div>
          )}
        </div>
      </>
  );
}

export default Banner;

import "./Banner.scss";
import {Link, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {faBars, faXmark, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faInstagram,
    faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import Cookies from "js-cookie";
import ButtonDeconnect from "../Button Deconnect/ButtonDeconnect";

function Banner({collection, aPropos, contact, panier, creationPersonalise}) {
    const [profilClique, setProfilClique] = useState(false);
    const nbArticles = JSON.parse(localStorage.getItem("nbArticles"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    const [mobileMenuClique, setMobileMenuClique] = useState(false);
    const jwtToken = Cookies.get("auth_token");
    const name = Cookies.get("name");
    const navigate = useNavigate();

    useEffect(() => {
        if (cart && !jwtToken) {
            localStorage.setItem("nbArticles", JSON.stringify(cart.length));
        }
    }, [cart]);

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
                    const response = await fetch(`${process.env.REACT_APP_API_URL}users`, {
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
            navigate("/auth/login");
        }
    }, [profilClique]);

    return (
        <>
            <div className="lmj-banner">
                <div className="banner-mobile">
                    <h2 id="banner-title">Anne'so Naturelle</h2>
                    {mobileMenuClique ?
                        <FontAwesomeIcon id={"icon-menu-mobile"} icon={faXmark} size="2x"
                                         onClick={() => setMobileMenuClique(false)}
                                         style={{cursor: "pointer"}}/> :
                        <FontAwesomeIcon id={"icon-menu-mobile"} icon={faBars} size="2x"
                                         onClick={() => setMobileMenuClique(true)}
                                         style={{cursor: "pointer"}}/>}
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
                    {/* TODO : Remettre tous les styles en scss */}
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", margin: "0 0 0 5em"}} onClick={() => setProfilClique(true)}>
                        <a id="icon-user-a">
                            <FontAwesomeIcon
                                icon={faUserAlt}
                                size="2x"
                            />
                        </a>
                        {name ? <p style={{fontSize: "0.8em", padding: "0em", margin: "0.2em 0 0 0", textAlign: "center"}}>{name}</p> : <p style={{fontSize: "0.8em", padding: "0em", margin: "0.2em 0 0 0", alignItems: "center"}}>Me connecter</p>}
                    </div>

                    <div style={{display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", cursor: "pointer"}} onClick={() => navigate('/panier')}>
                        <div className="icon-header">
                            <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                                {panier}
                                {nbArticles > 0 ? (
                                    <a href="/panier">
                                        <span className="span-nb-articles">{nbArticles}</span>
                                    </a>
                                ) : null}
                            </div>
                        </div>
                        <p style={{fontSize: "0.8em", padding: "0em", margin: "0.2em 0 0 3em", alignItems: "center"}}>Panier</p>
                    </div>
                </div>
            </div>
            <div className="mobile-banner" style={mobileMenuClique ? {transform: 'translateX(0%)'} : {}}>
                {mobileMenuClique && (
                    <div id="menu-mobile">
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
                            {collection}
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
                        {jwtToken &&
                            <ButtonDeconnect></ButtonDeconnect>
                        }
                    </div>
                )}
            </div>
        </>
    );
}

export default Banner;

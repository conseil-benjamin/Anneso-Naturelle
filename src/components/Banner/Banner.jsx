import "./Banner.scss";
import {Link, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faUserAlt} from "@fortawesome/free-solid-svg-icons";
import {faBars, faXmark, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faInstagram,
    faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import Cookies from "js-cookie";
import ButtonDeconnect from "../Button Deconnect/ButtonDeconnect";

function Banner() {
    const [profilClique, setProfilClique] = useState(false);
    const nbArticles = JSON.parse(localStorage.getItem("nbArticles"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    const [mobileMenuClique, setMobileMenuClique] = useState(false);
    const jwtToken = Cookies.get("auth_token");
    const name = Cookies.get("name");
    const navigate = useNavigate();
    const isAdmin = Cookies.get("role");

    useEffect(() => {
        if (cart && !jwtToken) {
            localStorage.setItem("nbArticles", JSON.stringify(cart.length));
        }
    }, [cart]);

    const clickNavBarItem = (direction) => {
        navigate("/" + direction);
    }

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
                } finally {
                    setProfilClique(false);
                }
            };
            fetchData();
        } else if (profilClique) {
            navigate("/auth/login");
            setProfilClique(false);
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
                    <div className={"div-liens-pc"}>
                        <p className={"lmj-title"} onClick={() => clickNavBarItem("")}>Accueil</p>
                        <p className={"lmj-title"} onClick={() => clickNavBarItem("collections")}>
                            Collections
                        </p>
                        <p className={"lmj-title"} onClick={() => clickNavBarItem("creations-personalisees")}>
                            Créations Personnalisées
                        </p>
                        <p className={"lmj-title"} onClick={() => clickNavBarItem("apropos")}>
                            A propos
                        </p>
                        <p className={"lmj-title"} onClick={() => clickNavBarItem("contact")}>
                            Contact
                        </p>
                    </div>
                    <div className={"div-icon-login-navbar"} onClick={() => {isAdmin ? navigate("/admin") : setProfilClique(true)}}>
                        <a id="icon-user-a">
                            <FontAwesomeIcon
                                icon={faUserAlt}
                                size="2x"
                            />
                        </a>
                        {name ? <p className={"name-under-login-icon-navbar"}>{name}</p> :
                            <p className={"name-under-login-icon-navbar"}>Me connecter</p>}
                    </div>

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        justifyContent: "center",
                        cursor: "pointer"
                    }} onClick={() => navigate('/panier')}>
                        <div className="icon-header">
                            <div className={"div-icon-basket-navbar"}>
                                <FontAwesomeIcon
                                    icon={faShoppingCart}
                                    alt="Panier"
                                    id="icone_panier"
                                    size="2x"
                                />
                                {nbArticles > 0 ? (
                                    <a>
                                        <span className="span-nb-articles">{nbArticles}</span>
                                    </a>
                                ) : null}
                            </div>
                        </div>
                        <p className={"name-under-basket-icon-navbar"}>Panier</p>
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
                            <p className={"lmj-title"} onClick={() => {clickNavBarItem(""); setMobileMenuClique(false)}}>Accueil</p>
                            <p className={"lmj-title"} onClick={() => clickNavBarItem("collections")}>
                                Collections
                            </p>
                            <p className={"lmj-title"} onClick={() => clickNavBarItem("creations-personalisees")}>
                                Créations Personnalisées
                            </p>
                            <p className={"lmj-title"} onClick={() => clickNavBarItem("apropos")}>
                                A propos
                            </p>
                            <p className={"lmj-title"} onClick={() => clickNavBarItem("contact")}>
                                Contact
                            </p>
                        </div>
                        <div style={{display: "flex", flexDirection: "row"}}>
                            <div className={"div-icon-login-navbar"} style={{margin: "0"}} onClick={() => {isAdmin ? navigate("/admin") : setProfilClique(true)}}>
                                <a id="icon-user-a">
                                    <FontAwesomeIcon
                                        icon={faUserAlt}
                                        size="2x"
                                    />
                                </a>
                                {name ? <p className={"name-under-login-icon-navbar"}>{name}</p> : <p className={"name-under-login-icon-navbar"}>Me connecter</p>}
                            </div>

                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                justifyContent: "center",
                                cursor: "pointer"
                            }} onClick={() => navigate('/panier')}>
                                <div className="icon-header">
                                    <div className={"div-icon-basket-navbar"}>
                                        <FontAwesomeIcon
                                            icon={faShoppingCart}
                                            alt="Panier"
                                            id="icone_panier"
                                            size="2x"
                                        />
                                        {nbArticles > 0 ? (
                                            <a>
                                            </a>
                                        ) : null}
                                    </div>
                                </div>
                                <p className={"name-under-basket-icon-navbar"}>Panier</p>
                            </div>
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

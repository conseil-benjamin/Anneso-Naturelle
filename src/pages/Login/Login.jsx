import "./Login.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {Loader} from "../../utils/Loader";
import Cookies from "js-cookie";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";

function Login() {
    const [inputType, setInputType] = useState("password");
    const [password, setPassword] = useState("");
    const [email, setemail] = useState("");
    const [isBtnCliquer, setBtnCliquer] = useState(false);
    const [isDataLoading, setDataLoading] = useState(false);
    const [userData, setUser] = useState({});
    const [mdpOublie, setMdpOublie] = useState(false);
    const navigate = useNavigate();

    const setCookie = (token) => {
        Cookies.set("auth_token", token, {expires: 7});
    };

    const togglePasswordVisibility = () => {
        setInputType(inputType === "password" ? "text" : "password");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            setBtnCliquer(true);
        }
    };

    const getTokenAuthentification = async () => {
        const user = {
            email: email,
            password: password,
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const data = await response.json();
                setCookie(data.token);
                return data;
            } else {
                console.error("Client non trouvé");
            }
        } catch (error) {
            console.error("Erreur de connexion au serveur:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (isBtnCliquer) {
                try {
                    setDataLoading(true);
                    const data = await getTokenAuthentification();
                    if (data) {
                        const userData = data.user;
                        const userName = `${userData.prenom}`;
                        Cookies.set("name", userName, {expires: 7});
                        if (userData.id === "1707863408369") {
                            Cookies.set("role", "admin", {expires: 7});
                            navigate("/admin")
                        } else {
                            navigate("/profil/infos-persos", {
                                state: {
                                    nom: userData.nom,
                                    prenom: userData.prenom,
                                    adresseEmail: userData.adresseEmail,
                                    numeroTel: userData.numeroTel,
                                    civilite: userData.civilite
                                },
                            });
                        }
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
        };
        fetchData();
    }, [isBtnCliquer]);

    useEffect(() => {
        if (mdpOublie) {
            handleForgotPassword();
        }
        setMdpOublie(false);
    }, [mdpOublie]);

    const handleForgotPassword = async () => {
        const {value: email} = await Swal.fire({
            text: "Récupération du mot de passe de votre compte",
            input: "email",
            inputPlaceholder: "Entrer l'adresse email associé à votre compte",
            showCancelButton: true,
            confirmButtonText: "Envoyer",
            cancelButtonText: "Annuler",
        });

        if (email) {
            try {
                setDataLoading(true);
                const response = await fetch(`${process.env.REACT_APP_API_URL}auth/forgot-password`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email: email}),
                });

                if (response.ok) {
                    Swal.fire({
                        title: "Email envoyé",
                        text: "Un email de réinitialisation de mot de passe a été envoyé à l'adresse email indiquée",
                        icon: "success",
                        confirmButtonText: "Ok",
                    });
                } else {
                    Swal.fire({
                        title: "Erreur",
                        text: "Une erreur s'est produite lors de l'envoi de l'email",
                        icon: "error",
                        confirmButtonText: "Ok",
                    });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setDataLoading(false);
            }
        }
    };

    return (
        <div className="body-element">
            {isDataLoading ? (
                <div className="loader-div">
                    <Loader/>
                </div>
            ) : (
                <>
                    <div className={"div-login-left"}>
                        <div className={"div-connexion"}>
                            <h2 style={{textAlign: "center"}}>Content de vous revoir</h2>
                            <label style={{margin: "1em 0 0 0"}}>Email</label>
                            <input
                                className="input-login"
                                placeholder="Adresse Email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            ></input>
                            <label>Mot de passe</label>
                            <div className="div-password">
                                <input
                                    className="input-login"
                                    type={inputType}
                                    value={password}
                                    placeholder="Mot de passe"
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyUp={(e) => handleKeyPress(e)}
                                />
                                {inputType === "password" ? (
                                    <FontAwesomeIcon icon={faEye} id={"icon-eye-see-password"}
                                                     onClick={togglePasswordVisibility}></FontAwesomeIcon>
                                ) : (
                                    <FontAwesomeIcon icon={faEyeSlash} id={"icon-eye-see-password"}
                                                     onClick={togglePasswordVisibility}></FontAwesomeIcon>
                                )}
                            </div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
                                {isDataLoading ? <Loader/> :
                                    <p onClick={() => setMdpOublie(true)} style={{fontSize: "0.89em"}}>Mot de passe
                                        oublié ?</p>}
                            </div>
                            <button
                                className="btn-login"
                                onClick={() => setBtnCliquer(true)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        setBtnCliquer(true);
                                    }
                                }}
                            >
                                Se connecter
                                <FontAwesomeIcon icon={faSignInAlt} className="icon-signIn"/>
                            </button>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            margin: "0.5em 0 0 0"
                        }}>
                            <hr style={{flexGrow: 1, width: '8.5em', height: "1px"}}/>
                            <span style={{margin: '0 10px'}}>Ou</span>
                            <hr style={{flexGrow: 1, width: '8.5em', height: "1px"}}/>
                        </div>
                        <button className={"btn-google-login"}>
                            <img
                                src={"https://res.cloudinary.com/dc1p20eb2/image/upload/v1709155978/Page%20Login/google.jpg"}
                                alt={"icone google"}/>
                            Connexion avec Google
                        </button>
                        <div className="div-text-bold">
                            <p>Première visite ?</p>
                            <p className="bold-text" onClick={() => navigate("/auth/register")}
                               style={{cursor: "pointer"}}>
                                Inscrivez-vous
                            </p>
                        </div>
                    </div>
                    <div className={"div-login-right"}>
                        <img
                            src={"https://res.cloudinary.com/dc1p20eb2/image/upload/v1709209172/Page%20Login/sebastien.png"}>
                        </img>
                    </div>
                </>
            )}
        </div>
    );
}

export default Login;

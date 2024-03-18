import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import "./DetailsAdresses.css";
import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Toast from "../../components/Toast/toast";
import validator from "validator";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import GoingBack from "../../components/GoingBack/GoingBack";

function DetailsAdresses() {
    const location = useLocation();
    const {
        adresse,
        ville,
        codePostal,
        pays,
        complementAdresse,
        nomPersonne,
        prenomPersonne,
        numTel,
        adresseId
    } = location.state || {};
    const {numAdresse} = useParams();

    const [Nom, setNom] = useState("");
    const [Prenom, setPrenom] = useState("");
    const [Telephone, setTelephone] = useState("");
    const [CodePostal, setCodePostal] = useState("");
    const [Ville, setVille] = useState("");
    const [Adresse, setAdresse] = useState("");
    const [ComplementAdresse, setComplementAdresse] = useState("");
    const [Pays, setPays] = useState("");
    const [hasChanged, setHasChanged] = useState(false);
    const [btnUpdateAdresseClique, setBtnUpdateAdresseClique] = useState(false);
    const [erreurInputAdresse, setErreurInputAdresse] = useState(null);
    const [erreurInputCodePostal, setErreurInputCodePostal] = useState(null);
    const [erreurInputVille, setErreurInputVille] = useState(null);
    const [erreurInputPays, setErreurInputPays] = useState(null);
    const [erreurInputNom, setErreurInputNom] = useState(null);
    const [erreurInputPrenom, setErreurInputPrenom] = useState(null);
    const [erreurInputTelephone, setErreurInputTelephone] = useState(null);
    const navigate = useNavigate();

    // TODO : enlever ca et faire une requete pour récupérer les infos de l'adresse à la place
    const setValueInput = () => {
        setNom(nomPersonne);
        setPrenom(prenomPersonne);
        setTelephone(numTel);
        setCodePostal(codePostal);
        setVille(ville);
        setAdresse(adresse);
        setComplementAdresse(complementAdresse);
        setPays(pays);
    }

    const handleGoBack = () => {
        navigate(-1); // revenir une page en arrière
    };

    const isFormValid = () => {
        if (Nom.length < 2) {
            return false;
        }
        if (Prenom.length < 2) {
            return false;
        }
        if (!validator.isMobilePhone(Telephone) && Telephone.length !== 10) {
            return false;
        }
        if (CodePostal.length !== 5) {
            return false;
        }
        if (Ville.length < 2) {
            return false;
        }
        if (Adresse.length < 5) {
            return false;
        }
        if (Pays.length < 2) {
            return false;
        }
        return true;
    };

    const handleBlurAdresse = () => {
        if (Adresse.length < 5) {
            setErreurInputAdresse("L'adresse doit contenir au moins 5 caractères.");
        } else {
            setErreurInputAdresse(null);
        }
    };

    const handleBlurCodePostal = () => {
        if (CodePostal.length !== 5) {
            setErreurInputCodePostal("Le code postal doit contenir 5 chiffres.");
        } else {
            setErreurInputCodePostal(null);
        }
    };

    const handleBlurVille = () => {
        if (Ville.length < 2) {
            setErreurInputVille("La ville doit contenir au moins 2 caractères.");
        } else {
            setErreurInputVille(null);
        }
    };

    const handleBlurPays = () => {
        if (Pays.length < 2) {
            setErreurInputPays("Le pays doit contenir au moins 2 caractères.");
        } else {
            setErreurInputPays(null);
        }
    };

    const handleBlurNom = () => {
        if (Nom.length < 2) {
            setErreurInputNom("Le nom doit contenir au moins 2 caractères.");
        } else {
            setErreurInputNom(null);
        }
    };

    const handleBlurPrenom = () => {
        if (Prenom.length < 2) {
            setErreurInputPrenom("Le prénom doit contenir au moins 2 caractères.");
        } else {
            setErreurInputPrenom(null);
        }
    };

    const handleBlurTelephone = () => {
        if (!validator.isMobilePhone(Telephone) && Telephone.length !== 10) {
            setErreurInputTelephone("Le numéro de téléphone doit contenir 10 chiffres.");
        } else {
            setErreurInputTelephone(null);
        }
    };

    useEffect(() => {
        setValueInput();
    }, []);

    useEffect(() => {
        if (!btnUpdateAdresseClique) {
            return;
        }
        if (!isFormValid()) {
            Swal.fire({
                text: "Veuillez remplir correctement tous les champs.",
                icon: "warning"
            })
            setBtnUpdateAdresseClique(false);
            return;
        }
        if (!hasChanged) {
            Swal.fire({
                text: "Aucun changement n'a été effectué.",
                icon: "warning"
            })
            setBtnUpdateAdresseClique(false);
            return;
        }
        try {
            const adresse = {
                _id: adresseId,
                adresse: Adresse,
                codePostal: CodePostal,
                ville: Ville,
                complementAdresse: ComplementAdresse,
                pays: Pays,
                nomPersonne: Nom,
                prenomPersonne: Prenom,
                numTel: Telephone,
            };
            const handleClickUpdateAdress = async () => {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}adresses/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${Cookies.get("auth_token")}`,
                        },
                        body: JSON.stringify(adresse)
                    }
                );
                if (response.ok) {
                    Swal.fire({
                        text: "Adresse mise à jour avec succès.",
                        icon: "success",
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        padding: "0.5em",
                        color: "#000",
                        background: "#fff",
                        didOpen: (toast) => {
                            toast.onmouseover = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        },
                        customClass: {
                            timerProgressBar: "background-color: #ffffff !important",
                        }
                    })
                    setBtnUpdateAdresseClique(false);
                    setHasChanged(false);
                } else {
                    Swal.fire({
                        toast: true,
                        text: "Erreur lors de la mise à jour de l'adresse.",
                        icon: "error"
                    })
                }
            }
            handleClickUpdateAdress();
        } catch (error) {
            console.log(error);
        }
    }, [btnUpdateAdresseClique]);

    // TODO : Faire le responsive de la page
    return (
        <>
            <div className="div-main-details-adresse">
                <NavBarProfil></NavBarProfil>
                <GoingBack/>
                <div className="div-infos-adresse">
                    <h1 style={{textAlign: "center"}}>Modifier votre adresse</h1>
                    <div className="infos-details-adresse">
                        <div className="container-adresse-left">
                            <div className={"div-input-register"}>
                                <label>Adresse</label>
                                <input
                                    className="input-login"
                                    style={{margin: "0 0 0.5em 0"}}
                                    value={Adresse}
                                    placeholder="Adresse"
                                    onBlur={handleBlurAdresse}
                                    onChange={(e) => {
                                        setAdresse(e.target.value);
                                        setHasChanged(true)
                                    }}
                                />
                                {erreurInputAdresse && Adresse <= 5 &&
                                    <div className={"div-error-message-register"} style={{margin: "0 0 0.5em 0"}}
                                    >
                                        <FontAwesomeIcon id={"icon-infos-error"} icon={faCircleInfo}></FontAwesomeIcon>
                                        <p style={{color: "red", margin: "0"}}>{erreurInputAdresse} </p>
                                    </div>
                                }
                            </div>
                            <div className={"div-input-register"}>
                                <label>Code postal</label>
                                <input
                                    className="input-login"
                                    style={{margin: "0 0 0.5em 0"}}
                                    value={CodePostal}
                                    placeholder="Code Postal"
                                    onBlur={handleBlurCodePostal}
                                    onChange={(e) => {
                                        setCodePostal(e.target.value);
                                        setHasChanged(true)
                                    }}
                                />
                                {erreurInputCodePostal && CodePostal !== 5 &&
                                    <div className={"div-error-message-register"} style={{margin: "0 0 0.5em 0"}}>
                                        <FontAwesomeIcon id={"icon-infos-error"} icon={faCircleInfo}></FontAwesomeIcon>
                                        <p style={{color: "red", margin: "0"}}>{erreurInputCodePostal} </p>
                                    </div>
                                }
                            </div>
                            <div className={"div-input-register"}>
                                <label>Ville</label>
                                <input
                                    className="input-login"
                                    style={{margin: "0 0 0.5em 0"}}
                                    value={Ville}
                                    placeholder="Ville"
                                    onBlur={handleBlurVille}
                                    onChange={(e) => {
                                        setVille(e.target.value);
                                        setHasChanged(true)
                                    }}
                                />
                                {erreurInputVille && Ville <= 0 &&
                                    <div className={"div-error-message-register"} style={{margin: "0 0 0.5em 0"}}>
                                        <FontAwesomeIcon id={"icon-infos-error"} icon={faCircleInfo}></FontAwesomeIcon>
                                        <p style={{color: "red", margin: "0"}}>{erreurInputVille} </p>
                                    </div>
                                }
                            </div>
                            <div className={"div-input-register"}>
                                <label>Complément d'adresse</label>
                                <input
                                    className="input-login"
                                    style={{margin: "0 0 0.5em 0"}}
                                    value={ComplementAdresse}
                                    placeholder="Complément d'adresse"
                                    onChange={(e) => {
                                        setComplementAdresse(e.target.value);
                                        setHasChanged(true)
                                    }}
                                />
                            </div>
                            <div className={"div-input-register"}>
                                <label>Pays</label>
                                <input
                                    className="input-login"
                                    style={{margin: "0 0 0.5em 0"}}
                                    value={Pays}
                                    placeholder="Pays"
                                    onBlur={handleBlurPays}
                                    onChange={(e) => {
                                        setPays(e.target.value);
                                        setHasChanged(true)
                                    }}
                                />
                                {erreurInputPays && Pays <= 2 &&
                                    <div className={"div-error-message-register"} style={{margin: "0 0 0.5em 0"}}>
                                        <FontAwesomeIcon id={"icon-infos-error"} icon={faCircleInfo}></FontAwesomeIcon>
                                        <p style={{color: "red", margin: "0"}}>{erreurInputPays} </p>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="div-infos-perso">
                            <div className={"div-input-register"}>
                                <label>Nom</label>
                                <input
                                    className="input-login"
                                    style={{margin: "0 0 0.5em 0"}}
                                    placeholder="Nom"
                                    value={Nom}
                                    onBlur={handleBlurNom}
                                    onChange={(e) => {
                                        setNom(e.target.value);
                                        setHasChanged(true)
                                    }}
                                ></input>
                                {erreurInputNom && Nom <= 2 &&
                                    <div className={"div-error-message-register"} style={{margin: "0 0 0.5em 0"}}>
                                        <FontAwesomeIcon id={"icon-infos-error"} icon={faCircleInfo}></FontAwesomeIcon>
                                        <p style={{color: "red", margin: "0"}}>{erreurInputNom} </p>
                                    </div>
                                }
                            </div>
                            <div className={"div-input-register"}>
                                <label>Prénom</label>
                                <input
                                    className="input-login"
                                    style={{margin: "0 0 0.5em 0"}}
                                    placeholder="Prénom"
                                    value={Prenom}
                                    onBlur={handleBlurPrenom}
                                    onChange={(e) => {
                                        setPrenom(e.target.value);
                                        setHasChanged(true)
                                    }}
                                ></input>
                                {erreurInputPrenom && Prenom <= 2 &&
                                    <div className={"div-error-message-register"} style={{margin: "0 0 0.5em 0"}}>
                                        <FontAwesomeIcon id={"icon-infos-error"} icon={faCircleInfo}></FontAwesomeIcon>
                                        <p style={{color: "red", margin: "0"}}>{erreurInputPrenom} </p>
                                    </div>
                                }
                            </div>
                            <div className={"div-input-register"}>
                                <label>Téléphone</label>
                                <input
                                    className="input-login"
                                    style={{margin: "0 0 0.5em 0"}}
                                    placeholder="Téléphone"
                                    value={Telephone}
                                    onBlur={handleBlurTelephone}
                                    onChange={(e) => {
                                        setTelephone(e.target.value);
                                        setHasChanged(true)
                                    }}
                                ></input>
                                {erreurInputTelephone && !validator.isMobilePhone(Telephone) && Telephone.length !== 10 &&
                                    <div className={"div-error-message-register"} style={{margin: "0 0 0 0"}}>
                                        <FontAwesomeIcon id={"icon-infos-error"} icon={faCircleInfo}></FontAwesomeIcon>
                                        <p style={{color: "red", margin: "0"}}>{erreurInputTelephone} </p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <button className="btn-save" onClick={() => setBtnUpdateAdresseClique(true)}>
                        Enregistrer Changement
                        <FontAwesomeIcon className="icon-signIn"/>
                    </button>
                </div>
            </div>
        </>
    );
}

export default DetailsAdresses;

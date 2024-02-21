import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import validator from "validator";
import "./ResetPassword.css";

function ResetPassword() {
    const {token} = useParams();
    const [tokenIsValid, setTokenIsValid] = useState(false);
    const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
    const [confirmationNouveauMotDePasse, setConfirmationNouveauMotDePasse] = useState("");
    const [inputType, setInputType] = useState("password");
    const [isDataLoading, setDataLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setInputType(inputType === "password" ? "text" : "password");
    };

    useEffect(() => {
        const tokenIsValid = async () => {
            try {
                setDataLoading(true);
                const response = await fetch(
                    `http://localhost:5000/api/v1/auth/tokenIsValid/${token}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );
                if (response.ok) {
                    const token = await response.json();
                    setTokenIsValid(true);
                } else {
                    console.log(response)
                    setTokenIsValid(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        timer: 5000,
                        text: 'Le lien de réinitialisation de mot de passe est invalide ou a expiré. Veuillez refaire une demande de réinitialisation de mot de passe.',
                    })
                    setTimeout(() => {
                        window.location.href = "/auth/login";
                    }, 4000)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setDataLoading(false);
            }
        }
        tokenIsValid().then();
    }, [token])

    const resetPassword = () => {
        if (nouveauMotDePasse !== confirmationNouveauMotDePasse || validator.isEmpty(nouveauMotDePasse)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Les mots de passe ne correspondent pas.',
            })
            return;
        } else if (!validator.isStrongPassword(nouveauMotDePasse)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Le mot de passe ne respecte pas les conditions de sécurité. Veuillez vérifier que votre mot de passe contient ceci : 1 masjuscule, miniscule, chiffre, caractère spécial et un total de 8 caractère au minimum.',
            })
            return;
        }
        const resetPassword = async () => {
            try {
                setDataLoading(true);
                const response = await fetch(
                    `http://localhost:5000/api/v1/auth/reset-password/${token}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            nouveauMotDePasse: nouveauMotDePasse,
                        }),
                    },
                );
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Mot de passe réinitialisé',
                        text: 'Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.',
                    })
                    setTimeout(() => {
                        window.location.href = "/auth/login";
                    }, 4000)
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Erreur lors de la réinitialisation du mot de passe',
                    })
                }
            } catch (error) {
                console.error(error)
            } finally {
                setDataLoading(false);
            }
        }
        resetPassword().then();
    }

    /**
     * TODO : Faire une recherche sur un user pour vérifier que le token est encore valide
     * Si oui, afficher un formulaire pour changer le mot de passe
     * Si non, afficher un message d'erreur
     * TODO : Faire une requête pour changer le mot de passe en récupérant l'id du client à qui appartient le token
     */

    return <>
        {tokenIsValid ?
            <>
                <div className={"div-main-reset-password"}>
                    <h2>Réinitialisation de votre mot de passe</h2>
                    <div>

                    </div>
                    <div className="div-password">
                        <input
                            className="input-login"
                            type={inputType}
                            placeholder="Nouveau mot de passe"
                            value={nouveauMotDePasse}
                            onChange={(e) => setNouveauMotDePasse(e.target.value)}
                        ></input>
                        {inputType === "password" ? (
                            <FontAwesomeIcon icon={faEye} id={"icon-eye-see-password"}
                                             onClick={togglePasswordVisibility}></FontAwesomeIcon>
                        ) : (
                            <FontAwesomeIcon icon={faEyeSlash} id={"icon-eye-see-password"}
                                             onClick={togglePasswordVisibility}></FontAwesomeIcon>
                        )}
                    </div>
                    <input
                        className="input-login"
                        type={inputType}
                        placeholder="Confirmer le nouveau mot de passe"
                        value={confirmationNouveauMotDePasse}
                        onChange={(e) => setConfirmationNouveauMotDePasse(e.target.value)}
                    ></input>
                    <button onClick={() => resetPassword()}>
                        Réinitialiser le mot de passe
                    </button>
                </div>

            </>
            : null
        }
    </>
}

export default ResetPassword;
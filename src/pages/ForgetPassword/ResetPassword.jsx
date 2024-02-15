import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function ResetPassword(){
    const { token } = useParams();
    const [tokenIsValid, setTokenIsValid] = useState(false);
    const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
    const [confirmationNouveauMotDePasse, setConfirmationNouveauMotDePasse] = useState("");
    const [inputType, setInputType] = useState("password");

    const togglePasswordVisibility = () => {
        setInputType(inputType === "password" ? "text" : "password");
    };

    useEffect(() => {
        const tokenIsValid = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/api/v1/auth/tokenIsValid/${token}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );
                if (response.ok){
                    const token = await response.json();
                    setTokenIsValid(true);
                } else{
                    setTokenIsValid(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Le lien de réinitialisation de mot de passe est invalide ou a expiré. Veuillez refaire une demande de réinitialisation de mot de passe.',
                    })
                }
            } catch (error) {
                console.error(error)
            }
        }
        tokenIsValid().then();
    }, [token])

    /**
     * TODO : Faire une recherche sur un user pour vérifier que le token est encore valide
     * Si oui, afficher un formulaire pour changer le mot de passe
     * Si non, afficher un message d'erreur
     * TODO : Faire une requête pour changer le mot de passe en récupérant l'id du client à qui appartient le token
     */

    return <>
        {tokenIsValid ?
            <>
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
            </>
            : null
        }
    </>
}

export default ResetPassword;
import React, {useEffect, useState} from "react";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import "./AdminCodePromo.css";
import {Link, useNavigate} from "react-router-dom";


function AdminCodePromo() {
    const [codePromo, setCodePromo] = useState("");
    const [remise, setRemise] = useState();
    const [remiseEnVirgule, setRemiseEnVirgule] = useState();
    const [dateExpiration, setDateExpiration] = useState("");
    const [codePromos, setCodePromos] = useState([]);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };
    const addApromoCode = () => {
        try {
            const codePromoObject = {
                codePromo: codePromo,
                reduction: remiseEnVirgule,
                reductionValeurEntier: remise,
                dateValidite: dateExpiration,
            }
            console.log(codePromo)
            const addCodePromo = async () => {
                const response = await fetch(`${process.env.REACT_APP_API_URL}codePromo/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(codePromoObject),
                });
                const newCodePromo = await response.json();
                setCodePromos(newCodePromo)
                console.log(newCodePromo);
                Swal.fire({
                    title: "Code promo ajouté",
                    icon: "success",
                })
            }
            addCodePromo();
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        try {
            const fetchCodePromo = async () => {
                const response = await fetch(`${process.env.REACT_APP_API_URL}codePromo`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const codePromos = await response.json();
                console.log(codePromos);
                setCodePromos(Object.values(codePromos));
                console.log(codePromos)
            }
            fetchCodePromo();
        } catch (error){
            console.log(error)
        }
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
        const day = String(date.getDate()).padStart(2, '0');

        return `${day}-${month}-${year}`;
    }

    const removePromoCode = async (id) => {
       Swal.fire({
              title: "Êtes-vous sûr de vouloir supprimer ce code promo ?",
              showDenyButton: true,
              confirmButtonText: `Oui`,
              denyButtonText: `Non`,
       }).then((result) => {
           if (result.isConfirmed) {
               const removeCodePromoAfterConfirmation = async () => {
                   try {
                       const response = await fetch(`${process.env.REACT_APP_API_URL}codePromo/remove/${id}`, {
                           method: "DELETE",
                           headers: {
                               "Content-Type": "application/json",
                           },
                       });
                       const newCodePromos = await response.json();
                       setCodePromos(newCodePromos);
                       Swal.fire({
                            title: "Code promo supprimé",
                            icon: "success",
                       })
                   } catch (error) {
                       console.log(error);
                   }
               }
               removeCodePromoAfterConfirmation();
           }
        });
    }

    return (
        <div className={"div-principale-admin-code-promo"}>
            <Link to="#" onClick={handleGoBack}>
                <img
                    src="https://res.cloudinary.com/dc1p20eb2/image/upload/v1700322943/Icon_retour_arriere.png"
                    alt="Retour en arrière"
                    width={25}
                    height={25}
                    style={{ margin: '2em 0 0 2em' }}
                />
            </Link>
            <div style={{width: "50%"}}>
                <h1 style={{margin: "1em 0 0 2em"}}>Liste de tout les code promos</h1>
                <div>
                    <div style={{display: "flex", flexDirection: "row", margin: "5em 5em 0 5em"}}>
                        <h4 style={{padding: "0 1em 0 0", width: "20%"}}>Code promo</h4>
                        <h4 style={{padding: "0 1em 0 0", width: "20%"}}>Réduction</h4>
                        <h4 style={{padding: "0 1em 0 0", width: "20%"}}>Date d'expiration</h4>
                    </div>
                    {codePromos.map((codePromo, index) => {
                        return (
                            <>
                            <div key={index} style={{display: "flex", alignItems: "center", margin: "2em 0 1em 5em"}}>
                                <p style={{width: "20%", padding: "0 1em 0 0"}}>{codePromo.codePromo}</p>
                                <p style={{width: "20%", padding: "0 1em 0 0"}}>{codePromo.reduction}</p>
                                <p style={{width: "20%", padding: "0 1em 0 0"}}>{formatDate(codePromo.dateValidite)}</p>
                                <FontAwesomeIcon color={"red"} icon={faXmark} style={{cursor: "pointer"}} onClick={() => removePromoCode(codePromo._id)}/>
                            </div>
                            <hr/>
                            </>
                        );
                    })}
                </div>
            </div>
            <div style={{width: "50%", margin: "0 0 0 5em"}}>
                <h2>Cette espace te permet d'ajouter un code promo en définisant la remise en pourcentage et en nombre à
                    virgule, la date de validité et le code associé.</h2>
                <h4>Exemple : CODEPROMO1234, 0.2, 20, 2024-04-01 (AAAA-MM-JJ)</h4>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <label>Code promo</label>
                    <input style={{width: "80%", padding: "0.8em", margin: "0 0 0.9em 0"}} type="text" onChange={(e) => setCodePromo(e.target.value)}
                    />
                    <label>Remise en % (ex: 20)</label>
                    <input style={{width: "80%", padding: "0.8em", margin: "0 0 0.9em 0"}} type="text" onChange={(e) => setRemise(e.target.value)}/>
                    <label>Remise virgule (ex: 0.2)</label>
                    <input style={{width: "80%", padding: "0.8em", margin: "0 0 0.9em 0"}} type="text"
                           onChange={(e) => setRemiseEnVirgule(e.target.value)}/>
                    <label>Date d'expiration du code</label>
                    <input style={{width: "80%", padding: "0.8em", margin: "0 0 0.9em 0"}} type="text" onChange={(e) => setDateExpiration(e.target.value)}/>
                    <button style={{width: "83%"}} onClick={() => addApromoCode()}>Ajouter</button>
                </div>
            </div>

        </div>
    );
}

export default AdminCodePromo;
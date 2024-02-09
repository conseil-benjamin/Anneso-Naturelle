import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import "./Adresses.css";
import CardAdressses from "../../components/CardAdresses/CardAdresses";

function Adresses() {
    const navigate = useNavigate();
    const location = useLocation();
    const {adresses} = location.state || {};
    console.log(adresses);

    const tableauObjet = Object.values(adresses);
    const [btnAddAdresseClique, setbtnAddAdresseClique] = useState(false);

    useEffect(() => {
        if (btnAddAdresseClique) {
            navigate("/profil/adresses/ajoutAdresse");
        }
    }, [btnAddAdresseClique]);

    return (
        <>
            <div className="div-main-page-adresses">
                <NavBarProfil></NavBarProfil>
                <div className={"div-container-right"}>
                    <div>
                        <h2>Mes adresses</h2>
                    </div>
                    {adresses.length > 0 ? (
                        tableauObjet.map((adresse) => (
                            <CardAdressses
                                adresseId={adresse.adresseId}
                                nomPersonne={adresse.nomPersonne}
                                prenomPersonne={adresse.prenomPersonne}
                                adresse={adresse.adresse}
                                codePostal={adresse.codePostal}
                                pays={adresse.pays}
                                ville={adresse.ville}
                                complementAdresse={adresse.complementAdresse}
                                numTel={adresse.numTel}
                            ></CardAdressses>
                        ))
                    ) : (
                        <div>
                            <h2>Aucune adresse pour le moment</h2>
                        </div>
                    )}
                    <button onClick={() => setbtnAddAdresseClique(true)} id="btn-add-adresse">
                        Ajouter une adresse
                    </button>
                </div>
            </div>
        </>
    );
}

export default Adresses;

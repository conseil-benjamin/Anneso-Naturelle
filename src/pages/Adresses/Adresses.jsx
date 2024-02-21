import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import NavBarProfil from "../../components/NavBarProfil/NavBarProfil";
import "./Adresses.css";
import CardAdressses from "../../components/CardAdresses/CardAdresses";
import Cookies from "js-cookie";
import {Loader} from "../../utils/Loader";

function Adresses() {
    const navigate = useNavigate();
    const [isDataLoading, setDataLoading] = useState(false);
    const [adresses, setAdresses] = useState([]);
    console.log(adresses);

    const tableauObjet = Object.values(adresses);
    const [btnAddAdresseClique, setbtnAddAdresseClique] = useState(false);

    useEffect(() => {
        const fetchAllAdresses = async () => {
            setDataLoading(true);
            try{
                const response = await fetch("http://localhost:5000/api/v1/adresses", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("auth_token")}`,
                    },
                });
                if (response.ok){
                    const data = await response.json();
                    console.log(data);
                    setAdresses(data);
                }
            } catch (error) {
                console.log(error);
            }
            finally {
                setDataLoading(false);
            }
        };
        fetchAllAdresses();
    }, []);

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
                    {isDataLoading ? <Loader></Loader>: adresses.length > 0 ? (
                        tableauObjet.map((adresse) => (
                            <CardAdressses
                                adresseId={adresse._id}
                                nomPersonne={adresse.nomPersonne}
                                prenomPersonne={adresse.prenomPersonne}
                                adresse={adresse.adresse}
                                codePostal={adresse.codePostal}
                                pays={adresse.pays}
                                ville={adresse.ville}
                                complementAdresse={adresse.complementAdresse}
                                numTel={adresse.numTel}
                                setAdresses={setAdresses}
                                adresses={adresses}
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

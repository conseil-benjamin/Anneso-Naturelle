import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import "./ButtonSignOut.css";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";

function ButtonDeconnect() {
    const navigate = useNavigate();

    function deconnect() {
        localStorage.setItem("cart", JSON.stringify([]));
        Cookies.remove("auth_token");
        Cookies.remove("name");
        localStorage.setItem("nbArticles", 0);
        localStorage.setItem("basketConcated", false);
        localStorage.setItem("total", 0);
        localStorage.setItem("nbElement", 0);

        // Use a timeout to ensure that the state is updated before navigating
        setTimeout(() => {
            navigate("/");
        }, 0);
    }

    return (
        <>
            <div className="div-btn-signOut" onClick={() => deconnect()} style={{cursor: "pointer"}}>
                <FontAwesomeIcon className="icon-signOut" icon={faSignOutAlt}/>
                <a className="btn-sign-out" style={{margin: "0 0 0 0.5em"}}>
                    Déconnexion
                </a>
            </div>
        </>
    );
}

export default ButtonDeconnect;

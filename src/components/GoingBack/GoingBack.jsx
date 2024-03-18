import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import React from "react";

function GoingBack() {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };
    return (
        <div className="return-to-collection">
            <Link to="#" onClick={handleGoBack}>
                <div style={{display: "flex", alignItems: "center", margin: "1em 0 0 2em"}}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                    <p style={{margin: "0 0 0 1em", fontSize: "0.9em"}}>Retour</p>
                </div>
            </Link>
        </div>
    )
}

export default GoingBack;
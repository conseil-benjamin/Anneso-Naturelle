import React, {useState} from "react";

function AdminAddProduct () {
    const [nomProduit, setNomProduit] = useState("");
    const [categoryProduit, setCategoryProduit] = useState("");
    const [lienImageProduit, setLienImageProduit] = useState("");
    const [prixProduit, setPrixProduit] = useState("");
    const [descriptionProduit, setDescriptionProduit] = useState("");

    const addProduct = () => {

    }

    return (
        <div style={{width: "50%", margin: "0 0 0 5em"}}>
            <h3>Formulaire d'ajout d'un produit sur le site</h3>
            <div style={{display: "flex", flexDirection: "column"}}>
                <label>Nom du produit</label>
                <input style={{width: "80%", padding: "0.8em", margin: "0 0 0.9em 0"}} type="text"
                       onChange={(e) => setNomProduit(e.target.value)}
                />
                <label>Remise en % (ex: 20)</label>
                <input style={{width: "80%", padding: "0.8em", margin: "0 0 0.9em 0"}} type="text"
                       onChange={(e) => setCategoryProduit(e.target.value)}/>
                <label>Remise virgule (ex: 0.2)</label>
                <input style={{width: "80%", padding: "0.8em", margin: "0 0 0.9em 0"}} type="text"
                       onChange={(e) => setPrixProduit(e.target.value)}/>
                <label>Date d'expiration du code</label>
                <input style={{width: "80%", padding: "0.8em", margin: "0 0 0.9em 0"}} type="text"
                       onChange={(e) => setDescriptionProduit(e.target.value)}/>
                <input type={"file"} onChange={(e) => setLienImageProduit(e.target.value)}/>
                <button style={{width: "83%"}} onClick={() => addProduct()}>Ajouter produit</button>
            </div>
        </div>
    )
}

export default AdminAddProduct;
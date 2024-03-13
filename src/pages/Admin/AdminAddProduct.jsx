import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";

function AdminAddProduct () {
    const [nomProduit, setNomProduit] = useState("");
    const [categoryProduit, setCategoryProduit] = useState("");
    const [lienImageProduit, setLienImageProduit] = useState("");
    const [prixProduit, setPrixProduit] = useState();
    const [descriptionProduit, setDescriptionProduit] = useState("");
    const [nomsPierres, setNomsPierres] = useState([""]);
    const [couleursPierres, setCouleursPierres] = useState([""]);
    const [formulaireCorrect, setFormulaireCorrect] = useState(false);
    const [readyToUploadImage, setReadyToUploadImage] = useState(false);
    let file = null;

    const formValid = () => {
        if (nomProduit === "" || categoryProduit === "" || descriptionProduit === ""){
            return false;
        }
    }


    const addProduct = () => {
        console.log(nomProduit)
        console.log(categoryProduit)
        console.log(descriptionProduit)
        if (formValid() === true){
            setReadyToUploadImage(true);
        } else{
            Swal.fire({
                text: "Erreur dans le formulaire d'ajout d'un produit.",
                icon: "error"
            })
        }
        uploadImage(file);
        const timestamp = new Date().getTime();
        const uniqueId = `${timestamp}`;
        const produit = {
            id: uniqueId,
            name: nomProduit,
            category: categoryProduit,
            cover: lienImageProduit,
            price: prixProduit,
            description: descriptionProduit,
            pierres: categoryProduit === "bracelet" ? nomsPierres : undefined
        }
        console.log(produit)
        const addProductToDatabase = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}products/add`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(produit)
                });
                const data = await response.json();
                console.log(data);
            } catch (e) {
                console.log(e);
            }
        }
        addProductToDatabase();
    }

    const ajouterPierres = (pierres) => {
        setNomsPierres(pierres);
    };

    const handleImageUpload = event => {
        file = event.target.files[0];
    };

    const uploadImage = async file => {
        const formData = new FormData();
        formData.append('image', file);
        if (!readyToUploadImage) {
            return
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}images/upload`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Erreur lors du téléchargement de l\'image');
            }
            const data = await response.json();
            setLienImageProduit(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{width: "50%", margin: "0 0 0 5em"}}>
            <h3>Formulaire d'ajout d'un produit sur le site</h3>
            <div style={{display: "flex", flexDirection: "column"}}>
                <label>Nom du produit</label>
                <input style={{width: "80%", padding: "0.8em", margin: "0 0 0.9em 0"}} type="text"
                       onChange={(e) => setNomProduit(e.target.value)}
                />
                <label>Catégorie du produit</label>
                <select value={categoryProduit} onChange={(e) => setCategoryProduit(e.target.value)} style={{margin: "0 0 1em 0", width: "83%", height: "3em"}}>
                    <option value="">Choisit une catégorie</option>
                    <option value="bracelet">Bracelet</option>
                    <option value="boucleOreille">Boucles d'oreilles</option>
                    <option value="encen">Encens</option>
                    <option value="accesoire">Accesoires</option>
                </select>
                {(categoryProduit === "bracelet" || categoryProduit === "boucles-oreilles") &&
                    <>
                        <div style={{margin: "1em 0 1em 0"}}>
                            <label>Nom des pierres</label>
                            <input type="text" onBlur={(e) => ajouterPierres(e.target.value)}/>
                        </div>
                        <div>
                            <label>Couleur des pierres</label>
                            <input type="text" onBlur={(e) => setCouleursPierres(e.target.value)}/>
                        </div>
                    </>
                }
                <label>Prix Produit</label>
                <input style={{width: "80%", padding: "0.8em", margin: "0 0 0.9em 0"}} type="number"
                       onChange={(e) => setPrixProduit(e.target.value)}/>
                <label>Description du produit</label>
                <input style={{width: "80%", padding: "0.8em", margin: "0 0 0.9em 0"}} type="text"
                       onChange={(e) => setDescriptionProduit(e.target.value)}/>
                <input type="file" onChange={handleImageUpload} />
                <button style={{width: "83%", margin: "0 0 1em 0"}} onClick={() => addProduct()}>Ajouter produit</button>
        </div>
    </div>
)
}

export default AdminAddProduct;
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function RedirectToProductDetails({ idProduct, imageClique }) {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    process.env.APP_URL + "/products/" + idProduct
                );
                const product = await response.json();
                if (product) {
                    navigate("/Details/" + idProduct, {
                        state: {
                            cover: product.cover,
                            name: product.nom,
                            price: product.price,
                            description: product.description,
                            category: product.category,
                        },
                    });
                } else {
                    Swal.fire({
                        text: "Produit non disponible ",
                        icon: "error",
                        confirmButtonText: "Ok",
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (imageClique) {
            fetchData();
        }
    }, [idProduct, imageClique, navigate]);
    return null;
}

export default RedirectToProductDetails;

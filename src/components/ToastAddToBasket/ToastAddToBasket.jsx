import Swal from "sweetalert2";

function ToastAddToBasket({cart}) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        timerProgressBar: true,
        showConfirmButton: false,
        color: "#000",
        allowOutsideClick: true,
        showCloseButton: true,
        background: "#fff",
        customClass: {
            timerProgressBar: "background-color: #ffffff !important"
        }
    });
    Toast.fire({
        html: `
<h3 style="margin: 0 0 1em 0">Mon panier</h3>
        ${cart.map((cartElement, index) => `
            <div style="display: flex; align-items: center; justify-content: space-between; flex-direction: row; padding: 0 0 0.2em 0">
                <img src="${cartElement.cover}" alt="Product Image" style="width: 50px; height: 50px; border-radius: 5px">
                <div style="display: flex; flex-direction: column; padding: 0; margin: 0; align-items: flex-start; justify-content: start">
                                <p style="padding: 0; margin: 0">${cartElement.name}</p>
                               <p style="padding: 0; margin: 0">${cartElement.price} €</p>
                </div>
                <p>${cartElement.amount}</p>
            </div>
            <hr/>
        `).join('')}
<button onclick="window.location.href = '/panier'">Voir le panier</button>`,
    });
    return null;
}

export default ToastAddToBasket;
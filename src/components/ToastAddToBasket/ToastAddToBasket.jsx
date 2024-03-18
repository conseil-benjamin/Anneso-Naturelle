import Swal from "sweetalert2";
import './ToastAddToBasket.scss';

function ToastAddToBasket({cart}) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        color: "#000",
        showCloseButton: true,
        background: "#fff",
        customClass: {
            timerProgressBar: "background-color: #ffffff !important",
            popup: 'swal-full-height',
            closeButton: 'custom_close_button',
        },
        showClass: {
            popup: window.innerWidth <= 600 ? 'slideInMobile' : 'slideIn',
            backdrop: ''
        },
        hideClass: {
            popup: window.innerWidth <= 600 ? 'slideOutMobile' : 'slideOut',
            backdrop: ''
        }
    });
    Toast.fire({
        html: `
<h3 style="margin: 0 0 2em 0; text-align: center">Mon panier</h3>
<div>
        ${cart.map((cartElement, index) => `
            <div style="display: flex; align-items: center; justify-content: space-between; flex-direction: row; padding: 0 0 0.2em 0">
                <img src="${cartElement.cover}" alt="Product Image" style="width: 50px; height: 50px; border-radius: 5px">
                <div style="display: flex; flex-direction: column; padding: 0; margin: 0; justify-content: start; width: 6em">
                                <p style="padding: 0; margin: 0">${cartElement.name}</p>
                </div>
                <p style="padding: 0; margin: 0">${cartElement.price.toFixed(2)} €</p>
                <p>x ${cartElement.amount}</p>
            </div>
            <hr id="hr-toast-add-to-basket"/>
        `).join('')}
        <div style="display: flex; align-items: center; justify-content: center; margin: 1em 0 0 0">
        <button style="" onclick="window.location.href = '/panier'">Voir le panier</button>
        </div>
        <div>`,
    });
    return null;
}

export default ToastAddToBasket;
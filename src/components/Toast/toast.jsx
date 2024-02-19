import Swal from "sweetalert2";

function Toast({icon, text}){
    const Toast= Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        padding: "0.5em",
        color: "#000",
        background: "#fff",
        didOpen: (toast) => {
            toast.onmouseover = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
        customClass: {
            timerProgressBar: "background-color: #ffffff !important",
        }
    });
    Toast.fire({
        text: text,
        icon: icon,
    });
    return null;
}
export default Toast;
import { ToastContainer, Zoom } from "react-toastify";
import "./ThemedToastContainer.scss";

export default function ThemedToastContainer() {
    return (
        <ToastContainer
            style={{ width: "350px" }}
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover
            theme="colored"
            transition={Zoom}
        />
    );
}

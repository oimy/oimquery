import { ReactNode } from "react";
import "./Modal.scss";

export default function Modal({
    children,
    onClose = () => {},
}: {
    children: ReactNode;
    onClose?: () => void;
}) {
    return (
        <section className="modal-container">
            <div className="background" onClick={onClose} />
            <div className="content">{children}</div>
            <button className="exit" onClick={onClose}>
                <i className="fa-solid fa-xmark" />
            </button>
        </section>
    );
}

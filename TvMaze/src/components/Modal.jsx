import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function Modal({ open, onClose, children}) {
    // Bloquea scroll del body cuando está abierto y añade ESC listener
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKey = (e) => {
            if (e.key === "Escape"){
				onClose();
			}
        };
        window.addEventListener("keydown", onKey);

        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    if (!open) return null;

    return (
        <div
            className="modal-overlay"
            onClick={onClose}
        >
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="modal-close"
                    onClick={onClose}
                >
                    <FaTimes/>
                </button>
                {children}
            </div>
        </div>
    );
}

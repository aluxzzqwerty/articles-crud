import React from "react";
import ReactDOM from "react-dom";

type ModalProps = {
    title: string
    content: string
    actions: JSX.Element
    onDismiss: () => void
}

const Modal: React.FC<ModalProps> = ({ title, content, actions, onDismiss }) => {
    return ReactDOM.createPortal(
        <div onClick={onDismiss} className="delete">
            <div onClick={(e) => e.stopPropagation( )} className="delete__modal">
                <div className="delete__modal--header">{title}</div>
                <div className="delete__modal--content">{content}</div>
                <div className="delete__modal--actions">{actions}</div>
            </div>
        </div>,
        document.getElementById("modal") as HTMLElement
    );
};

export default Modal;
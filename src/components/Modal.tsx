import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
    isOpen: boolean
    title: string
    children: ReactNode,
    onClose: () => void
}

const Modal: FC<ModalProps> = ({
    isOpen,
    title,
    children,
    onClose
}) => {
    //if (!isOpen) return null

    return createPortal(
        <div 
            className={`modal ${isOpen ? "modal_active" : ""}`} 
            id="modal"
        >
            <div 
                className="modal__overlay" 
                onClick={onClose}
            />
            <div className="modal__content">
                <button 
                    className="modal__close btn-reset"
                    onClick={onClose}
                >
                    <span></span>
                </button>
                <h2 className="modal__title">{title}</h2>

                {children}

            </div>
        </div>,
        document.body
    )
}

export default Modal
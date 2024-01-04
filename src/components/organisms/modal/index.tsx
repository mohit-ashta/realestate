import { ModalProps } from "@/types/types";
import React from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";

export const CommonModal: React.FC<ModalProps> = ({
  children,
  buttonText,
  buttonIcon,
  width,
  className,
  
}) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: width ? width : "406px",
      border: "none",
      zIndex: "50",
    },
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }
  return (
    <>
      <button onClick={openModal} className={`text-black text-base uppercase font-medium flex gap-1 items-center ${className}`}>{buttonIcon && <span>{buttonIcon}</span>}{buttonText}</button>
      <Modal style={customStyles} isOpen={isOpen} onRequestClose={closeModal}>
        <button onClick={closeModal} className="flex justify-end w-full"><AiOutlineClose size={20} /></button>
        {children}
      </Modal>
    </>
  );
};
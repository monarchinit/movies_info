import React from "react";
import css from "./Modal.module.css";

const Modal = ({ children, onHandleClick }) => {
  return (
    <div
      onClick={onHandleClick}
      data-container="modal"
      className={css.containerModal}
    >
      <div className={css.wrapperModal}>{children}</div>
    </div>
  );
};

export default Modal;

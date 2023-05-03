import React, { Fragment } from "react";

import "./Modal.css"

const Modal = (props) => {
  return (
    <Fragment>
      <div className="backdrop" onClick={props.onClose} />
      <div className="error-modal">
        {props.children}
      </div>
    </Fragment>
  );
};

export default Modal;

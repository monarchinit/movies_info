import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { clearError } from "../../redux/actionCreator";
import Modal from "../modal/Modal";

const ErrorComponent = ({ error, clearError }) => {
  return (
    <Modal>
      <>
        <h2>{error}</h2>
        <Button
          style={{ margin: "0 auto", display: "block" }}
          onClick={() => clearError()}
          variant="contained"
          color="primary"
        >
          Ok
        </Button>
      </>
    </Modal>
  );
};

const MDTP = { clearError };

export default connect(null, MDTP)(ErrorComponent);

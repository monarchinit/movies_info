import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { clearError } from "../../redux/actionCreator";

const ErrorComponent = ({ error, clearError }) => {
  return (
    <div className="containerModal">
      <div className="wrapperModal">
        <h2>{error}</h2>
        <Button
          style={{ margin: "0 auto", display: "block" }}
          onClick={() => clearError()}
          variant="contained"
          color="primary"
        >
          Ok
        </Button>
      </div>
    </div>
  );
};

const MDTP = { clearError };

export default connect(null, MDTP)(ErrorComponent);

import React from "react";
import Loader from "react-loader-spinner";
import css from "./loaderComponent.module.css";

const LoaderComponent = () => {
  return (
    <div className={css.container}>
      <Loader
        type="Puff"
        color="#00BFFF"
        height={200}
        width={200}
        timeout={300}
      />
    </div>
  );
};

export default LoaderComponent;

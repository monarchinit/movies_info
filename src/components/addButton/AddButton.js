import React from "react";
import css from "./addButton.module.css";

const AddButton = ({ clickCallback, large }) => {
  return (
    <div
      onClick={clickCallback}
      className={large ? css.addButton : css.addStar}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={large ? "100" : "30"}
        height={large ? "100" : "30"}
        viewBox="0 0 52 52"
      >
        <path
          fill="#fff"
          d="M38.5 25H27V14c0-.553-.448-1-1-1s-1 .447-1 1v11H13.5c-.552 0-1 .447-1 1s.448 1 1 1H25v12c0 .553.448 1 1 1s1-.447 1-1V27h11.5c.552 0 1-.447 1-1s-.448-1-1-1z"
        />
      </svg>
    </div>
  );
};
export default AddButton;

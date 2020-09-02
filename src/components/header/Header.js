import React from "react";
import css from "./header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={css.header}>
      <div className={`container ${css.container}`}>
        <div>
          <Link className={css.logo} to="/">
            Movies_info
          </Link>
        </div>
        <div className={css.searchContainer}>
          <input className={css.input} type="search"></input>
          <div>
            <select className={css.select}>
              <option>search by movie title</option>
              <option>search by actor name</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

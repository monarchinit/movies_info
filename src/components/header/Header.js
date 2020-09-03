import React from "react";
import { Select, TextField, InputLabel } from "@material-ui/core";
import css from "./header.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setSearch, setSearchFilter } from "../../redux/actionCreator";

const Header = ({
  setSearch,
  setSearchFilter,
  searchFilter,
  search,
  activeMovie,
}) => {
  return (
    <header className={css.header}>
      <div className={`container ${css.container}`}>
        <div>
          <Link className={css.logo} to="/">
            Movies_info
          </Link>
        </div>
        <div className={css.searchContainer}>
          <TextField
            onInput={(e) => {
              setSearch(e.target.value);
            }}
            type="search"
            required
            id="search"
            label="Search"
            value={search}
            disabled={!!activeMovie}
          />
          <InputLabel htmlFor="format">Search criteria</InputLabel>
          <Select
            native
            required
            inputProps={{
              name: "format",
              id: "format",
            }}
            onChange={(e) => setSearchFilter(e.target.value)}
            value={searchFilter}
            disabled={!!activeMovie}
          >
            <option value="title">Search by title</option>
            <option value="name">Search by star</option>
          </Select>
        </div>
      </div>
    </header>
  );
};
const MSTP = ({ moviesInfo }) => ({
  searchFilter: moviesInfo.searchFilter,
  search: moviesInfo.search,
  activeMovie: moviesInfo.activeMovie,
});
const MDTP = { setSearch, setSearchFilter };

export default connect(MSTP, MDTP)(Header);

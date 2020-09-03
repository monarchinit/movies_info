import React, { Component } from "react";
import { connect } from "react-redux";
import css from "./mainList.module.css";
import MainItems from "../mainItems/MainItems";

class MainList extends Component {
  state = { alfabet: false };

  returnContent = (flag, arr) => {
    if (flag) {
      return [
        ...arr.sort(function (a, b) {
          var nameA = a.title.toLowerCase(),
            nameB = b.title.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        }),
      ];
    } else {
      return [...this.props.movies];
    }
  };

  render() {
    const { movies, search, searchFilter } = this.props;

    let arr = this.returnContent(this.state.alfabet, [...movies]);
    if (search) {
      if (searchFilter === "title") {
        arr = [
          ...arr.filter((e) =>
            e.title.toLowerCase().includes(search.toLowerCase())
          ),
        ];
      }
      if (searchFilter === "name") {
        arr = [
          ...arr.filter((e) =>
            e.stars.some((e) => e.toLowerCase().includes(search.toLowerCase()))
          ),
        ];
      }
    }

    return (
      <>
        {movies.length ? (
          <>
            <span
              className={css.tabs}
              style={{ color: this.state.alfabet ? "gray" : "black" }}
              onClick={() => this.setState({ alfabet: false })}
            >
              usual
            </span>
            <span> / </span>
            <span
              className={css.tabs}
              style={{ color: !this.state.alfabet ? "gray" : "black" }}
              onClick={() => this.setState({ alfabet: true })}
            >
              alfabet
            </span>
            <MainItems renderMovies={arr}></MainItems>
          </>
        ) : (
          <h2>No movie list ....</h2>
        )}
      </>
    );
  }
}

const MSTP = ({ moviesInfo }) => ({
  movies: moviesInfo.movies,
  searchFilter: moviesInfo.searchFilter,
  search: moviesInfo.search,
});

export default connect(MSTP)(MainList);

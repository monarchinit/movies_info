import React, { Component } from "react";
import { connect } from "react-redux";
import MainItems from "../mainItems/MainItems";
import { Checkbox, FormGroup, FormControlLabel } from "@material-ui/core";

const enumSortState = {
  usual: "usual",
  alfabet: "alfabet",
  reverse: "reverse",
};
class MainList extends Component {
  state = { sort: enumSortState.usual, reverse: false };

  returnContent = (sort, arr) => {
    switch (true) {
      case sort === enumSortState.usual:
        return arr;
      case sort === enumSortState.alfabet:
        return [
          ...arr.sort(function (a, b) {
            var nameA = a.title.toLowerCase(),
              nameB = b.title.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          }),
        ];
      default:
        return [...this.props.movies];
    }
  };

  render() {
    const { movies, search, searchFilter } = this.props;

    let arr = this.returnContent(this.state.sort, [...movies]);
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
    if (this.state.reverse) {
      arr = arr.reverse();
    }

    return (
      <>
        {movies.length ? (
          <>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.sort === enumSortState.usual}
                    onChange={() =>
                      this.setState({ sort: enumSortState.usual })
                    }
                    color="primary"
                  />
                }
                label="usual"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.sort === enumSortState.alfabet}
                    onChange={() =>
                      this.setState({ sort: enumSortState.alfabet })
                    }
                    color="primary"
                  />
                }
                label="alfabet"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.reverse}
                    onChange={() =>
                      this.setState(({ reverse }) => ({ reverse: !reverse }))
                    }
                    color="primary"
                  />
                }
                label="reverse"
              />
            </FormGroup>
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

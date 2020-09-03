import React, { useEffect } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { getMovieWithId, deleteMovieWithId } from "../../redux/operations";
import { clearActiveMovie } from "../../redux/actionCreator";
import css from "./movieInfo.module.css";
const MoiveInfo = ({
  history,
  match,
  getMovieWithId,
  deleteMovieWithId,
  clearActiveMovie,
  movie,
}) => {
  useEffect(() => {
    getMovieWithId(match.params.id);
    return () => {
      clearActiveMovie();
    };
  }, [getMovieWithId, match.params.id, clearActiveMovie]);
  return (
    <div className="container">
      <Button onClick={() => history.push("/")} color="primary">
        Go Back
      </Button>
      {movie && (
        <>
          <h1>All information about the film</h1>
          <ul className={css.wrapper}>
            <li className="item">
              <span className={`item ${css.span}`}>Title: </span>
              {movie?.title}
            </li>
            <li className="item">
              <span className={`item ${css.span}`}>Release Year: </span>
              {movie?.year}
            </li>
            <li className="item">
              <span className={`item ${css.span}`}>Format: </span>
              {movie?.format}
            </li>
            <li className="item">
              <p className={`item ${css.span}`}>stars: </p>
              <ul>
                {movie?.stars.map((el, i) => (
                  <li className="item" key={i}>
                    {el}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <Button
            onClick={() => deleteMovieWithId(movie._id, history)}
            variant="contained"
            color="secondary"
          >
            DELETE
          </Button>
        </>
      )}
    </div>
  );
};

const MSTP = ({ moviesInfo }) => ({ movie: moviesInfo.activeMovie });
const MDTP = { getMovieWithId, deleteMovieWithId, clearActiveMovie };

export default connect(MSTP, MDTP)(MoiveInfo);

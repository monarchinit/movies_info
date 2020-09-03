import {
  fetchStart,
  fetchError,
  getMoviesSuccess,
  getMovieWithIdSuccess,
  deleteMovieWithIdSuccess,
  addMovieSuccess,
  addMoviesSuccess,
} from "./actionCreator";
import {
  getAllMoviesApi,
  getMovieWithIdApi,
  deleteMovieWithIdApi,
  addMovieApi,
} from "../services/services";

export const getAllMovies = () => async (dispatch, getState) => {
  dispatch(fetchStart());
  try {
    const response = await getAllMoviesApi();
    dispatch(getMoviesSuccess(response));
  } catch (error) {
    dispatch(fetchError(error.message));
    console.log(error);
    // throw new Error(error);
  }
};

export const getMovieWithId = (id) => async (dispatch, getState) => {
  dispatch(fetchStart());
  try {
    const response = await getMovieWithIdApi(id);
    dispatch(getMovieWithIdSuccess(response));
  } catch (error) {
    dispatch(fetchError(error.message));
    console.log(error);
    // throw new Error(error);
  }
};

export const deleteMovieWithId = (id, history) => async (
  dispatch,
  getState
) => {
  dispatch(fetchStart());
  try {
    const response = await deleteMovieWithIdApi(id);
    if (response.result) {
      dispatch(deleteMovieWithIdSuccess(id));
      history.push("/");
    } else {
      dispatch(fetchError(response.message));
    }
  } catch (error) {
    dispatch(fetchError(error.message));
    console.log(error);
    // throw new Error(error);
  }
};

export const addMovie = (movie, setAddModalOpen) => async (
  dispatch,
  getState
) => {
  dispatch(fetchStart());
  try {
    const response = await addMovieApi(movie);
    console.log(response, "response");
    if (response.result) {
      if (response.movie.length) {
        dispatch(addMoviesSuccess(response.movie));
      } else {
        dispatch(addMovieSuccess(response.movie));
      }
    } else {
      dispatch(fetchError(response.message));
    }
    setAddModalOpen(false);
  } catch (error) {
    setAddModalOpen(false);
    dispatch(fetchError(error.message));
    console.log(error);
    // throw new Error(error);
  }
};

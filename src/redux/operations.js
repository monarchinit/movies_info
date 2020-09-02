import { fetchStart, fetchError, getMoviesSuccess } from "./actionCreator";
import { getAllMoviesApi } from "../services/services";

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

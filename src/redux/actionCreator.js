import Type from "./types";

export const fetchStart = () => ({
  type: Type.FETCH_START,
});

export const fetchError = (error) => ({
  type: Type.FETCH_ERROR,
  payload: { error },
});

export const getMoviesSuccess = (movies) => ({
  type: Type.GET_MOVIES_SUCCESS,
  payload: { movies },
});

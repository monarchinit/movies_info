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

export const getMovieWithIdSuccess = (movie) => ({
  type: Type.GET_MOVIE_SUCCESS,
  payload: { movie },
});

export const deleteMovieWithIdSuccess = (id) => ({
  type: Type.DELETE_MOVIE_SUCCESS,
  payload: { id },
});

export const clearError = () => ({
  type: Type.CLEAR_ERROR,
});

export const addMovieSuccess = (movie) => ({
  type: Type.POST_MOVIE_SUCCESS,
  payload: { movie },
});
export const addMoviesSuccess = (movie) => ({
  type: Type.POST_MOVIES_SUCCESS,
  payload: { movie },
});
export const clearActiveMovie = () => ({
  type: Type.CLEAR_ACTIVE_MOVIE,
});

export const setSearch = (search) => ({
  type: Type.SET_SEARCH,
  payload: { search },
});
export const setSearchFilter = (search) => ({
  type: Type.SET_SEARCH_FILTER,
  payload: { search },
});

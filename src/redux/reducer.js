import { combineReducers } from "redux";
import Type from "./types";

const movies = (state = [], { type, payload }) => {
  switch (type) {
    case Type.POST_MOVIE_SUCCESS:
      return [...state, payload.movie];
    case Type.POST_MOVIES_SUCCESS:
      return [...state, ...payload.movie];
    case Type.GET_MOVIES_SUCCESS:
      return payload.movies;
    case Type.DELETE_MOVIE_SUCCESS:
      return state.filter((el) => payload.id !== el._id);
    default:
      return state;
  }
};

const movie = (state = null, { type, payload }) => {
  switch (type) {
    case Type.GET_MOVIE_SUCCESS:
      return payload.movie;
    case Type.CLEAR_ACTIVE_MOVIE:
    case Type.DELETE_MOVIE_SUCCESS:
      return null;
    default:
      return state;
  }
};

const isLoading = (state = false, { type, payload }) => {
  switch (type) {
    case Type.FETCH_START:
      return (state = true);
    case Type.POST_MOVIES_SUCCESS:
    case Type.GET_MOVIES_SUCCESS:
    case Type.GET_MOVIE_SUCCESS:
    case Type.FETCH_ERROR:
    case Type.POST_MOVIE_SUCCESS:
    case Type.DELETE_MOVIE_SUCCESS:
      return (state = false);
    default:
      return state;
  }
};

const error = (state = "", { type, payload }) => {
  switch (type) {
    case Type.FETCH_ERROR:
      return payload.error;
    case Type.CLEAR_ERROR:
    case Type.FETCH_START:
      return (state = "");
    default:
      return state;
  }
};

const search = (state = "", { type, payload }) => {
  switch (type) {
    case Type.SET_SEARCH:
      return payload.search;
    default:
      return state;
  }
};

const searchFilter = (state = "title", { type, payload }) => {
  switch (type) {
    case Type.SET_SEARCH_FILTER:
      return payload.search;
    default:
      return state;
  }
};

export default combineReducers({
  movies,
  activeMovie: movie,
  isLoading,
  error,
  search,
  searchFilter,
});

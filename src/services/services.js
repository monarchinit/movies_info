import axios from "axios";

axios.defaults.baseURL = "https://fierce-river-00895.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";

export const getAllMoviesApi = async () => {
  try {
    const { data } = await axios.get("/movies");
    return data.movies;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getMovieWithIdApi = async (id) => {
  try {
    const { data } = await axios.get(`/movies/${id}`);
    return data.movie;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const deleteMovieWithIdApi = async (id) => {
  try {
    const { data } = await axios.delete(`/movies/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const addMovieApi = async (movie) => {
  try {
    const { data } = await axios.post(
      `/movies`,
      !movie.length
        ? {
            ...movie,
          }
        : [...movie]
    );
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

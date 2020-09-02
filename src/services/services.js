import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";
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

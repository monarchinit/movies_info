import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import DashboardPage from "../pages/DashboardPage";
import MoviePage from "../pages/MoviePage";
import Header from "./header/Header";
import { getAllMovies } from "../redux/operations";
import LoaderComponent from "./loader/LoaderComponent";
import ErrorComponent from "./errorComponent/ErrorComponent";
import AddButton from "./addButton/AddButton";
import AddMovieModal from "./addMovieModal/AddMovieModal";

function App({ getAllMovies, isLoading, error }) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  useEffect(() => {
    getAllMovies();
  }, [getAllMovies]);
  return (
    <div className="appContainer">
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={DashboardPage} />
          <Route path="/:id" component={MoviePage} />
          <Redirect to="/" />
        </Switch>
        <AddButton
          large
          clickCallback={(e) => setAddModalOpen(true)}
        ></AddButton>
      </main>
      {addModalOpen && (
        <AddMovieModal setAddModalOpen={setAddModalOpen}></AddMovieModal>
      )}
      {isLoading && <LoaderComponent></LoaderComponent>}
      {error && <ErrorComponent error={error}></ErrorComponent>}
    </div>
  );
}

const MSTP = ({ moviesInfo }) => ({
  isLoading: moviesInfo.isLoading,
  error: moviesInfo.error,
});
const MDTP = (dispatch) => ({
  getAllMovies: () => dispatch(getAllMovies()),
});

export default connect(MSTP, MDTP)(App);

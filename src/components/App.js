import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import MoviePage from "../pages/MoviePage";
import Header from "./header/Header";
import { getAllMovies } from "../redux/operations";

function App({ getAllMovies }) {
  // useEffect(() => {
  //   getAllMovies().then((data) => console.log(data));
  // }, [getAllMovies]);
  return (
    <div className="appContainer">
      <Header />
      <main>
        <Link to="/">Home</Link>
        <Link to="/MoviePage">MoviePage</Link>
        <Switch>
          <Route exact path="/" component={DashboardPage} />
          <Route path="/:id" component={MoviePage} />
          <Redirect to="/" />
        </Switch>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

const MSTP = (state) => ({ state });
const MDTP = (dispatch) => ({
  getAllMovies: () => dispatch(getAllMovies()),
});

export default connect(MSTP, MDTP)(App);

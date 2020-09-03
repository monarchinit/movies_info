import React from "react";
import { NavLink } from "react-router-dom";

const MainItems = ({ renderMovies }) => (
  <ul>
    {renderMovies?.map((el) => (
      <li className="item" key={el._id}>
        <NavLink to={`/${el._id}`}>{el.title}</NavLink>
      </li>
    ))}
  </ul>
);

export default MainItems;

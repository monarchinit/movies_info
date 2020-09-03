import React, { useState } from "react";
import { Button, Select, TextField, InputLabel } from "@material-ui/core";
import css from "./AddMovieModal.module.css";
import AddButton from "../addButton/AddButton";
import { getFormData } from "../../helpers/helpers";
import { connect } from "react-redux";
import { addMovie } from "../../redux/operations";
import mammoth from "mammoth";

const AddMovieModal = ({ setAddModalOpen, addMovie }) => {
  const [docTab, setDocTab] = useState(false);
  const [idStars, setIdStars] = useState(getArrayStars());
  function getArrayStars() {
    return [
      <div className={css.starWrapper}>
        <AddButton
          clickCallback={() => setIdStars((s) => [...s, getArrayStars()[0]])}
        ></AddButton>
        <TextField style={{ flex: "auto" }} required id="star" label="Star" />
      </div>,
    ];
  }

  const onHandleSubmit = (e) => {
    e.preventDefault();
    const result = getFormData(e.target);
    addMovie(result, setAddModalOpen);
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    const file = e.target.file.files[0];
    let reader = new FileReader();
    reader.onload = function () {
      const data = reader.result;
      let arrMovies = [{}];
      mammoth
        .convertToHtml({ arrayBuffer: data })
        .then(function (result) {
          var html = result.value; // The generated HTML
          const movies = html
            .split("<p>")
            .join("")
            .split("</p>")
            .map((e) => {
              const el = e.split(":");
              if (el[0] in arrMovies[arrMovies.length - 1]) {
                arrMovies.push({});
              }
              const obj = arrMovies[arrMovies.length - 1];
              obj[el[0]] = el[1];
              if (el[2]) {
                obj[el[0]] = obj[el[0]] + el[2];
              }
              return obj;
            });
          const redMovies = arrMovies
            .map(function (e) {
              if (!e.Title) {
                return undefined;
              }
              return {
                title: e["Title"].trim(),
                year: e["Release Year"].trim(),
                format: e["Format"].trim(),
                stars: e["Stars"].split(", "),
              };
            })
            .filter((e) => !!e?.title);
          addMovie(redMovies, setAddModalOpen);
        })
        .done();
    };
    await reader.readAsArrayBuffer(file);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target?.className === "containerModal") {
          setAddModalOpen(false);
        }
      }}
      className="containerModal"
    >
      <div className="wrapperModal">
        <h2>You can add a movie or DOCUMENT with movies here!</h2>
        <div>
          <span
            className={css.tabs}
            style={{ color: docTab ? "gray" : "black" }}
            onClick={() => setDocTab(false)}
          >
            movie
          </span>
          <span> / </span>
          <span
            className={css.tabs}
            style={{ color: !docTab ? "gray" : "black" }}
            onClick={() => setDocTab(true)}
          >
            upload document
          </span>
        </div>
        {!docTab ? (
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={onHandleSubmit}
          >
            <TextField required id="title" label="Title" />
            <TextField type="number" required id="year" label="Release Year" />
            <div style={{ marginBottom: "10px" }}></div>
            <InputLabel htmlFor="format">Format</InputLabel>
            <Select
              native
              required
              inputProps={{
                name: "format",
                id: "format",
              }}
            >
              <option aria-label="None" value="" />
              <option value="DVD">DVD</option>
              <option value="VHS">VHS</option>
              <option value="Blu-Ray">Blu-Ray</option>
            </Select>

            {idStars.map((e, i) => (
              <div key={i}>{e}</div>
            ))}
            <div className={css.wrapperButton}>
              <Button
                variant="contained"
                onClick={() => setAddModalOpen(false)}
                color="secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={() => {}}
                color="primary"
              >
                Add
              </Button>
            </div>
          </form>
        ) : (
          <div>
            <form onSubmit={handleSubmitFile}>
              <TextField type="file" required id="file" label="File" />
              <div className={css.wrapperButton}>
                <Button
                  variant="contained"
                  onClick={() => setAddModalOpen(false)}
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => {}}
                  color="primary"
                >
                  Add
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const MDTP = { addMovie };

export default connect(null, MDTP)(AddMovieModal);

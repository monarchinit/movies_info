import React, { useState } from "react";
import {
  Button,
  Select,
  TextField,
  InputLabel,
  withStyles,
} from "@material-ui/core";
import Modal from "../modal/Modal";
import css from "./AddMovieModal.module.css";
import AddButton from "../addButton/AddButton";
import {
  getFormData,
  getReadyForReguestMovies,
  agregateTextFromDoc,
} from "../../helpers/helpers";
import { connect } from "react-redux";
import { addMovie } from "../../redux/operations";
import mammoth from "mammoth";
import Tips from "../tips/Tips";

const ValidationTextField = withStyles({
  root: {
    marginBottom: "10px",
    "& input:invalid:focus + fieldset": {
      borderColor: "red",
    },
  },
})(TextField);

const ValidationSelectField = withStyles({
  root: {
    "& input:invalid:focus ~ fieldset": {
      borderColor: "red",
    },
  },
})(Select);

const AddMovieModal = ({ setAddModalOpen, addMovie }) => {
  const [docTab, setDocTab] = useState(false);
  const [idStars, setIdStars] = useState(getArrayStars());
  function getArrayStars() {
    return [
      <div className={css.starWrapper}>
        <AddButton
          clickCallback={() => setIdStars((s) => [...s, getArrayStars()[0]])}
        ></AddButton>
        <ValidationTextField
          type="text"
          inputProps={{ pattern: "^[A-Za-zА-Яа-яЁё ]*$" }}
          style={{ flex: "auto" }}
          required
          variant="outlined"
          id="star"
          label="Star"
          className={css.formItem}
        />
        <Tips>
          <div className="tooltip">
            <h2 className="popper">The "Star" field should only be letters!</h2>
          </div>
        </Tips>
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
    if (file.type === "text/plain") {
      let arrMovies = [{}];
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function (e) {
        agregateTextFromDoc(reader.result.split("\n"), arrMovies);

        addMovie(getReadyForReguestMovies(arrMovies), setAddModalOpen);
      };
    } else {
      let reader = new FileReader();
      reader.onload = function () {
        const data = reader.result;
        let arrMovies = [{}];
        mammoth
          .convertToHtml({ arrayBuffer: data })
          .then(function (result) {
            var html = result.value;
            agregateTextFromDoc(
              html.split("<p>").join("").split("</p>"),
              arrMovies
            );

            addMovie(getReadyForReguestMovies(arrMovies), setAddModalOpen);
          })
          .done();
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <Modal
      onHandleClick={(e) => {
        if (e.target?.dataset?.container === "modal") {
          setAddModalOpen(false);
        }
      }}
    >
      <h2 className={css.title}>
        You can add a movie or DOCUMENT with movies here!
      </h2>
      <div className={css.tabsWrapper}>
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
          <ValidationTextField
            error={false}
            required
            variant="outlined"
            id="title"
            label="Title"
            className={css.formItem}
          />
          <ValidationTextField
            type="number"
            inputProps={{ max: "2021", min: "1895" }}
            required
            variant="outlined"
            id="year"
            label="Release Year"
            className={css.formItem}
          />
          <InputLabel htmlFor="format">Format</InputLabel>
          <ValidationSelectField
            native
            required
            variant="outlined"
            size="small"
            inputProps={{
              name: "format",
              id: "format",
            }}
            className={css.formItem}
          >
            <option value="DVD">DVD</option>
            <option value="VHS">VHS</option>
            <option value="Blu-Ray">Blu-Ray</option>
          </ValidationSelectField>

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
    </Modal>
  );
};

const MDTP = { addMovie };

export default connect(null, MDTP)(AddMovieModal);

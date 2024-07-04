import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CartNote from "./Card";
import { noteContext } from "./contenxt/Context";

export default function Home() {
  const [show, setShow] = useState(false);
  const [Note, SetNote] = useState(null);
  const [id, setId] = useState("");

  const { setNotesContext, setCounter, conuter } = useContext(noteContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function addNote(values) {
    const option = {
      url: "https://note-sigma-black.vercel.app/api/v1/notes",
      method: "POST",
      data: values,
      headers: {
        token: `3b8ny__${localStorage.getItem("token")}`,
      },
    };
    let { data } = await axios.request(option);
    handleClose();
    SetNote();
  }

  async function getNote() {
    const option = {
      url: "https://note-sigma-black.vercel.app/api/v1/notes",
      method: "GET",
      headers: {
        token: `3b8ny__${localStorage.getItem("token")}`,
      },
    };
    let { data } = await axios.request(option);
    SetNote(data.notes);
    setNotesContext(data.notes);
    setId(data.notes._id);
    setCounter(data.notes.length);
    console.log(data.notes);
  }
  async function updateNote() {
    const option = {
      method: "PUT",
      url: `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      headers: {
        token: `3b8ny__${localStorage.getItem("token")}`,
      },
    };
    let { data } = await axios.request(option);
    console.log(data);
  }

  useEffect(() => {
    getNote();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: addNote,
  });

  return (
    <>
      <button
        className="btn btn-primary text-white d-block ms-auto m-2  "
        variant="primary"
        onClick={handleShow}
      >
        Add Note
      </button>
      <h1 className="mx-2">Notes</h1>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              type="text"
              placeholder="Tittle"
              className="form-control mb-2"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <textarea
              name="content"
              placeholder="Content"
              className="form-control"
              value={formik.values.content}
              onChange={formik.handleChange}
            ></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row  ">
        {Note?.map((note) => {
          return (
            <CartNote note={note} setNote={SetNote} updateNote={updateNote} />
          );
        })}
      </div>
      <div className="mt-5 text-end">
        Notes number :<span className="text-primary">{conuter}</span>
      </div>
    </>
  );
}

import axios from "axios";
import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import { noteContext } from "./contenxt/Context";

export default function CartNote({ note, updateNote }) {
  const { setNotesContext, conuter } = useContext(noteContext);
  const { content, title, _id } = note;
  async function deleteNote() {
    const option = {
      url: `https://note-sigma-black.vercel.app/api/v1/notes/${_id}`,
      method: "DELETE",
      headers: {
        token: `3b8ny__${localStorage.getItem("token")}`,
      },
    };
    let { data } = await axios.request(option);
    console.log(data);
    setNotesContext();
  }

  return (
    <>
      <div className="p-1 col-md-4 ">
        <Card className="">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{content}</Card.Text>
            <Card.Link
              onClick={deleteNote}
              className="decoration cursor  text-danger cursor "
            >
              <i class="fa-solid fa-trash"></i> DELETE
            </Card.Link>
            <Card.Link
              onClick={updateNote}
              className="decoration cursor text-primary"
            >
              <i class="fa-solid fa-pen-to-square"></i> Update
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

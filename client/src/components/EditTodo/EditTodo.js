import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const EditTodo = (props) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  //   function afterOpenModal() {
  //     // references are now sync'd and can be accessed.
  //     subtitle.style.color = "#f00";
  //   }
  const [updated, setUpdated] = useState(props.previous.description);

  async function closeModal(e) {
    e.preventDefault();
    console.log(updated);
    const data = { description: updated };
    console.log(JSON.stringify(data));
    fetch(`http://localhost:5000/todos/${props.previous.todo_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // fetch(`http://localhost:5000/todos`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });

    setIsOpen(false);
  }

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   const data = { updated };
  //   await fetch(`http://localhost:5000/todos/${props.previous.todo_id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   });
  // };
  const cancelHandler = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="btn btn-primary">
        Edit
      </button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}

        <div>Edit the Text</div>
        <form>
          <input
            type="text"
            value={updated}
            className="form-control mt-1 mb-1"
            onChange={(dt) => setUpdated(dt.target.value)}
          />
          <button
            type="submit"
            onClick={(e) => closeModal(e)}
            className="btn btn-primary me-1"
          >
            Update
          </button>
          <button onClick={cancelHandler} className="btn btn-danger">
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default EditTodo;

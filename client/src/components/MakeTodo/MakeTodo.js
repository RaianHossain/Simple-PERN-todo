import React, { useEffect, useState } from "react";

const MakeTodo = (porps) => {
  const [description, setDescription] = useState("");
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    try {
      const data = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // console.log(response);
      setDescription("");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <h1 className="text-center m-5">Make A Todo</h1>
      <form className="d-flex" onSubmit={onSubmitHandle}>
        <input
          type="text"
          className="form-control"
          placeholder="Type your todo"
          value={description}
          onChange={(dt) => setDescription(dt.target.value)}
        />
        <button type="submit" className="btn btn-success">
          Add
        </button>
      </form>
    </div>
  );
};

export default MakeTodo;

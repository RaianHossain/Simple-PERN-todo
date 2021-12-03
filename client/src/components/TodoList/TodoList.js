import React, { useEffect, useState } from "react";
import EditTodo from "../EditTodo/EditTodo";

const TodoList = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((dt) => setData(dt));
  }, [data]);

  const deleteHanlder = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res));
  };
  return (
    <div className="m-5">
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dt) => (
            <tr key={dt.todo_id}>
              <td>{dt.description}</td>
              <td>
                <EditTodo previous={dt} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteHanlder(dt.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;

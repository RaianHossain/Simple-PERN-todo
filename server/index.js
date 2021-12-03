const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//building apis
//creating an todo

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos(description)VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//get all the todos
app.get("/todos", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM todos");
    res.json(data.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get a certain value from the database
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query(
      "SELECT description FROM todos WHERE todo_id=($1)",
      [id]
    );
    res.json(data.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const update = await pool.query(
      "UPDATE todos SET description=$1 WHERE todo_id=($2)",
      [description, id]
    );
    res.json("Updated successfully");
  } catch (err) {
    console.log(err.message);
  }
});

//delete a row from the database
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const del = await pool.query("DELETE FROM todos WHERE todo_id=$1", [id]);
  res.json("Successfully deleted");
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});

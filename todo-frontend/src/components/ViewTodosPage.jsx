import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Tooltip,
} from "@mui/material";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";
import EditTodoForm from "./EditTodoForm";
import { useHistory } from "react-router-dom";

function ViewTodo() {
  const [todos, setTodos] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const history = useHistory();
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          setUserEmail(decodedToken.email);
        } else {
          history.push("/login");
        }
        const response = await axios.get(`${apiUrl}/todos`, {
          headers: { "x-auth-token": token },
        });
        if (response.data.length === 0) {
          setError("No todos found.");
        } else {
          setTodos(response.data);
        }
      } catch (error) {
        console.error("Error fetching todos:", error.response.data);
        setError("Error fetching todos. Please try again later.");
      }
    };

    fetchTodos();
  }, [apiUrl]);

  const handleDeleteTodo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiUrl}/todos/${id}`, {
        headers: { "x-auth-token": token },
      });
      // Remove the deleted todo from the todos state
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error.response.data);
      setError("Error deleting todo. Please try again later.");
    }
  };

  const handleEditClick = (id) => {
    setEditingId(id); // Set the editingId state to the ID of the todo being edited
    setEditFormOpen(true);
  };

  const handleSaveTodo = async () => {
    try {
      // Refetch todos after saving
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/todos`, {
        headers: { "x-auth-token": token },
      });
      if (response.data.length === 0) {
        setError("No todos found.");
      } else {
        setTodos(response.data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error.response.data);
      setError("Error fetching todos. Please try again later.");
    }
  };

  const isTaskExpired = (dueDate) => {
    const today = new Date();
    const taskDueDate = new Date(dueDate);
    return taskDueDate < today;
  };

  return (
    <div>
      <Navbar userEmail={userEmail} />
      <br />
      <br />
      <Container maxWidth="md">
        {error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Title</b>
                  </TableCell>
                  <TableCell>
                    <b>Description</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                  <TableCell>
                    <b>Due Date</b>
                  </TableCell>
                  <TableCell>
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((todo) => (
                  <TableRow
                    key={todo._id}
                    style={{
                      backgroundColor:
                        todo.status === "DONE"
                          ? "rgba(0, 255, 0, 0.2)"
                          : isTaskExpired(todo.dueDate)
                          ? "rgba(255, 0, 0, 0.2)"
                          : "",
                    }}
                  >
                    <TableCell>{todo.title}</TableCell>
                    <TableCell>{todo.body}</TableCell>
                    <TableCell>{todo.status}</TableCell>
                    <TableCell>
                      {new Date(todo.dueDate).toISOString().split("T")[0]}
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        title={
                          isTaskExpired(todo.dueDate) ? "Expired Task" : ""
                        }
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditClick(todo._id)} // Open edit form dialog
                          style={{ marginRight: "8px" }}
                        >
                          Edit
                        </Button>
                      </Tooltip>
                      <Tooltip
                        title={
                          isTaskExpired(todo.dueDate) ? "Expired Task" : ""
                        }
                      >
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteTodo(todo._id)}
                        >
                          Delete
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
      {/* Render EditTodoForm dialog if editing is triggered */}
      <EditTodoForm
        todo={todos.find((todo) => todo._id === editingId)} // Pass the todo with the corresponding editingId
        open={editFormOpen}
        onClose={() => setEditFormOpen(false)}
        onSave={handleSaveTodo} // Pass handleSaveTodo function as onSave callback
        token={localStorage.getItem("token")} // Pass the token to EditTodoForm
      />
    </div>
  );
}

export default ViewTodo;

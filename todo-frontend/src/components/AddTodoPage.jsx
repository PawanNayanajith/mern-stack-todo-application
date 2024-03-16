import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Snackbar,
} from "@mui/material";
import { Alert } from "@mui/material";
import Navbar from "./Navbar";
import { useHistory } from "react-router-dom";

function AddTodo() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("TODO");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserEmail(decodedToken.email);
    } else {
      history.push("/login");
    }
    // Set default due date as one day plus the current date
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const formattedDate = today.toISOString().split("T")[0];
    setDueDate(formattedDate);
  }, [history]);

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleAddTodo = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${apiUrl}/todos`,
        { title, body, status, dueDate },
        { headers: { "x-auth-token": token } }
      );
      window.location.href = "/view-todos";
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <div>
      <Navbar userEmail={userEmail} />
      <br />
      <br />
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="TODO">To Do</MenuItem>
                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                <MenuItem value="DONE">Done</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddTodo}>
              Add Todo
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddTodo;

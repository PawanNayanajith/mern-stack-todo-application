import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const EditTodoForm = ({
  todo: initialTodo = {},
  open,
  onClose,
  onSave,
  token,
}) => {
  const [editedTodo, setEditedTodo] = useState({ ...initialTodo });
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setEditedTodo({ ...initialTodo });
  }, [initialTodo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo({
      ...editedTodo,
      [name]: value,
    });
  };

  const handleCancel = () => {
    onClose(); // Close the dialog without saving
  };

  const handleSave = async () => {
    try {
      // Ensure the dueDate is in the format "yyyy-MM-dd"
      const formattedTodo = {
        ...editedTodo,
        dueDate: formatDate(editedTodo.dueDate),
      };
      await axios.put(`${apiUrl}/todos/${editedTodo._id}`, formattedTodo, {
        headers: {
          "x-auth-token": token,
        },
      });
      onSave(); // Call the onSave callback without any arguments
      onClose(); // Close the dialog after saving
    } catch (error) {
      setError("Error saving todo. Please try again later.");
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };

  // Function to format date as "yyyy-MM-dd"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!token) {
      // Redirect to login page if token is not present
      history.push("/login");
    }
  }, [token, history]);

  return (
    <div>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="Title"
            value={editedTodo.title || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="body"
            label="Description"
            value={editedTodo.body || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={editedTodo.status || ""}
              onChange={handleChange}
            >
              <MenuItem value="TODO">To Do</MenuItem>
              <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
              <MenuItem value="DONE">Done</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="dueDate"
            label="Due Date"
            type="date"
            value={editedTodo.dueDate ? formatDate(editedTodo.dueDate) : ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={error !== null}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={error}
      />
    </div>
  );
};

export default EditTodoForm;

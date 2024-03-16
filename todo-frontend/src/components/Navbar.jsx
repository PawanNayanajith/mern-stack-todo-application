import React from "react";
import { AppBar, Toolbar, IconButton, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import MenuIcon
import { Link } from "react-router-dom";

export default function Navbar({ userEmail }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome {userEmail}
        </Typography>
        <Button color="inherit" component={Link} to="/landing-page">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/add-todo">
          Add Todo
        </Button>
        <Button color="inherit" component={Link} to="/view-todos">
          View Todos
        </Button>
      </Toolbar>
    </AppBar>
  );
}

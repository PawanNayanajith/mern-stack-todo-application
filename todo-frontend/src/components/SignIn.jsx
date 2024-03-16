import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import {
  TextField,
  Button,
  Snackbar,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/signin",
        { email, password }
      );
      localStorage.setItem("token", response.data);
      // Redirect to landing page after successful login
      history.push("/landing-page");
    } catch (error) {
      console.error("Login error:", error.response.data.message);
      setSnackbarSeverity("error");
      setSnackbarMessage(
        error.response.data.message || "An error occurred during sign-in."
      );
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const headerStyle = {
    color: "#3f51b5", 
    fontWeight: "bold",
    textShadow: "1px 1px 2px #888888", 
    marginBottom: "30px", 
    fontFamily: "Arial, sans-serif", 
  };

  const signInStyle = {
    color: "gray",
    fontStyle: "italic", 
    textShadow: "1px 1px 2px #888888", 
    marginBottom: "20px", 
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card elevation={3}>
          <CardContent>
            <Typography
              variant="h3"
              gutterBottom
              align="center"
              style={headerStyle}
            >
              Todo Application
            </Typography>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              style={signInStyle}
            >
              Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign In
              </Button>
            </form>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "1rem" }}
            >
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={handleSnackbarClose}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </Grid>
  );
}

export default SignIn;

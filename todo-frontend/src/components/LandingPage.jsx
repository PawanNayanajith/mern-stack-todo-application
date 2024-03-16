import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography, Container, Card, CardContent } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Navbar from "./Navbar";
import { useHistory } from "react-router-dom";

function LandingPage() {
  const history = useHistory();
  const [todoCounts, setTodoCounts] = useState({
    TODO: 0,
    IN_PROGRESS: 0,
    DONE: 0,
  });
  const [overdueTasks, setOverdueTasks] = useState(0);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Fetch todo counts from backend API upon component mount
    fetchTodoCounts();
    // Fetch overdue tasks count from backend API
    fetchOverdueTasks();
    // Get user email from token
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserEmail(decodedToken.email);
    } else {
      history.push("/login");
    }
  }, [history]);

  const fetchTodoCounts = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/todos/todoCounts"
      );
      setTodoCounts(response.data.counts);
    } catch (error) {
      console.error("Error fetching todo counts:", error);
      // If an error occurs, set todoCounts to default values
      setTodoCounts({
        TODO: 0,
        IN_PROGRESS: 0,
        DONE: 0,
      });
    }
  };

  const fetchOverdueTasks = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + "/todos/overdueTasks"
      );
      setOverdueTasks(response.data.overdueTasks.length);
    } catch (error) {
      console.error("Error fetching overdue tasks:", error);
      // If an error occurs, set overdueTasks to 0
      setOverdueTasks(0);
    }
  };

  return (
    <div>
      <Navbar userEmail={userEmail} /> 
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {/* Todo Card */}
          <Grid item xs={12} md={6}>
            <Card style={{ backgroundColor: "#3f51b5", color: "white" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  TODO
                </Typography>
                <Typography
                  variant="h3"
                  component="div"
                  style={{ textAlign: "right" }}
                >
                  {todoCounts.TODO || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* In Progress Card */}
          <Grid item xs={12} md={6}>
            <Card style={{ backgroundColor: "#ff9800", color: "white" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  IN PROGRESS
                </Typography>
                <Typography
                  variant="h3"
                  component="div"
                  style={{ textAlign: "right" }}
                >
                  {todoCounts.IN_PROGRESS || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Done Card */}
          <Grid item xs={12} md={6}>
            <Card style={{ backgroundColor: "#4caf50", color: "white" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  DONE
                </Typography>
                <Typography
                  variant="h3"
                  component="div"
                  style={{ textAlign: "right" }}
                >
                  {todoCounts.DONE || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Overdue Tasks Card */}
          <Grid item xs={12} md={6}>
            <Card style={{ backgroundColor: "#f44336", color: "white" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  OVERDUE TASKS
                </Typography>
                <Typography
                  variant="h3"
                  component="div"
                  style={{ textAlign: "right" }}
                >
                  {overdueTasks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default LandingPage;

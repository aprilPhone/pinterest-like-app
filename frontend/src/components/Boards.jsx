import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function Boards() {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = "12345"; // Hardcodeamos el userId
    // Cambiar la URL para que apunte al API Gateway en el puerto 8000
    fetch(`http://localhost:8000/boards/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setBoards(data))
      .catch((error) => console.error("Error fetching boards:", error));
  }, []);

  const handleViewBoard = (boardId) => {
    navigate(`/boards/${boardId}`);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate("/")}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mis Tableros
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {boards.map((board) => (
            <Grid item xs={12} sm={6} md={4} key={board._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{board.name}</Typography>
                  <Typography color="textSecondary">
                    {board.pins.length} pins
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewBoard(board._id)}
                    sx={{ marginTop: 1 }}
                  >
                    Ver Tablero
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

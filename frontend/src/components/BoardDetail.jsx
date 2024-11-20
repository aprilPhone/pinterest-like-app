import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  ImageList,
  ImageListItem,
  IconButton,
  Avatar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BoardDetail() {
  const { boardId } = useParams(); // Obtener el boardId de la URL
  const [board, setBoard] = useState(null); // Estado para el tablero
  const navigate = useNavigate(); // Hook para redirigir

  // Usamos useEffect para cargar los detalles del tablero
  useEffect(() => {
    // Hacer la llamada a la API para obtener los detalles del tablero
    fetch(`http://localhost:8000/boards/${boardId}`)
      .then((response) => response.json())
      .then((data) => setBoard(data))
      .catch((error) => console.error("Error fetching board details:", error));
  }, [boardId]);

  // Si no hay tablero cargado, mostrar un mensaje de carga o un error
  if (!board) {
    return <div>Loading...</div>;
  }

  if (!board.pins) {
    return <div>No hay pins para mostrar</div>;
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate("/boards")}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {board.name}
          </Typography>
          <Avatar sx={{ ml: 2 }} alt="Usuario">
            AF
          </Avatar>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Pins en este tablero
        </Typography>
        <ImageList cols={3}>
          {board.pins.map((pin) => (
            <ImageListItem key={pin._id}>
              <img src={pin.imageUrl} alt={pin.title} loading="lazy" />
              <Box sx={{ textAlign: "center", paddingTop: 1 }}>
                <Typography variant="subtitle2">{pin.title}</Typography>
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}

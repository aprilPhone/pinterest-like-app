import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  ImageList,
  ImageListItem,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export default function Home() {
  const [pins, setPins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Simulamos la carga de pins desde el backend
  useEffect(() => {
    // Aquí deberías hacer una llamada a tu backend para obtener los pins
    fetch("http://localhost:3001/pins")
      .then((response) => response.json())
      .then((data) => setPins(data))
      .catch((error) => console.error("Error fetching pins:", error));
  }, []);

  // Filtrar los pins según el término de búsqueda
  const filteredPins = pins.filter((pin) =>
    pin.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate(); // Hook para redirigir

  const handleAddClick = () => {
    navigate("/new-pin"); // Redirige a la página de nuevo pin
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mis Pins
          </Typography>
          <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mr: 2 }}
          />
          <IconButton color="inherit" onClick={handleAddClick}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 2 }}>
        <ImageList cols={3}>
          {filteredPins.map((pin) => (
            <ImageListItem key={pin._id}>
              <img src={pin.imageUrl} alt={pin.title} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  );
}

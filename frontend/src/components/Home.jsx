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
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export default function Home() {
  const [pins, setPins] = useState([]);
  const [boards, setBoards] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // Base URL del API Gateway
  const apiGatewayUrl = "http://localhost:8000";

  // Carga de pins desde el API Gateway
  useEffect(() => {
    fetch(`${apiGatewayUrl}/pins`)
      .then((response) => response.json())
      .then((data) => setPins(data))
      .catch((error) => console.error("Error fetching pins:", error));
  }, []);

  // Carga de boards desde el API Gateway
  useEffect(() => {
    fetch(`${apiGatewayUrl}/boards/user/12345`)
      .then((response) => response.json())
      .then((data) => setBoards(data))
      .catch((error) => console.error("Error fetching boards:", error));
  }, []);

  const filteredPins = pins.filter((pin) =>
    pin.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    navigate("/new-pin");
  };

  const handleOpenMenu = (event, pin) => {
    setAnchorEl(event.currentTarget);
    setSelectedPin(pin);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedPin(null);
  };

  const handleSaveToBoard = (boardId) => {
    if (!selectedPin) return;

    fetch(`${apiGatewayUrl}/boards/${boardId}/add-pin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pinId: selectedPin._id }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Pin guardado en el tablero con éxito.");
        } else {
          alert("Error al guardar el pin en el tablero.");
        }
      })
      .catch((error) => console.error("Error saving pin to board:", error))
      .finally(() => handleCloseMenu());
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
          <Button
            color="inherit"
            onClick={() => navigate("/boards")}
            sx={{ mr: 2 }}
          >
            Tableros
          </Button>
          <IconButton color="inherit" onClick={handleAddClick}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 2 }}>
        <ImageList cols={4}>
          {filteredPins.map((pin) => (
            <ImageListItem key={pin._id}>
              <img src={pin.imageUrl} alt={pin.title} loading="lazy" />
              <Button
                variant="outlined"
                onClick={(e) => handleOpenMenu(e, pin)}
                sx={{ marginTop: 1 }}
              >
                Guardar en tablero
              </Button>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {boards.map((board) => (
          <MenuItem
            key={board._id}
            onClick={() => handleSaveToBoard(board._id)}
          >
            {board.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

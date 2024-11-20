import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function PinForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  // Maneja el cambio de la imagen y muestra la previsualización
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Manejador de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("title", title);
    formData.append("description", description);

    fetch("http://localhost:8000/pins", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then(() => {
        navigate("/"); // Redirige a la página de inicio
      })
      .catch((error) => {
        console.error("Error al subir el pin:", error);
      });
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <AppBar position="static" sx={{ marginBottom: 2 }}>
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
            Crear Pin
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ padding: 3 }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            backgroundColor: "#fff",
            boxShadow: 3,
            borderRadius: 2,
            padding: 4,
          }}
        >
          <Typography variant="h5" gutterBottom textAlign="center">
            Crear Pin
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Título"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button
              variant="contained"
              component="label"
              sx={{ marginBottom: 2 }}
              fullWidth
            >
              Subir Imagen
              <input type="file" hidden onChange={handleImageChange} />
            </Button>

            {preview && (
              <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                <img
                  src={preview}
                  alt="Previsualización"
                  style={{ maxWidth: "100%", borderRadius: 4 }}
                />
              </Box>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Crear Pin
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

export default function PinForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate(); // Crea una instancia de navigate

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

    // Enviar datos al backend
    const formData = new FormData();
    formData.append("file", image);
    formData.append("title", title);
    formData.append("description", description);

    // Realiza una petición de subida
    fetch("http://localhost:3001/pins", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        // Redirigir a la página de inicio
        navigate("/"); // Redirige a la página de inicio
      })
      .catch((error) => {
        console.error("Error al subir el pin:", error);
      });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Asegura que el contenedor ocupe toda la altura de la pantalla
      sx={{ backgroundColor: "#f5f5f5" }} // O puedes usar otro color de fondo
    >
      <Box className="max-w-md w-full mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
        <Typography variant="h5" className="mb-4">
          Crear Pin
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Título"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4"
          />
          <TextField
            label="Descripción"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4"
          />
          <Button variant="contained" component="label" className="mb-4">
            Subir Imagen
            <input type="file" hidden onChange={handleImageChange} />
          </Button>

          {preview && (
            <Box className="mb-4">
              <img
                src={preview}
                alt="Previsualización"
                className="w-full h-auto"
              />
            </Box>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Crear Pin
          </Button>
        </form>
      </Box>
    </Box>
  );
}

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home"; // Tu componente de inicio
import PinForm from "./components/UploadImageForm"; // Tu formulario para crear un pin

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-pin" element={<PinForm />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home"; // Tu componente de inicio
import PinForm from "./components/UploadImageForm"; // Tu formulario para crear un pin
import BoardDetail from "./components/BoardDetail";
import Boards from "./components/Boards";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-pin" element={<PinForm />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:boardId" element={<BoardDetail />} />
      </Routes>
    </Router>
  );
};

export default App;

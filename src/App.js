import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Vote from "./components/Home/Vote";
import AddCandidate from "./components/Register/AddCandidate";
import Register from "./components/Register/Register";
import SignIn from "./components/Register/SignIn";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/addCandidate" element={<AddCandidate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

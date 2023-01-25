import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Homepage from "./routes/Homepage";
import Footer from "./components/Footer";
import Search from "./routes/Search";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Favourite from "./routes/Favourite";
import AuthService from "./services/auth.service";
import "./styles/style.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <div>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/search"
          element={
            <Search currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <Login currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="/favourite"
          element={
            <Favourite
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

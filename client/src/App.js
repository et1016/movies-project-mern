import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/navigation";
import Homepage from "./routes/homepage";
import Footer from "./components/footer";
import Search from "./routes/search";
import Register from "./routes/register";
import Login from "./routes/login";
import Favourite from "./routes/favourite";
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

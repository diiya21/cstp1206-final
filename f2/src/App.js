import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./Components/Signup";
import Expenses from "./Components/Expenses";
import Login from "./Components/Login";
import "./App.css";
import { UserProvider } from "./UserProvider";
import { useUser } from "./UserProvider";

function App() {
  const user  = useUser();
  console.log(user)
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Expenses />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;

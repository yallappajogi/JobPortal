import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import ProfilePage from "./components/profileForm";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;

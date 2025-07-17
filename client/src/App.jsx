import "./App.css";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { UserContext } from "./context/UserContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState("");

  function setToken(value) {
    setTokenState(value);
    if (value) {
      localStorage.setItem("token", value);
    } else {
      localStorage.removeItem("token");
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

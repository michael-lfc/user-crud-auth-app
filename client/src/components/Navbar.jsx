import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  // const { token, setToken, setUser } = useContext(UserContext);
  const { token, setToken, setUser, user } = useContext(UserContext);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    navigate("/login"); // redirect to login after logout
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <Link to="/" style={styles.link}>UserApp</Link>
      </div>

      <div style={styles.links}>
        {token ? (
          <>
            <Link to="/home" style={styles.link}>Home</Link>
            {/* <Link to="/update/:id" style={styles.link}>Update</Link> */}
            <Link to={`/update/${user?._id}`} style={styles.link}>Update</Link>
            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#333",
    color: "#fff",
  },
  brand: {
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  links: {
    display: "flex",
    gap: "1rem",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  button: {
    background: "#ff4d4d",
    border: "none",
    color: "#fff",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

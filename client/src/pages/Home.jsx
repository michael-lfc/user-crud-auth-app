import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Home() {
  const { token } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Error fetching users:", err));
  }, [token]);

  function handleEdit(id) {
    navigate(`/update/${id}`);
  }

  function handleDelete(id) {
    if (confirm("Are you sure you want to delete this user?")) {
      fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(() => {
          setUsers(prev => prev.filter(u => u._id !== id));
        });
    }
  }

  return (
    <div className="user-list">
      <h2>Users</h2>
      {users.map(u => (
        <div className="user-card" key={u._id}>
          <p>{u.name} | {u.email} | Age: {u.age}</p>
          <div>
            <button onClick={() => handleEdit(u._id)}>Edit</button>
            <button onClick={() => handleDelete(u._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

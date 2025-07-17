import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Message from "../components/message"; // ✅ correct path

export default function Register() {
  const { token, setUser } = useContext(UserContext);
  const [form, setForm] = useState({ name: "", email: "", age: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info"); // ✅ for color handling
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      console.log("✅ Success:", data); 
      setMessage("User created successfully!");
      setMessageType("success"); // ✅ green
      setUser(data.user);

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.log("❌ Error:", err.message); 
      setMessage(err.message);
      setMessageType("error"); 
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" onChange={handleChange} placeholder="Name" required />
          <input name="email" onChange={handleChange} placeholder="Email" required type="email" />
          <input name="age" onChange={handleChange} placeholder="Age" required type="number" />
          <input name="password" onChange={handleChange} placeholder="Password" required type="password" />
          <button type="submit">Register</button>
        </form>

        {/* ✅ Colored message
        <Message text={message} type={messageType} /> */}
        {message && (
        <Message text={message} type={message.startsWith("❌") ? "error" : "info"} />
)}

      </div>
    </div>
  );
}

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Message from "../components/message"; // ✅ import Message component

export default function Login() {
  const { setToken, setUser } = useContext(UserContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      setUser(data.user);
      setToken(data.token);
      setMessage(`✅ ${data.message || "Login successful"}`);

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
        type="email"
      />
      <input
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
        type="password"
      />
      <button type="submit">Login</button>
      {/* ✅ Unified message component */}
      {message && (
        <Message text={message} type={message.startsWith("❌") ? "error" : "info"} />
      )}
    </form>
  );
}

import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Message from "../components/message";

export default function UpdateUser() {
  const { user, token, setUser } = useContext(UserContext);
  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) setForm({ name: user.name, email: user.email, age: user.age });
  }, [user]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setUser(data.user);
      setMessage("Updated!");
      setTimeout(() => navigate("/"), 1500); // Redirect to home after 1.5s
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} required />
          <input name="email" value={form.email} onChange={handleChange} required />
          <input name="age" value={form.age} onChange={handleChange} required />
          <button type="submit">Update</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

// import Message from "../components/message"; // ✅ make sure the path is correct

// export default function Register() {
//   const { token, setUser } = useContext(UserContext);
//   const [form, setForm] = useState({ name: "", email: "", age: "", password: "" });
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState("info"); // ✅ for color handling
//   const navigate = useNavigate();

//   function handleChange(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Registration failed");

//       console.log("✅ Success:", data); 
//       setMessage("User created successfully!");
//       setMessageType("success"); // ✅ green
//       setUser(data.user);

//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       console.log("❌ Error:", err.message); 
//       setMessage(err.message);
//       setMessageType("error"); // ✅ red
//     }
//   }

//   return (
//     <div className="container">
//       <div className="card">
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//           <input name="name" onChange={handleChange} placeholder="Name" required />
//           <input name="email" onChange={handleChange} placeholder="Email" required type="email" />
//           <input name="age" onChange={handleChange} placeholder="Age" required type="number" />
//           <input name="password" onChange={handleChange} placeholder="Password" required type="password" />
//           <button type="submit">Register</button>
//         </form>

//         {/* ✅ Colored message */}
//         <Message text={message} type={messageType} />
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import "./Landing.css"; // We'll create this file next

export default function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to User Management App</h1>
        <p>Register or Login to manage users securely and efficiently.</p>
        <div className="landing-buttons">
          <Link to="/register" className="btn primary">Get Started</Link>
          <Link to="/login" className="btn secondary">Login</Link>
        </div>
      </div>
      <div className="landing-image">
        <img src="https://images.unsplash.com/photo-1682695795557-17447f921f79?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Landing" />
      </div>
    </div>
  );
}

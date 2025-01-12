import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginMechanic } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import '../styles/login.css'; 

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginMechanic({ email, password });
      login(response);
      navigate(response.user.role === "admin" ? "/admin" : "/mechanic");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="login-form-container ">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <p> Not have a account .  <Link to='/register'>Register here</Link></p>
        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

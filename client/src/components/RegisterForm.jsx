import { useState } from "react";
import { registerMechanic } from "../api/api";
import '../styles/register.css'; 
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    picture: "",
    level: "Expert",
  });
  const nav = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerMechanic(formData);
      alert("Registration successful!");
      nav('/login')

    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="register-form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            className="form-control"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Level</label>
          <select
            name="level"
            className="form-control"
            value={formData.level}
            onChange={handleChange}
            required
          >
            <option value="Expert">Expert</option>
            <option value="Medium">Medium</option>
            <option value="New Recruit">New Recruit</option>
            <option value="Trainee">Trainee</option>
          </select>
        </div>
        <p> Already have an account .  <Link to='/login'>Login</Link></p>

        <button type="submit" className="btn btn-success mt-3">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;

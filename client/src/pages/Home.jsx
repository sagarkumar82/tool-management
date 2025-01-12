import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <h1>Welcome to the Tools Management System</h1>
      <p>
        <Link to="/login">Login</Link> or <Link to="/register">Register</Link>{" "}
        to get started.
      </p>
    </div>
  );
};

export default Home;

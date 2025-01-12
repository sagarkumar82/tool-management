import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import '../styles/header.css'

const Header = () => {
  const { auth, logout } = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Tools Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
        >
          ☰
        </button>
        <div
          className={`navbar-collapse ${isCollapsed ? "collapsed" : ""}`}
        >
          <ul className="navbar-nav ml-auto">
            {auth ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {auth.user.name}</span>
                </li>
                {auth.user.role === "mechanic" && (
                  <li className="nav-item">
                    <Link to="/get-issued-tool" className="nav-link">
                      Issued Tools
                    </Link>
                  </li>
                )}
                {auth.user.role === "admin" && (
                  <>
                  <li className="nav-item">
                    <Link to="/create-category" className="nav-link">
                      Tool Categories
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin" className="nav-link">
                      Tool 
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/issued-tools" className="nav-link">
                      Issued Tool 
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/all-user" className="nav-link">
                      Mechanics 
                    </Link>
                  </li>
                  </>
                )}
                <li className="nav-item">
                  <Link  className="nav-link" onClick={logout} to='/login'>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

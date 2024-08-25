import React, { useEffect } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import userSvg from "../../assets/user.svg";

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  function logout() {
    auth.signOut();
    navigate("/");
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="navbar">
      <p className="navbar-heading">SaveMate.</p>
      <div className="navbar-links">
        <Link to="/dashboard" className="navbar-link">
          Dashboard
        </Link>
        <Link to="https://loan-interview-game.vercel.app/" className="navbar-link">
          Games
        </Link>
        <Link to="/quiz" className="navbar-link">
          Quiz
        </Link>
      </div>
      {user ? (
        <p className="navbar-link" onClick={logout}>
          <span style={{ marginRight: "1rem" }}>
            <img
              src={user.photoURL ? user.photoURL : userSvg}
              width={user.photoURL ? "32" : "24"}
              style={{ borderRadius: "50%" }}
              alt="User"
            />
          </span>
          Logout
        </p>
      ) : null}
    </div>
  );
}

export default Header;

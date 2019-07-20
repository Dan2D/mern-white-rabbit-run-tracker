import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/authActions";
import PropTypes from "prop-types";
import rabbitLogo from "../../images/white-rabbit-logo.png";
import "./Nav.css";

function Nav(props) {
  const [menuToggle, setMenuToggle] = useState(false);
  Nav.propTypes = {
    logOut: PropTypes.func.isRequired
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    setInterval(() => { document.documentElement.style.setProperty("--nav-link-color", "#009975");}, 100)
    
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 768 && document.querySelector(".navBar__menu--spread")) {
      document.querySelector(".navBar button").style.display = "block";
      document.querySelector(".navBar__menu--spread").className = "navBar__menu closed";
    }
    if (window.innerWidth > 768 && document.querySelector(".navBar__menu")) {
      document.querySelector(".navBar button").style.display = "none";
      document.querySelector(".navBar__menu").className = "navBar__menu--spread";
    }
  };
  return (
    <div className="navBar-container absolute-top">
      <div className="navBar">
        <div className="navBar-title">
          <h2 className="navBar-title__title">White Rabbit</h2>
          <img className="navBar-title__logo" src={rabbitLogo} alt="white rabbit logo" />
        </div>
        <button onClick={() => setMenuToggle(!menuToggle)} onBlur={() => setMenuToggle(false)}>
          &#9776;
        </button>
        <div className={menuToggle ? "navBar__menu open" : "navBar__menu closed"}>
          <ul>
            <li>
              <NavLink to="/" exact name="home" activeClassName="link-active link-home">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/stats" name="stats" activeClassName="link-active link-stats">
                Stats
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings" name="settings" activeClassName="link-active link-settings">
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="/login">
                <button className="link log-out" onClick={props.logOut}>
                  Log Out
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default connect(
  null,
  { logOut }
)(Nav);

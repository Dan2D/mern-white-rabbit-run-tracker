import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/authActions";
import PropTypes from "prop-types";
import rabbitLogo from "../../images/white-rabbit-logo.png";
import "./Nav.css";

function Nav(props) {
  const [menuToggle, setMenuToggle] = useState(false);
  const [menuBtn, setMenuBtn] = useState("home");
  Nav.propTypes = {
    logOut: PropTypes.func.isRequired
  };
  useEffect(() => {

    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 768 && document.querySelector(".navBar__menu--spread")) {
      document.querySelector(".navBar button").style.display = "block";
      document.querySelector(".navBar__menu--spread").className = "navBar__menu closed";
    }
    if (window.innerWidth > 768 && document.querySelector(".navBar__menu")) {
      document.querySelector(".navBar button").style.display = "none";
      document.querySelector(".navBar__menu").className = "navBar__menu--spread";
      document.querySelector('a[data-ref="home"]').click();
    }
  };

  const handleMenuClick = (e) => {
    setMenuBtn(e.target.name);
    let color = e.target.name === "home" ? "#009975" : e.target.name === "stats" ? "#58b368" : "#363B48";
    document.documentElement.style.setProperty("--nav-link-color", color);
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
              <Link to="/" name="home" data-ref="home" onClick={(e) => handleMenuClick(e)} className={menuBtn === "home" ? "link-active" : null}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/stats" name="stats" data-ref="stats" onClick={(e) => handleMenuClick(e)} className={menuBtn === "stats" ? "link-active" : null}>
                Stats
              </Link>
            </li>
            <li>
              <Link to="/settings" name="settings" data-ref="settings" onClick={(e) => handleMenuClick(e)} className={menuBtn === "settings" ? "link-active" : null}>
                Settings
              </Link>
            </li>
            <li>
              <Link to="/login">
                <button className="link log-out" onClick={props.logOut}>
                  Log Out
                </button>
              </Link>
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

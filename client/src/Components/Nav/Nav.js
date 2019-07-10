import React, { useState } from "react";
import { Link } from "react-router-dom";
import rabbitLogo from "../../images/white-rabbit-logo.png";
import "./Nav.css";

function Nav() {
  const [menuToggle, setMenuToggle] = useState(false);
  console.log(menuToggle);
  return (
    <div className="navBar-container fixed-top">
      <div className="navBar">
        <div className="navBar-title">
          <h2 className="navBar-title__title">White Rabbit</h2>
          <img
            className="navBar-title__logo"
            src={rabbitLogo}
            alt="white rabbit logo"
          />
        </div>
        <button
          onClick={() => setMenuToggle(!menuToggle)}
          onBlur={() => setMenuToggle(false)}
        >
          &#9776;
        </button>
        <div
          className={menuToggle ? "navBar__menu open" : "navBar__menu closed"}
        >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stats">Stats</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/log">Log Out</Link>
            </li>
            <li>
              <Link to="/add/goal">
                <button className="add-goal">+ Add Goal</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Nav;

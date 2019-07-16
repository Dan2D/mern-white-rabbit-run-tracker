import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {userLogin} from '../../store/actions/authActions'
import PropTypes from 'prop-types';
import wrabbit from "../../images/white-rabbit-logo.png";
import "./Log.css";


class Login extends Component {
  state = {
    username: "",
    password: "",
    msg: null
  };

  static propTypes = {
    userLogin: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps) {
    const {error} = this.props;
    if (prevProps.error !== error){
      if (error.id === 'LOGIN_FAIL'){
        this.setState({msg: error.msg})
      }
      return
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {username, password} = this.state;
    const user = {
      username,
      password
    }
    this.props.userLogin(user);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="userLog-container">
        <div className="log-container">
          <div className="d-flex align-items-baseline">
            <h1>White Rabbit</h1>
            <img src={wrabbit} alt="white-rabbit-logo" />
          </div>
          <div className="log-form">
            <p className="error-msg">{this.state.msg}</p>
            <label>Username</label>
            <input className="form-control" type="text" required name="username" onChange={(e) => this.onChange(e)}/>
            <br />
            <label>Password</label>
            <input className="form-control" type="password" required name="password" onChange={(e) => this.onChange(e)}/>
            <div className="log-btn-container d-flex justify-content-center mt-3">
              <button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Log In</button>
              <Link to="/register">
                <button className="btn btn-link">Register</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
  };
};

export default connect(mapStateToProps, {userLogin})(Login);

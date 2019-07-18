import React, { Component } from "react";
import wrabbit from "../../images/white-rabbit-logo.png";
import {register} from '../../store/actions/authActions';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import "./Log.css";

class Register extends Component {
  state={
    email: "",
    username: "",
    password: "",
    msg: null,
    emailMsg: null,
    userMsg: null,
    passwordMsg: null
  }

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps) {
    this.setState()
    const {error} = this.props;
    if (prevProps.error !== error){
      if (error.id === 'REGISTER_FAIL'){
        this.setState({msg: error.msg})
      }
      return
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  validateEmail = (email) => {
    if (!(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi).test(email)){
      this.setState({emailMsg: "Please enter a valid email address"})
      return false;
    }
    return true;
  }

  validateUsername = (username) => {
    console.log("USERNAME")
    if (!(/.{3,12}/gi).test(username)){
      this.setState({userMsg: "Usernames must be between 3 and 12 characters long"})
      return false;
    }
    if (!(/^\w{1,12}$/).test(username)){
      console.log("USERNAME CHAR")
      this.setState({userMsg: "Usernames can only contain alphanumeric characters"})
      return false;
    }
    return true;
  }

  validatePassword = (password) => {
    if (!(/.{8,12}/g).test(password)){
      this.setState({passwordMsg: "Passwords must be between 8 and 12 characters long"})
      return false;
    }
    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{4,}$/g).test(password)){
      this.setState({passwordMsg: "Passwords must include at least one of each of the following: a-z, A-Z, 0-9, (#$^+=!*()@%&)"})
      return false;
    }
    return true
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({emailMsg: null, userMsg: null, passwordMsg: null});
    const {email, username, password} = this.state;
    this.validateEmail(email);
    this.validateUsername(username);
    this.validatePassword(password);
    if (!this.validateEmail(email) || !this.validateUsername(username) || !this.validatePassword(password)){
      return;
    }
    const newUser = {
      email,
      username,
      password
    }
    this.props.register(newUser);
  }

  render() {
    if (this.props.isAuthenticated){
      return <Redirect to="/" />
    }
    return (
      <div className="userLog-container">
        <div className="log-container">
          <div className="d-flex align-items-baseline">
            <h1>White Rabbit</h1>
            <img src={wrabbit} alt="white-rabbit-logo" />
          </div>
          <br/>
          <p className="error-msg">{this.state.msg}</p>
          <div className="log-form">
            <label>Email</label>
            <input className="form-control" type="email" required name="email" value={this.state.email} onChange={(e) => this.onChange(e)} />
            <p className="error-msg">{this.state.emailMsg}</p>
            <br/>
            <label>UserName</label>
            <input className="form-control" type="text" required name="username" value={this.state.username} onChange={(e) => this.onChange(e)} />
            <p className="error-msg">{this.state.userMsg}</p>
            <br />
            <label>Password</label>
            <input className="form-control" type="password" required name="password" value={this.state.password} onChange={(e) => this.onChange(e)}/>
            <p className="error-msg">{this.state.passwordMsg}</p>
            <div className="log-btn-container d-flex justify-content-center mt-3">
                <button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Register!</button>
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
  }
}

export default connect(mapStateToProps, {register})(Register);

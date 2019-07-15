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
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
  }

  componentDidUpdate(prevProps) {
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

  onSubmit = (e) => {
    e.preventDefault();
    const {email, username, password} = this.state;
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
            <br/>
            <label>UserName</label>
            <input className="form-control" type="text" required name="username" value={this.state.username} onChange={(e) => this.onChange(e)} />
            <br />
            <label>Password</label>
            <input className="form-control" type="password" required name="password" value={this.state.password} onChange={(e) => this.onChange(e)}/>
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

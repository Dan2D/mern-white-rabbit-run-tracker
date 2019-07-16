import React, { Component, Fragment } from "react";
import { getUserGoals } from "../store/actions/runActions";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Login from "./User/Login";
import Register from "./User/Register";
import Nav from "./Nav/Nav";
import Home from "./Home/Home";
import CreateRun from "./Runs/CreateRun";
import CreateGoal from "./Runs/CreateGoal";
import EditGoal from "./Runs/EditGoal";
import FinishGoal from "./Runs/FinishGoal";
import EditRun from "./Runs/EditRun";
import FinishRun from "./Runs/FinishRun";
import Stats from "./Stats/Stats";
import StatsDetail from "./Stats/StatsDetail";
import Settings from "./Settings/Settings";
import { Route } from "react-router-dom";

class Content extends Component {
  static propTypes = {
    getUserGoals: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  }
  render() {
    const nav = (
      <Fragment>
        <Nav />
        <div style={{ height: "10vh"}} />
      </Fragment>
    );
    return (
      <div className="content-container">
        {this.props.isAuthenticated ? nav : null}
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/add/goal" exact component={CreateGoal} />
        <Route path="/edit/goal/:id" component={EditGoal} />
        <Route path="/complete/goal/:id" component={FinishGoal} />
        <Route path="/add/run" exact component={CreateRun} />
        <Route path="/edit/run/:id" component={EditRun} />
        <Route path="/complete/run/:id" component={FinishRun} />
        <Route path="/stats" exact component={Stats} />
        <Route path="/stats/:id" exact component={StatsDetail} />
        <Route path="/settings" exact component={Settings} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { getUserGoals }
)(Content);

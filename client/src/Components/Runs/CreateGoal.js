import React, { Component } from "react";
import { addGoal } from "../../store/actions/runActions";
import { validateTitle, validatePace, validateDist, validateType } from "../Utils/helpers";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import smoothscroll from 'smoothscroll-polyfill';
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Runs.css";

class CreateGoal extends Component {
  state = {
    name: "",
    date: new Date(),
    targetPace: "",
    goalType: "",
    ttlMsg: null,
    paceMsg: null,
    distMsg: null,
    typeMsg: null
  };
  static propTypes = {
    addGoal: PropTypes.func.isRequired,
    validateTitle: PropTypes.func.isRequired,
    validatePace: PropTypes.func.isRequired,
    validateDist: PropTypes.func.isRequired,
    userGoalsID: PropTypes.string.isRequired,
    currGoal: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, targetPace, goalDist, goalType } = this.state;
    this.setState({ ttlMsg: null, paceMsg: null, distMsg: null });
    this.setState({ ttlMsg: validateTitle(name) });
    this.setState({ paceMsg: validatePace(targetPace)});
    this.setState({ distMsg: validateDist(goalDist)});
    this.setState({ typeMsg: validateType(goalType)});
    if (validateTitle(name) !== null || validatePace(targetPace) !== null || validateDist(goalDist) !== null || validateType(goalType) !== null) {
      return null;
    }
    const newGoal = {
      userGoalsID: this.props.userGoalsID,
      name: this.state.name,
      raceDay: this.state.date.toISOString().substr(0, 10),
      targetPace: this.state.targetPace,
      goalDist: this.state.goalDist,
      distUnits: this.props.settings.distUnits,
      goalType: this.state.goalType,
      runs: [],
      completed: false
    };
    this.props.addGoal(newGoal);
    e.target.parentElement.click();
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "goalType") {
      switch (e.target.value) {
        case "5K":
          if (this.props.settings.distUnits === "km") {
            return this.setState({ goalDist: 5.0 });
          }
          return this.setState({ goalDist: 3.1 });
        case "10K":
          if (this.props.settings.distUnits === "km") {
            return this.setState({ goalDist: 10.0 });
          }
          return this.setState({ goalDist: 6.21 });
        case "Half-Marathon":
          if (this.props.settings.distUnits === "km") {
            return this.setState({ goalDist: 21.1 });
          }
          return this.setState({ goalDist: 13.11 });
        case "Marathon":
          if (this.props.settings.distUnits === "km") {
            return this.setState({ goalDist: 42.2 });
          }
          return this.setState({ goalDist: 26.22 });
        case "Distance":
        case "Fast Mile":
        case "Relay":
        default:
          return null;
      }
    }
  };

  handleDateChange = (date) => {
    this.setState({ date });
  };

  render() {
    smoothscroll.polyfill();
    window.scrollTo(0,0);
    const goalTypes = ["Select an Option", "5K", "10K", "Half-Marathon", "Marathon", "Distance", "Fast Mile", "Relay"];
    return (
      <div className="format-goal">
        <form className="container" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name"><strong>Goal</strong></label>
            <input
              className="form-control"
              type="text"
              required
              onChange={(e) => this.handleChange(e)}
              name="name"
              placeholder="Title"
            />
            <p className="error-msg">{this.state.ttlMsg}</p>
          </div>
          <div className="form-group">
            <label htmlFor="name" style={{ display: "block" }}>
              <strong>Goal Date</strong>
            </label>
            <DatePicker
              className="form-control date-picker"
              selected={this.state.date}
              onChange={this.handleDateChange}
              minDate={new Date()}
              peekNextMonth
              onFocus={(e) => (e.target.readOnly = true)}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pace"><strong>Goal Pace</strong> (mm:ss)</label>
            <input className="form-control" onChange={this.handleChange} type="text" name="targetPace" />
            <p className="error-msg">{this.state.paceMsg}</p>
          </div>
          <div className="form-group">
            <label htmlFor="distance"><strong>Distance </strong>({this.props.settings.distUnits})</label>
            <input
              className="form-control"
              onChange={this.handleChange}
              type="text"
              name="goalDist"
              value={this.state.goalDist}
            />
            <p className="error-msg">{this.state.distMsg}</p>
          </div>
          <div className="form-group">
            <label htmlFor="goal-type"><strong>Type</strong></label>
            <select
              className="form-control"
              onChange={this.handleChange}
              value={this.state.goalType}
              name="goalType"
              id="goalType"
            >
              {goalTypes.map((goal) => {
                if (goal === "Select an Option") {
                  return (
                    <option key={goal} value="">
                      {goal}
                    </option>
                  );
                }
                return (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                );
              })}
            </select>
            <p className="error-msg">{this.state.typeMsg}</p>
          </div>
          <Link to="/">
            <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>
              Add Goal
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGoalsID: state.goals._id,
    currGoal: state.goals.Goals.find((goal) => goal.completed === false),
    settings: state.settings
  };
};

export default connect(
  mapStateToProps,
  { addGoal }
)(CreateGoal);

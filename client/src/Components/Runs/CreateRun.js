import React, { Component } from "react";
import { addRun } from "../../store/actions/runActions";
import { validateTitle, validatePace, validateDist, setUnitConv, paceConvert } from "../Utils/helpers";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import smoothscroll from 'smoothscroll-polyfill';
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Runs.css";

class CreateRun extends Component {
  state = {
    name: "",
    date: new Date(),
    targetPace: "",
    runDist: "",
    runType: "Long Distance",
    ttlMsg: null,
    paceMsg: null,
    distMsg: null,
    goalID: "",
    distUnits: ""
  };
  static propTypes = {
    goals: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    addRun: PropTypes.func,
    validateTitle: PropTypes.func,
    validatePace: PropTypes.func,
    validateDist: PropTypes.func
  };

  componentDidMount(){
    smoothscroll.polyfill();
    window.scrollTo(0,0);
    let goal = this.props.goals.Goals.find(goal => goal.completed !== true);
    this.setState({distUnits: goal.distUnits, goalID: goal._id});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { name, targetPace, runDist } = this.state;
    this.setState({ ttlMsg: null, paceMsg: null, distMsg: null });
    this.setState({ ttlMsg: validateTitle(name) });
    this.setState({ paceMsg: validatePace(targetPace) });
    this.setState({ distMsg: validateDist(runDist) });
    if (validateTitle(name) !== null || validatePace(targetPace) !== null || validateDist(runDist) !== null) {
      return null;
    }
    let {timeConv, distConv} = setUnitConv(this.props.settings.distUnits, this.state.distUnits);
    if (timeConv !== distConv){
      targetPace = paceConvert(targetPace, timeConv);
    }
    const newRun = {
      userGoalsID: this.props.goals._id,
      goalID: this.state.goalID,
      name,
      date: this.state.date.toISOString().substr(0, 10),
      targetPace,
      runDist: runDist * distConv,
      distUnits: this.state.distUnits,
      runType: this.state.runType,
      completed: false,
      mood: 3
    };
    this.props.dispatch(addRun(newRun));
    e.target.parentElement.click();
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleDateChange = (date) => {
    this.setState({ date });
  };

  render() {
    smoothscroll.polyfill();
    window.scrollTo(0,0);
    const runTypes = ["Long Distance", "Short Distance", "Speed Run", "Trail Run", "Hills", "Intervals"];
    return (
      <div className="format-run">
        <form className="container" onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name"><strong>Run</strong></label>
            <input
              className="form-control"
              type="text"
              required
              onChange={this.handleChange}
              name="name"
              placeholder="Title"
            />
            <p className="error-msg">{this.state.ttlMsg}</p>
          </div>
          <div className="form-group">
            <label htmlFor="name" style={{ display: "block" }}>
              <strong>Date</strong>
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
            <label htmlFor="pace"><strong>Target Pace</strong> (mm:ss)</label>
            <input className="form-control" onChange={this.handleChange} type="text" name="targetPace" />
            <p className="error-msg">{this.state.paceMsg}</p>
          </div>
          <div className="form-group">
            <label htmlFor="distance"><strong>Distance </strong>({this.props.settings.distUnits})</label>
            <input className="form-control" onChange={this.handleChange} type="text" name="runDist" />
            <p className="error-msg">{this.state.distMsg}</p>
          </div>
          <div className="form-group">
            <label htmlFor="run-type"><strong>Type</strong></label>
            <select
              className="form-control"
              onChange={this.handleChange}
              value={this.state.runType}
              name="runType"
              id="runType"
            >
              {runTypes.map((run) => {
                return (
                  <option key={run} value={run}>
                    {run}
                  </option>
                );
              })}
            </select>
          </div>
          <Link to="/">
            <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>
              Add Run
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    goals: state.goals,
    settings: state.settings
  };
};

export default connect(mapStateToProps)(CreateRun);

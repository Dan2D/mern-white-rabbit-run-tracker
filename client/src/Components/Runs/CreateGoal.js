import React, { Component } from "react";
import AddWarning from './AddWarning';
import { addGoal } from "../../store/actions/runActions";
import {validateTitle, validatePace, validateDist} from '../Utils/helpers';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Runs.css";



class CreateGoal extends Component {
    state = {
      date: new Date(),
    goalType: "5K",
    ttlMsg: null,
    paceMsg: null,
    distMsg: null
    }
    static propTypes = {
      addGoal: PropTypes.func.isRequired,
      validateTitle: PropTypes.func.isRequired,
      validatePace: PropTypes.func.isRequired,
      validateDist: PropTypes.func.isRequired,
      userGoalsID: PropTypes.string.isRequired,
      currGoal: PropTypes.object.isRequired,
      settings: PropTypes.object.isRequired
    }


  handleSubmit = e => {
    e.preventDefault();
    const {name, pace, distance} = this.state;
    this.setState({ttlMsg: null, paceMsg: null, distMsg: null});
    this.setState({ttlMsg: validateTitle(name)})
    this.setState({paceMsg: validatePace(pace)})
    this.setState({distMsg: validateDist(distance)})
    if (validateTitle(name) !== null || validatePace(pace) !== null || validateDist(distance) !== null){
      return null;
    }
    const newGoal = {
      userGoalsID: this.props.userGoalsID,
      name: this.state.name,
      raceDay: this.state.date.toISOString().substr(0,10),
      targetPace: this.state.pace,
      goalDist: this.state.distance,
      distUnits: this.props.settings.distUnits,
      goalType: this.state.goalType,
      runs: [],
      completed: false,
    };
    this.props.addGoal(newGoal);
    e.target.parentElement.click();
}

  handleChange = e => {
      this.setState({[e.target.name]: e.target.value})
  };

  handleDateChange = (date) => {
      this.setState({date});
  }

  render() {
    const goalTypes = [
      "5K",
      "10K",
      "Half-Marathon",
      "Marathon",
      "Fast Mile",
      "Relay"
    ];
    if (this.props.currGoal){
        return (
            <AddWarning type="goal"/>
        )
    }
    return (
      <div className="create-run container">
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name">Goal</label>
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
              Goal Date
            </label>
            <DatePicker
              className="form-control date-picker"
              selected={this.state.date}
              onChange={this.handleDateChange}
              minDate={new Date()}
              peekNextMonth
              onFocus={e => (e.target.readOnly = true)}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pace">Goal Pace (min , sec)</label>
            <p><i>For example 09:45</i></p>
            <span>
            <input className="form-control" onChange={this.handleChange} type="text" name="pace"/>
            <p className="error-msg">{this.state.paceMsg}</p>
            </span>
            
          </div>
          <div className="form-group">
            <label htmlFor="distance">{`Distance (${this.props.settings.distUnits})`}</label>
            <input className="form-control" onChange={this.handleChange} type="text" name="distance" />
            <p className="error-msg">{this.state.distMsg}</p>
          </div>
          <div className="form-group">
            <label htmlFor="run-type">Type</label>
            <select className="form-control" onChange={this.handleChange} value={this.state.goalType} name="goalType" id="goalType">
              {goalTypes.map(goal => {
                return (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                );
              })}
            </select>
          </div>
          <Link to="/">
            <button type="submit" className="btn btn-primary" onClick={e => this.handleSubmit(e)}>Add Goal</button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      userGoalsID: state.goals._id,
      currGoal: state.goals.Goals.find(goal => goal.completed === false),
      settings: state.settings
  }
}

export default connect(mapStateToProps, {addGoal})(CreateGoal);

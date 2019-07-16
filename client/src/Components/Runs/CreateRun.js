import React, { Component } from 'react';
import AddWarning from './AddWarning';
import { addRun } from '../../store/actions/runActions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Runs.css';



class CreateRun extends Component {
    state = {
      date: new Date(),
      runType: 'Long Distance'
    }
    static propTypes = {
      goal: PropTypes.object.isRequired,
      settings: PropTypes.object.isRequired,
      addRun: PropTypes.func.isRequired
    }
  handleSubmit = e => {
    e.preventDefault();
    let goal = this.props.goals.Goals.find(goal => goal.completed === false);
    const newRun = {
      userGoalsID: this.props.goals._id,
      goalID: goal._id,
      name: this.state.name,
      date: this.state.date.toISOString().substr(0,10),
      targetPace: this.state.pace,
      distance: this.state.distance,
      distUnits: this.props.settings.distUnits,
      type: this.state.runType,
      completed: false,
      mood: 0
    };
    this.props.dispatch(addRun(newRun));
    e.target.parentElement.click();
}

  handleChange = e => {
      this.setState({[e.target.name]: e.target.value})
  };

  handleDateChange = (date) => {
      this.setState({date});
  }

  render() {
    if (!this.props.goals.Goals.find(goal => goal.completed === false)){
      return <AddWarning type="run" />
    }
    const runTypes = [
      "Long Distance",
      "Short Distance",
      "Speed Run",
      "Trail Run",
      "Hills",
      "Intervals"
    ];
    return (
      <div className="create-run container">
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name">Run</label>
            <input
              className="form-control"
              type="text"
              required
              onChange={this.handleChange}
              name="name"
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" style={{ display: "block" }}>
              Date
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
            <label htmlFor="pace">Target Pace (min , sec)</label>
            <p><i>For example 09:45</i></p>
            <span>
            <input className="form-control" onChange={this.handleChange} type="text" name="pace"/>
            </span>
            
          </div>
          <div className="form-group">
            <label htmlFor="distance">{`Distance (${this.props.settings.distUnits})`}</label>
            <input className="form-control" onChange={this.handleChange} type="text" name="distance" />
          </div>
          <div className="form-group">
            <label htmlFor="run-type">Type</label>
            <select className="form-control" onChange={this.handleChange} value={this.state.runType} name="runType" id="runType">
              {runTypes.map(run => {
                return (
                  <option key={run} value={run}>
                    {run}
                  </option>
                );
              })}
            </select>
          </div>
          <Link to="/">
            <button type="submit" className="btn btn-primary" onClick={e => this.handleSubmit(e)}>Add Run</button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      goals: state.goals,
      settings: state.settings
  }
}

export default connect(mapStateToProps)(CreateRun);

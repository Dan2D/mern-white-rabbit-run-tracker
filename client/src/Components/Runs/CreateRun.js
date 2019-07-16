import React, { Component } from 'react';
import AddWarning from './AddWarning';
import { addRun } from '../../store/actions/runActions';
import {validateTitle, validatePace, validateDist} from '../Utils/helpers';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Runs.css';



class CreateRun extends Component {
    state = {
      date: new Date(),
      runType: 'Long Distance',
      ttlMsg: null,
      paceMsg: null,
      distMsg: null
    }
    static propTypes = {
      goal: PropTypes.object.isRequired,
      settings: PropTypes.object.isRequired,
      addRun: PropTypes.func.isRequired,
      validateTitle: PropTypes.func.isRequired,
      validatePace: PropTypes.func.isRequired,
      validateDist: PropTypes.func.isRequired,
    }



  handleSubmit = e => {
    e.preventDefault();
    let goal = this.props.goals.Goals.find(goal => goal.completed === false);
    const {name, pace, distance} = this.state;
    this.setState({ttlMsg: null, paceMsg: null, distMsg: null});
    this.setState({ttlMsg: validateTitle(name)})
    this.setState({paceMsg: validatePace(pace)})
    this.setState({distMsg: validateDist(distance)})
    if (validateTitle(name) !== null || validatePace(pace) !== null || validateDist(distance) !== null){
      return null;
    }
    const newRun = {
      userGoalsID: this.props.goals._id,
      goalID: goal._id,
      name,
      date: this.state.date.toISOString().substr(0,10),
      targetPace: pace,
      distance,
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
            <p className="error-msg">{this.state.ttlMsg}</p>
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
            <label htmlFor="pace">Target Pace (mm:ss)</label>
            <input className="form-control" onChange={this.handleChange} type="text" name="pace"/>
            <p className="error-msg">{this.state.paceMsg}</p>            
          </div>
          <div className="form-group">
            <label htmlFor="distance">{`Distance (${this.props.settings.distUnits})`}</label>
            <input className="form-control" onChange={this.handleChange} type="text" name="distance" />
            <p className="error-msg">{this.state.distMsg}</p>
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

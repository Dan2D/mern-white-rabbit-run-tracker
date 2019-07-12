import React, { Component } from "react";
import GoalWarning from './GoalWarning';
import { addGoal } from "../../store/actions/runActions";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Runs.css";



class CreateRun extends Component {
    state = {
      date: new Date(),
    goalType: "5K"
    }
  handleSubmit = e => {
    e.preventDefault();
    const newGoal = {
      userGoalsID: this.props.userGoalsID,
      name: this.state.name,
      raceDay: this.state.date.toString().substr(0,10),
      targetPace: this.state.pace,
      goalDist: this.state.distance,
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
    console.log(this.props.currGoal)
    const goalTypes = [
      "5K",
      "10K",
      "Half-Marathon",
      "Marathon",
      "Fast Mile",
      "Relay"
    ];
    // if (this.props.currGoal){
    //     return (
    //         <GoalWarning/>
    //     )
    // }
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
            </span>
            
          </div>
          <div className="form-group">
            <label htmlFor="distance">{`Distance (${this.props.distUnits})`}</label>
            <input className="form-control" onChange={this.handleChange} type="text" name="distance" />
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
          <div className="form-group">
            ADD GOOGLE MAP LATER
            {/* https://github.com/fullstackreact/google-maps-react */}
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
      distUnits: state.goals.distUnits
  }
}

export default connect(mapStateToProps, {addGoal})(CreateRun);

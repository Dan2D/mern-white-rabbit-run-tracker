import React, { Component } from "react";
import { editGoal } from "../../store/actions/runActions";
import {setUnitConv, paceConvert} from "../Utils/helpers";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Runs.css";



class EditGoal extends Component {
    state = {
    date: new Date(),
    goalType: "5K"
    }
    componentDidMount(){
        const goal = this.props.goals.find(goal => goal._id === this.props.match.params.id);
        let {timeConv, distConv} = setUnitConv(this.props.settings.distUnits, goal.distUnit);
        const {name, raceDay, targetPace, goalDist, goalType,runs,  completed} = goal;
        this.setState({
            name,
            date: new Date(raceDay),
            targetPace: paceConvert(targetPace, timeConv),
            goalDist: (goalDist * distConv).toFixed(2),
            goalType,
            runs,
            completed
        })
    }
  handleSubmit = e => {
    e.preventDefault();
    const updatedGoal = {
      userGoalsID: this.props.userGoalsID,
      goalID: this.props.match.params.id,
      name: this.state.name,
      raceDay: this.state.date,
      targetPace: this.state.targetPace,
      goalDist: this.state.goalDist,
      distUnit: this.props.settings.distUnits,
      goalType: this.state.goalType,
      runs: this.state.runs,
      completed: this.state.completed,
    };
    this.props.editGoal(updatedGoal);
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
      "Distance",
      "Fast Mile",
      "Relay"
    ];
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
              value={this.state.name}
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
            <input className="form-control" onChange={this.handleChange} value={this.state.targetPace} type="text" name="targetPace"/>
            </span>
            
          </div>
          <div className="form-group">
            <label htmlFor="distance">{`Distance (${this.props.settings.distUnits})`}</label>
            <input className="form-control" onChange={this.handleChange} value={this.state.goalDist} type="text" name="goalDist" />
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
            <button type="submit" className="btn btn-primary" onClick={e => this.handleSubmit(e)}>Update Goal</button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      userGoalsID: state.goals._id,
      goals: state.goals.Goals,
      settings: state.settings
  }
}

export default connect(mapStateToProps, {editGoal})(EditGoal);

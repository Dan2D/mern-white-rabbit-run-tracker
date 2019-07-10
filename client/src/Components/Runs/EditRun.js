import React, { Component } from "react";
import { editRun } from "../../store/actions/runActions";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Runs.css";



class EditRun extends Component {
    state = {
      date: new Date(),
      runType: 'Long Distance'
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        const run = this.props.runs.find(run => run.id === id);
        const {name, date, targetPace, distance, type, completed, mood} = run;
        this.setState({
            id,
            name,
            date: new Date(date),
            targetPace,
            distance,
            type,
            completed,
            mood
        })
    }


  handleSubmit = e => {
    e.preventDefault();
    const updatedRun = {
      id: this.state.id,
      name: this.state.name,
      date: this.state.date.toISOString().substr(0,10),
      targetPace: this.state.targetPace,
      distance: this.state.distance,
      type: this.state.runType,
      completed: this.state.completed,
      mood: this.state.mood
    };
    // clear state and go back home
    this.props.editRun(updatedRun);
    e.target.parentElement.click();
}

  handleChange = e => {
      this.setState({[e.target.name]: e.target.value})
  };

  handleDateChange = (date) => {
      this.setState({date});
  }

  render() {
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
              value={this.state.name}
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
            <label htmlFor="pace">Target Pace (min, sec)</label>
            <p><i>For example 09:45</i></p>
            <input className="form-control" onChange={this.handleChange} type="text" name="pace" value={this.state.targetPace} />
          </div>
          <div className="form-group">
            <label htmlFor="distance">{`Distance (${this.props.distUnits})`}</label>
            <input className="form-control" onChange={this.handleChange} type="text" name="distance" value={this.state.distance} />
          </div>
          <div className="form-group">
            <label htmlFor="run-type">Type</label>
            <select className="form-control" onChange={this.handleChange}  name="runType" id="runType" value={this.state.type}>
              {runTypes.map(run => {
                return (
                  <option key={run} value={run}>
                    {run}
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
            <button type="submit" className="btn btn-primary" onClick={e => this.handleSubmit(e)}>Update Run</button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    
    return {
        runs: state.goals.currentGoal.runs,
        distUnits: state.goals.distUnits
    }
}


export default connect(mapStateToProps, {editRun})(EditRun);

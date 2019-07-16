import React, { Component, Fragment } from "react";
import { editRun } from "../../store/actions/runActions";
import {setUnitConv, paceConvert} from '../Utils/helpers';
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
        const goal = this.props.goal.find(goal => goal._id === this.props.location.state.goal);
        const id = this.props.match.params.id;
        const run = goal.runs.find(run => run._id === id);
        console.log(run)
        let {timeConv, distConv} = setUnitConv(this.props.settings.distUnits, run.distUnit)
        const runIndx = goal.runs.indexOf(run);
        const {name, date, targetPace, actualPace, distance, type, completed, mood} = run;
        this.setState({
            id,
            name,
            date: new Date(date),
            targetPace: paceConvert(targetPace, timeConv),
            actualPace: paceConvert(actualPace, timeConv),
            distance: (distance*distConv).toFixed(2),
            distUnit: this.props.settings.distUnits,
            runtype: type,
            completed,
            runMood: mood.toString(),
            runIndx
        })
    }


  handleSubmit = e => {
    e.preventDefault();
    const updatedRun = {
      userGoalsID: this.props.userGoalsID,
      goalID: this.props.location.state.goal,
      id: this.state.id,
      name: this.state.name,
      date: this.state.date.toISOString().substr(0,10),
      targetPace: this.state.targetPace,
      actualPace: this.state.actualPace,
      distance: this.state.distance,
      distUnit: this.state.distUnit,
      type: this.state.runType,
      completed: this.state.completed,
      mood: this.state.runMood,
      runIndx: this.state.runIndx
    };
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
    let finishedStats = <Fragment>
                          <label htmlFor="pace">Actual Pace (min, sec)</label>
                          <input className="form-control mb-3" onChange={(e) => this.handleChange(e)} type="text" name="actualPace" value={this.state.actualPace} />
                          <p>How Did Your Run Feel?</p>
                          <div className="form-group">
                            <fieldset className=" d-flex justify-content-between">
                                <label className="d-flex flex-column">1<input type="radio" name="runMood" value="1" checked={this.state.runMood === "1"} onChange={(e) => this.handleChange(e)}/></label>
                                <label className="d-flex flex-column">2<input type="radio" name="runMood" value="2" checked={this.state.runMood === "2"} onChange={(e) => this.handleChange(e)}/></label>
                                <label className="d-flex flex-column">3<input type="radio" name="runMood" value="3" checked={this.state.runMood === "3"} onChange={(e) => this.handleChange(e)}/></label>
                                <label className="d-flex flex-column">4<input type="radio" name="runMood" value="4" checked={this.state.runMood === "4"} onChange={(e) => this.handleChange(e)}/></label>
                                <label className="d-flex flex-column">5<input type="radio" name="runMood" value="5" checked={this.state.runMood === "5"} onChange={(e) => this.handleChange(e)}/></label>
                            </fieldset>
                        </div>
                      </Fragment>
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
            <label htmlFor="targetPace">Target Pace (min, sec)</label>
            <p><i>For example 09:45</i></p>
            <input className="form-control" onChange={(e) => this.handleChange(e)} type="text" name="targetPace" value={this.state.targetPace} />
          </div>
          <div className="form-group">
            <label htmlFor="distance">{`Distance (${this.props.settings.distUnits})`}</label>
            <input className="form-control" onChange={(e) => this.handleChange(e)} type="text" name="distance" value={this.state.distance} />
          </div>
          {this.state.completed ? finishedStats : null}
          <div className="form-group">
            <label htmlFor="run-type">Type</label>
            <select className="form-control" onChange={(e) => this.handleChange(e)}  name="runType" id="runType" value={this.state.type}>
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
        userGoalsID: state.goals._id,
        goal: state.goals.Goals,
        settings: state.settings
    }
}


export default connect(mapStateToProps, {editRun})(EditRun);

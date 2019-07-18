import React, { Component, Fragment } from "react";
import { editGoal } from "../../store/actions/runActions";
import {setUnitConv, paceConvert} from "../Utils/helpers";
import {validateTitle, validatePace, validateDist} from '../Utils/helpers';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Runs.css";



class EditGoal extends Component {
    state = {
    name: "",
    date: new Date(),
    targetPace: "",
    actualPace: "",
    goalDist: "",
    goalType: "",
    ttlMsg: null,
    tPaceMsg: null,
    aPaceMsg: null,
    distMsg: null,
    }

    static propTypes = {
      editGoal: PropTypes.func.isRequired,
      validateTitle: PropTypes.func.isRequired,
      validatePace: PropTypes.func.isRequired,
      validateDist: PropTypes.func.isRequired,
      setUnitConv: PropTypes.func.isRequired,
      paceConvert: PropTypes.func.isRequired,
      userGoalsID: PropTypes.string.isRequired,
      goals: PropTypes.object.isRequired,
      settings: PropTypes.object.isRequired
    }

    componentDidMount(){
        const goal = this.props.goals.find(goal => goal._id === this.props.match.params.id);
        let {timeConv, distConv} = setUnitConv(this.props.settings.distUnits, goal.distUnits);
        const {name, raceDay, targetPace, goalDist, goalType, runs, completed, actualPace, mood} = goal;
        this.setState({
            name,
            date: new Date(raceDay),
            targetPace: paceConvert(targetPace, timeConv),
            goalDist: (goalDist * distConv).toFixed(2),
            actualPace: paceConvert(actualPace, timeConv),
            goalMood: mood.toString(), 
            goalType,
            runs,
            completed
        })
    }
  handleSubmit = e => {
    e.preventDefault();
    const {name, targetPace, actualPace, goalDist} = this.state;
    this.setState({ttlMsg: null, paceMsg: null, aPaceMsg: null, distMsg: null});
    this.setState({ttlMsg: validateTitle(name)})
    this.setState({tPaceMsg: validatePace(targetPace)})
    this.setState({aPaceMsg: validatePace(actualPace)})
    this.setState({distMsg: validateDist(goalDist)})
    if (validateTitle(name) !== null || validatePace(targetPace) !== null || validatePace(actualPace) !== null || validateDist(goalDist) !== null){
      return null;
    }
    const updatedGoal = {
      userGoalsID: this.props.userGoalsID,
      goalID: this.props.match.params.id,
      name: this.state.name,
      raceDay: this.state.date,
      targetPace: this.state.targetPace,
      actualPace: this.state.actualPace,
      mood: this.state.goalMood,
      goalDist: this.state.goalDist,
      distUnits: this.props.settings.distUnits,
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
      "Select an Option",
      "5K",
      "10K",
      "Half-Marathon",
      "Marathon",
      "Distance",
      "Fast Mile",
      "Relay"
    ];
    let finishedStats = <Fragment>
                          <label htmlFor="pace">Actual Pace (mm:ss)</label>
                          <input className="form-control mb-3" onChange={(e) => this.handleChange(e)} type="text" name="actualPace" value={this.state.actualPace} />
                          <p className="error-msg">{this.state.aPaceMsg}</p>  
                          <p>How Did Your Run Feel?</p>
                          <div className="form-group">
                            <fieldset className=" d-flex justify-content-between">
                                <label className="d-flex flex-column rating-radio"><img src={require('../../images/rating-1.png')} alt="mad face"/><input type="radio" name="goalMood" value="1" checked={this.state.goalMood === "1"} onChange={(e) => this.handleChange(e)}/></label>
                                <label className="d-flex flex-column rating-radio"><img src={require('../../images/rating-2.png')} alt="sad face"/><input type="radio" name="goalMood" value="2" checked={this.state.goalMood === "2"} onChange={(e) => this.handleChange(e)}/></label>
                                <label className="d-flex flex-column rating-radio"><img src={require('../../images/rating-3.png')} alt="meh face"/><input type="radio" name="goalMood" value="3" checked={this.state.goalMood === "3"} onChange={(e) => this.handleChange(e)}/></label>
                                <label className="d-flex flex-column rating-radio"><img src={require('../../images/rating-4.png')} alt="happy face"/><input type="radio" name="goalMood" value="4" checked={this.state.goalMood === "4"} onChange={(e) => this.handleChange(e)}/></label>
                                <label className="d-flex flex-column rating-radio"><img src={require('../../images/rating-5.png')} alt="very happy face"/><input type="radio" name="goalMood" value="5" checked={this.state.goalMood === "5"} onChange={(e) => this.handleChange(e)}/></label>
                            </fieldset>
                        </div>
                      </Fragment>
    return (
      <div className="format-goal container">
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name"><strong>Goal</strong></label>
            <input
              className="form-control"
              type="text"
              required
              onChange={this.handleChange}
              name="name"
              value={this.state.name}
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
              onFocus={e => (e.target.readOnly = true)}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pace"><strong>Goal Pace</strong> (mm:ss)</label>
            <input className="form-control" onChange={this.handleChange} value={this.state.targetPace} type="text" name="targetPace"/>
            <p className="error-msg">{this.state.paceMsg}</p>
          </div>
          <div className="form-group">
            <label htmlFor="distance"><strong>Distance </strong>({this.props.settings.distUnits})</label>
            <input className="form-control" onChange={this.handleChange} value={this.state.goalDist} type="text" name="goalDist" />
            <p className="error-msg">{this.state.distMsg}</p>
          </div>
          <div className="form-group">
            {this.state.completed ? finishedStats : null}
            <label htmlFor="run-type"><strong>Type</strong></label>
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

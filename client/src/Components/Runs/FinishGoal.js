import React, { Component } from "react";
import { finishGoal } from "../../store/actions/runActions";
import {setUnitConv, paceConvert, validatePace} from '../Utils/helpers';
import PropTypes from 'prop-types';
import smoothscroll from 'smoothscroll-polyfill';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Runs.css";

class FinishGoal extends Component {
  state = {
    raceDay: new Date(),
    actualPace: "",
    goalMood: "3",
    aPaceMsg: null
  };

  componentDidMount(){
    smoothscroll.polyfill();
    window.scrollTo(0,0);
    const id = this.props.match.params.id;
    const goal = this.props.goals.Goals.find(goal => goal._id === id);
    const goalIndx = this.props.goals.Goals.indexOf(goal);
    let {name, raceDay, targetPace, goalDist, goalType} = goal;
    let {timeConv, distConv} = setUnitConv(goal.distUnits, this.props.settingUnits);
    if (timeConv !== distConv) {
      targetPace = paceConvert(targetPace, timeConv);
    }
    this.setState({
        id,
        name,
        raceDay: new Date(raceDay),
        targetPace,
        goalDist: (goalDist * distConv).toFixed(2),
        distUnits: goal.distUnits,
        goalType,
        goalIndx
    })
}
static propTypes = {
  finishGoal: PropTypes.func,
  validatePace: PropTypes.func,
  goals: PropTypes.object,
  settingUnits: PropTypes.string
}

  handleSubmit = e => {
    e.preventDefault();
    let {actualPace} = this.state;
    this.setState({aPaceMsg: null});
    this.setState({aPaceMsg: validatePace(actualPace)})
    if (validatePace(actualPace) !== null ){
      return null;
    }
    let {timeConv, distConv} = setUnitConv(this.props.settingUnits, this.state.distUnits);
    if (timeConv !== distConv) {
      actualPace = paceConvert(actualPace, timeConv);
    }
    const finishedGoal = {
      goalIndx: this.state.goalIndx,
      userGoalsID: this.props.goals._id,
      goalID: this.state.id,
      actualPace: actualPace,
      mood: this.state.goalMood,
      completed: true
    };
    this.props.finishGoal(finishedGoal);
    e.target.parentElement.click();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    smoothscroll.polyfill();
    window.scrollTo(0,0);
    return (
      <div className="format-run">
        <form className="container" onSubmit={e => this.handleSubmit(e)}>
          <p><strong>Goal: </strong>{this.state.name}</p>
          <p><strong>Date: </strong>{this.state.raceDay.toString().substr(0, 15)}</p>
          <p>
           <strong>Target Pace: </strong>
            {` ${this.state.targetPace} min / ${this.props.settingUnits}`}
          </p>
          <p><strong>Distance: </strong>{` ${this.state.goalDist} ${this.props.settingUnits}`}</p>
          <p><strong>Type: </strong>{this.state.goalType}</p>
          <div>
            <p><strong>Actual Pace</strong> (mm:ss)</p>
            <input
              className="form-control"
              type="text"
              required
              onChange={this.handleChange}
              name="actualPace"
              value={this.state.actualPace}
            />
            <p className="error-msg">{this.state.aPaceMsg}</p>
          </div>
          <p>How Did You Feel About Completing Your Goal?</p>
          <div className="form-group">
            <fieldset
              className=" d-flex justify-content-between"
              onChange={e => this.handleChange(e)}
            >
             <label className="d-flex flex-column rating-radio">
               <img src={require("../../images/rating-1.png")} alt="mad face"/>
                <input
                  type="radio"
                  name="goalMood"
                  value="1"
                  checked={this.state.goalMood === "1"}
                />
              </label>
              <label className="d-flex flex-column rating-radio">
                <img src={require("../../images/rating-2.png")} alt="sad face"/>
                <input
                  type="radio"
                  name="goalMood"
                  value="2"
                  checked={this.state.goalMood === "2"}
                />
              </label>
              <label className="d-flex flex-column rating-radio">
                <img src={require("../../images/rating-3.png")} alt="meh face"/>
                <input
                  type="radio"
                  name="goalMood"
                  value="3"
                  checked={this.state.goalMood === "3"}
                />
              </label>
              <label className="d-flex flex-column rating-radio">
                <img src={require("../../images/rating-4.png")} alt="happy face"/>
                <input
                  type="radio"
                  name="goalMood"
                  value="4"
                  checked={this.state.goalMood === "4"}
                />
              </label>
              <label className="d-flex flex-column rating-radio">
                <img src={require("../../images/rating-5.png")} alt="very happy face"/>
                <input
                  type="radio"
                  name="goalMood"
                  value="5"
                  checked={this.state.goalMood === "5"}
                />
              </label>
            </fieldset>
          </div>

          <Link to="/">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={e => this.handleSubmit(e)}
            >
              Complete Goal
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    goals: state.goals,
    settingUnits: state.settings.distUnits
  };
};

export default connect(
  mapStateToProps,
  { finishGoal }
)(FinishGoal);

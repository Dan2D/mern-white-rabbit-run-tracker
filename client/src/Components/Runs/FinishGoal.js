import React, { Component } from "react";
import { finishGoal } from "../../store/actions/runActions";
import {validatePace} from '../Utils/helpers';
import rating1 from '../../images/rating-1.png'
import rating2 from '../../images/rating-2.png'
import rating3 from '../../images/rating-3.png'
import rating4 from '../../images/rating-4.png'
import rating5 from '../../images/rating-5.png'
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Runs.css";

class CreateRun extends Component {
  state = {
    raceDay: new Date(),
    actualPace: "",
    goalMood: "3",
    aPaceMsg: null
  };

  componentDidMount(){
    const id = this.props.match.params.id;
    const goal = this.props.goals.Goals.find(goal => goal._id === id);
    const goalIndx = this.props.goals.Goals.indexOf(goal);
    const {name, raceDay, targetPace, goalDist, goalType} = goal;
    this.setState({
        id,
        name,
        raceDay: new Date(raceDay),
        targetPace,
        goalDist,
        goalType,
        goalIndx
    })
}
static propTypes = {
  finishGoal: PropTypes.func.isRequired,
  validatePace: PropTypes.func.isRequired,
  goals: PropTypes.object.isRequired,
  distUnits: PropTypes.string.isRequired
}

  handleSubmit = e => {
    e.preventDefault();
    const {actualPace} = this.state;
    this.setState({aPaceMsg: null});
    this.setState({aPaceMsg: validatePace(actualPace)})
    if (validatePace(actualPace) !== null ){
      return null;
    }
    const finishedGoal = {
      goalIndx: this.state.goalIndx,
      userGoalsID: this.props.goals._id,
      goalID: this.state.id,
      actualPace: this.state.actualPace,
      goalMood: this.state.goalMood,
      completed: true
    };
    this.props.finishGoal(finishedGoal);
    e.target.parentElement.click();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="create-run container">
        <form onSubmit={e => this.handleSubmit(e)}>
          <p>Goal: {this.state.name}</p>
          <p>Date: {this.state.raceDay.toString().substr(0, 15)}</p>
          <p>
            Target Pace:
            {` ${this.state.targetPace} min / ${this.props.distUnits}`}
          </p>
          <p> Distance:{` ${this.state.goalDist} ${this.props.distUnits}`}</p>
          <p>Type: {this.state.goalType}</p>
          <div className="">
            <p>Actual Pace</p>
            <input
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
               <img src={rating1} alt="mad face"/>
                <input
                  type="radio"
                  name="goalMood"
                  value="1"
                  checked={this.state.goalMood === "1"}
                />
              </label>
              <label className="d-flex flex-column rating-radio">
                <img src={rating2} alt="sad face"/>
                <input
                  type="radio"
                  name="goalMood"
                  value="2"
                  checked={this.state.goalMood === "2"}
                />
              </label>
              <label className="d-flex flex-column rating-radio">
                <img src={rating3} alt="meh face"/>
                <input
                  type="radio"
                  name="goalMood"
                  value="3"
                  checked={this.state.goalMood === "3"}
                />
              </label>
              <label className="d-flex flex-column rating-radio">
                <img src={rating4} alt="happy face"/>
                <input
                  type="radio"
                  name="goalMood"
                  value="4"
                  checked={this.state.goalMood === "4"}
                />
              </label>
              <label className="d-flex flex-column rating-radio">
                <img src={rating5} alt="very happy face"/>
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
    distUnits: state.settings.distUnits
  };
};

export default connect(
  mapStateToProps,
  { finishGoal }
)(CreateRun);

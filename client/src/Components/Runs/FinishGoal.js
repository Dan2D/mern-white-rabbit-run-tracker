import React, { Component } from "react";
import { finishGoal } from "../../store/actions/runActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Runs.css";

class CreateRun extends Component {
  state = {
    raceDay: new Date(),
    actualPace: "",
    goalMood: "3"
  };

  componentDidMount(){
    const id = this.props.match.params.id;
    const goal = this.props.goals.Goals.find(goal => goal._id === id);
    console.log(goal, this.props.goals)
    const goalIndx = this.props.goals.Goals.indexOf(goal);
    const {name, raceDay, targetPace, goalDist, goalType} = goal;
    console.log(raceDay)
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

  handleSubmit = e => {
    e.preventDefault();
    const finishedGoal = {
      goalIndx: this.state.goalIndx,
      userGoalsID: this.props.goals._id,
      goalID: this.state.id,
      actualPace: this.state.actualPace,
      goalMood: this.state.goalMood,
      completed: true
    };
    //usergoalsid goalid mood actualpace goalINDX
    this.props.finishGoal(finishedGoal);
    e.target.parentElement.click();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.props.currGoal);

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
          </div>
          <p>How Did You Feel About Completing Your Goal?</p>
          <div className="form-group">
            <fieldset
              className=" d-flex justify-content-between"
              onChange={e => this.handleChange(e)}
            >
              <label className="d-flex flex-column">
                1
                <input
                  type="radio"
                  name="goalMood"
                  value="1"
                  checked={this.state.goalMood === "1"}
                />
              </label>
              <label className="d-flex flex-column">
                2
                <input
                  type="radio"
                  name="goalMood"
                  value="2"
                  checked={this.state.goalMood === "2"}
                />
              </label>
              <label className="d-flex flex-column">
                3
                <input
                  type="radio"
                  name="goalMood"
                  value="3"
                  checked={this.state.goalMood === "3"}
                />
              </label>
              <label className="d-flex flex-column">
                4
                <input
                  type="radio"
                  name="goalMood"
                  value="4"
                  checked={this.state.goalMood === "4"}
                />
              </label>
              <label className="d-flex flex-column">
                5
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

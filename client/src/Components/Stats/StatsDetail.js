import React, { Component } from "react";
import GoalTile from "../Runs/GoalTile";
import UpcomingRuns from "../Runs/UpcomingRuns";
import CompletedRuns from "../Runs/CompletedRuns";
import smoothscroll from 'smoothscroll-polyfill';
import { delGoal } from "../../store/actions/runActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Stats.css";

class StatsDetail extends Component {
  state = {
    statGoal: {
      name: "",
      raceDay: "",
      runs: []
    }
  };
  static propTypes = {
    delGoal: PropTypes.func.isRequired,
    userGoalsID: PropTypes.string.isRequired,
    goals: PropTypes.array.isRequired,
    distUnits: PropTypes.string.isRequired
  };
  componentDidMount() {
    smoothscroll.polyfill();
    window.scrollTo(0,0);
    setInterval(() => { document.documentElement.style.setProperty("--nav-link-color", "#58b368");}, 100)
    const id = this.props.match.params.id;
    let statGoal = this.props.goals.filter((goal) => goal._id === id);
    this.setState({ statGoal: statGoal[0] });
  }
  handleDeleteGoal = (e) => {
    this.props.delGoal(this.props.userGoalsID, this.props.match.params.id);
    e.target.parentElement.click();
  };
  render() {
    smoothscroll.polyfill();
    window.scrollTo(0,0);
    let goal = this.props.goals.find((goal) => goal._id === this.props.match.params.id);
    return (
      <div className="stats-detail-container">
        <div className="title-blk title-blk--stats d-flex justify-content-between mb-3">
          <h5>
            <strong>Goal</strong>
          </h5>
          <h5>
            <strong>Status: </strong>
            {goal.completed ? "Completed" : "In Progress ..."}
          </h5>
        </div>
        <div className="container">
          <GoalTile
            name={this.state.statGoal.name}
            goalID={this.state.statGoal._id}
            goalType={this.state.statGoal.goalType}
            raceDay={this.state.statGoal.raceDay}
            tPace={this.state.statGoal.targetPace}
            goalDist={this.state.statGoal.goalDist}
            aPace={this.state.statGoal.actualPace}
            mood={this.state.statGoal.mood}
            progress={this.state.statGoal.progress}
            completed={this.state.statGoal.completed}
            goalDistUnits={this.state.statGoal.distUnits}
          />
        </div>
        {this.state.statGoal.completed ? null : <UpcomingRuns goal={goal} />}
        <CompletedRuns goal={goal} userID={this.props.userGoalsID} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userGoalsID: state.goals._id,
    goals: [...state.goals.Goals],
    distUnits: state.settings.distUnits
  };
};

export default connect(
  mapStateToProps,
  { delGoal }
)(StatsDetail);

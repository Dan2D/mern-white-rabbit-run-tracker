import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserGoals } from "../../store/actions/runActions";
import { getUserSettings } from "../../store/actions/settingsActions";
import {setUnitConv, paceConvert} from '../Utils/helpers';
import PropTypes from "prop-types";
import RunTile from "../Runs/RunTile";
import progressRbbt from "../../images/progress-rabbit.png";
import progressTree from "../../images/progress-tree.png";
import "./Home.css";

class Home extends Component {
  state = {
    noGoal: {
      name: "No Current Goal Set",
      targetPace: "0:00",
      raceDay: "",
      goalType: "",
      goalDist: 0,
      distUnits: this.props.settings.distUnits,
      runs: [],
      progress: 0
    },
    modal: false
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated && !this.props.auth.isLoading) {
      this.props.getUserGoals(this.props.auth.user._id);
      this.props.getUserSettings(this.props.auth.user._id);
    }
  }

  static propTypes = {
    setUnitConv: PropTypes.func,
    paceConvert: PropTypes.func,
    getUserGoals: PropTypes.func.isRequired,
    getUserSettings: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    goals: PropTypes.object,
    settings: PropTypes.object.isRequired
  };

  rabbitProgressMove = (currentGoal) => {
    document.documentElement.style.setProperty(
      "--rabbit-x",
      (parseFloat(currentGoal.progress) / 100) * 70 + "vw"
    );
  }

  render() {
    if (this.props.auth.isAuthenticated === null) {
      return <Redirect to="/login" />;
    }
    const currentGoal = this.props.currentGoal ? this.props.currentGoal : this.state.noGoal;
    this.rabbitProgressMove(currentGoal);
    let {timeConv, distConv} = setUnitConv(this.props.settings.distUnits, currentGoal.distUnits);
    let targetPace = paceConvert(currentGoal.targetPace, timeConv);
    let newRuns = 0;
    let completedRuns = 0;
    return (
      <div className="home">
        <h5 className="ml-2">Progress</h5>
        <div className="goal-container container">
          <h6>
            <strong>Goal: </strong>
            {`${currentGoal.name}`}
          </h6>
          <h6>
            <strong>Goal Type: </strong>
            {`${currentGoal.goalType}`}
          </h6>
          <h6>
            <strong>Goal Date: </strong>
            {`${currentGoal.raceDay.substr(0, 10)}`}
          </h6>
          <h6>
            <strong>Target Pace: </strong>
            {`${targetPace} min / ${this.props.settings.distUnits}`}
          </h6>
          <h6>
            <strong>Goal Distance: </strong>
            {`${(currentGoal.goalDist*distConv).toFixed(2)} ${
              this.props.settings.distUnits
            }`}
          </h6>
          <div className="visual-progress">
            <div className="rabbit-percent">
              <p>{`${currentGoal.progress}%`}</p>
              <p>&#9660;</p>
              <img
                className="rabbit-percent__rabbit"
                src={progressRbbt}
                alt="white rabbit"
              />
            </div>
            <div className="tree-goal">
              <p className="tree-goal__goal">{`${(
                currentGoal.goalDist * distConv
              ).toFixed(2)} ${this.props.settings.distUnits}`}</p>
              <img className="tree-goal__tree" src={progressTree} alt="tree" />
            </div>
          </div>
        </div>
        <div className="upcoming-runs">
          <div className="title-blk title-blk--upcoming-runs">
            <h5 className="title-blk__title">
              <strong>{currentGoal.name}</strong>: Upcoming Runs
            </h5>
            <Link className="d-flex" to="/add/run">
              <button className="title-bar__add-btn" />
            </Link>
          </div>
          <div className="upcoming-runs__tiles container">
            {currentGoal.runs.map((run, indx) => {
              if (!run.completed) {
                newRuns++;
                return (
                  <RunTile
                    onFinish={() => this.handleFinishRun()}
                    key={run._id}
                    goalID={currentGoal._id}
                    runID={run._id}
                    indx={indx}
                    name={run.name}
                    date={run.date}
                    tPace={run.targetPace}
                    dist={run.distance}
                    distUnits={run.distUnits}
                    type={run.type}
                    completed={run.completed}
                  />
                );
              }
              if (indx + 1 === currentGoal.runs.length && newRuns === 0) {
                return <p key={indx}> No Runs Scheduled!</p>;
              }
              return null;
            })}
            {currentGoal.runs.length === 0 ? <p> No Runs Scheduled!</p> : null}
          </div>
        </div>
        <div className="completed-runs">
          <div className="title-blk title-blk--completed-runs">
            <h5 className="title-blk__title">
              <strong>{currentGoal.name}</strong>: Completed Runs
            </h5>
          </div>
          <div className="completed-runs__tiles container">
            {currentGoal.runs.map((run, indx) => {
              if (run.completed) {
                completedRuns++;
                return (
                  <RunTile
                    key={run._id}
                    userID={this.props.userID}
                    goalID={currentGoal._id}
                    runID={run._id}
                    name={run.name}
                    date={run.date}
                    tPace={run.targetPace}
                    aPace={run.actualPace}
                    dist={run.distance}
                    distUnits={run.distUnits}
                    type={run.type}
                    completed={run.completed}
                    mood={run.mood}
                  />
                );
              }
              if (indx + 1 === currentGoal.runs.length && completedRuns === 0) {
                return <p key={indx}>No Runs Completed Yet</p>;
              }
              return null;
            })}
            {currentGoal.runs.length === 0 ? (
              <p>No Runs Completed Yet</p>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    currentGoal: state.goals.Goals.find(goal => goal.completed === false),
    settings: state.settings
  };
};

export default connect(
  mapStateToProps,
  { getUserGoals, getUserSettings }
)(Home);

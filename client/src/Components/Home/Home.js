import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserGoals } from "../../store/actions/runActions";
import { getUserSettings } from "../../store/actions/settingsActions";
import {setUnitConv} from '../Utils/helpers';
import GoalTile from '../Runs/GoalTile';
import PropTypes from "prop-types";
import UpcomingRuns from "../Runs/UpcomingRuns";
import CompletedRuns from "../Runs/CompletedRuns";
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
    let {distConv} = setUnitConv(this.props.settings.distUnits, currentGoal.distUnits);
    let newRuns = 0;
    let completedRuns = 0;
    const addGoalBtn = <Link to={{pathname: "/add/goal", state: {type: "goal"}}}>
                        <button className="add-goal m-2">+Goal</button>
                      </Link>;
    const addRunBtn = <Link className="d-flex" to="/add/run">
                        <button className="title-bar__add-run">+Run</button>
                      </Link>;
    return (
      <div className="home">
        <div className="title-blk title-blk--progress d-flex justify-start align-center">
        <h5 className="title-blk__prog-title">Progress</h5>
          {currentGoal === this.state.noGoal ? addGoalBtn : null}
        </div>
        <div className="goal-container container">
          <GoalTile
            name={currentGoal.name}
            goalID={currentGoal._id}
            goalType={currentGoal.goalType}
            raceDay={currentGoal.raceDay}
            tPace={currentGoal.targetPace}
            goalDist={currentGoal.goalDist}
            goalDistUnits={currentGoal.distUnits}
            completed={false}
            />
          <div className="visual-progress">
           <p className="start-pos">|</p>
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
        <UpcomingRuns goal={currentGoal}/>
        <CompletedRuns goal={currentGoal} userID={this.props.auth.user._id} />
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

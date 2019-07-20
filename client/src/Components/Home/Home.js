import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserGoals } from "../../store/actions/runActions";
import { getUserSettings } from "../../store/actions/settingsActions";
import { setUnitConv } from "../Utils/helpers";
import smoothscroll from 'smoothscroll-polyfill';
import GoalTile from "../Runs/GoalTile";
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
      goalType: "None",
      goalDist: 0,
      distUnits: this.props.settings.distUnits,
      runs: [],
      progress: 0
    },
    modal: false
  };
  componentDidMount() {
    smoothscroll.polyfill();
    window.scrollTo(0,0);
    if (this.props.auth.isAuthenticated && !this.props.auth.isLoading && !this.props.goals._id) {
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

  rabbitProgressMove = (currentGoal, progressEl) => {
    let width = 0;
    if (progressEl) {
      width = progressEl.offsetWidth;
    }
    document.documentElement.style.setProperty(
      "--rabbit-x",
      (parseFloat(currentGoal.progress) / 100) * (width - 100) + "px"
    );
  };

  render() {
    smoothscroll.polyfill();
    window.scrollTo(0,0);
    if (this.props.auth.isAuthenticated === null) {
      return <Redirect to="/login" />;
    }
    const currentGoal = this.props.currentGoal ? this.props.currentGoal : this.state.noGoal;
    let progressEl = document.querySelector(".visual-progress");
    this.rabbitProgressMove(currentGoal, progressEl);
    let { distConv } = setUnitConv(currentGoal.distUnits, this.props.settings.distUnits);
    const addGoalBtn = (
      <Link to={{ pathname: "/add/goal", state: { type: "goal" } }}>
        <button className="add-goal m-2">+Goal</button>
      </Link>
    );
    return (
      <div className="home">
        <div className="title-blk title-blk--progress d-flex justify-content-between align-items-center">
          <h5 className="title-blk__prog-title"><strong>Progress</strong></h5>
          {currentGoal === this.state.noGoal ? addGoalBtn : null}
        </div>
        <div className="goal-container my-container">
          <GoalTile
            name={currentGoal.name}
            goalID={currentGoal._id}
            goalType={currentGoal.goalType}
            raceDay={currentGoal.raceDay}
            tPace={currentGoal.targetPace}
            goalDist={currentGoal.goalDist}
            distUnits={currentGoal.distUnits}
            completed={false}
          />
          <div className="visual-progress">
            <p className="start-pos">|</p>
            <div className="rabbit-percent">
              <p className="rabbit-percent__percent">{`${currentGoal.progress}%`}</p>
              <p>&#9660;</p>
              <img className="rabbit-percent__rabbit" src={progressRbbt} alt="white rabbit" />
            </div>
            <div className="tree-goal">
              <p className="tree-goal__goal">
                {`${(currentGoal.goalDist * distConv).toFixed(2)} ${this.props.settings.distUnits}`}
              </p>
              <img className="tree-goal__tree" src={progressTree} alt="tree" />
            </div>
          </div>
        </div>
        <UpcomingRuns goal={currentGoal} />
        <CompletedRuns goal={currentGoal} userID={this.props.auth.user._id} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    currentGoal: state.goals.Goals.find((goal) => goal.completed === false),
    goals: state.goals,
    settings: state.settings
  };
};

// const MemoHome = React.memo((prevProps, nextProps) => {
//   console.log(prevProps.currentGoal, nextProps.currentGoal)
//     if (prevProps.currentGoal !== nextProps.currentGoal){
//       return true;
//     }
//     return false;
// })

export default connect(
  mapStateToProps,
  { getUserGoals, getUserSettings }
)(Home);

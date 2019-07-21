import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getUserGoals } from "../../store/actions/runActions";
import { getUserSettings } from "../../store/actions/settingsActions";
import smoothscroll from "smoothscroll-polyfill";
import GoalTile from "../Runs/Tiles/GoalTile";
import PropTypes from "prop-types";
import RunList from "../Runs/Lists/RunList";
import VisualProg from "./VisualProg";
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
    window.scrollTo(0, 0);
    if (this.props.auth.isAuthenticated && !this.props.auth.isLoading && !this.props.goals._id) {
      this.props.getUserGoals(this.props.auth.user._id);
      this.props.getUserSettings(this.props.auth.user._id);
    }
  }

  static propTypes = {
    getUserGoals: PropTypes.func.isRequired,
    getUserSettings: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    goals: PropTypes.object,
    settings: PropTypes.object.isRequired
  };

  render() {
    smoothscroll.polyfill();
    window.scrollTo(0, 0);
    if (this.props.auth.isAuthenticated === null) {
      return <Redirect to="/login" />;
    }
    const currentGoal = this.props.currentGoal ? this.props.currentGoal : this.state.noGoal;
    const addGoalBtn = (
      <Link to={{ pathname: "/add/goal", state: { type: "goal" } }}>
        <button className="add-goal m-2">+Goal</button>
      </Link>
    );
    return (
      <div className="home">
        <div className="title-blk title-blk--progress d-flex justify-content-between align-items-center">
          <h5 className="title-blk__prog-title">
            <strong>Progress</strong>
          </h5>
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
          <VisualProg currentGoal={currentGoal} settingUnits={this.props.settings.distUnits}/>
        </div>
        <RunList goal={currentGoal} userID={this.props.auth.user._id} type="upcoming" />
        <RunList goal={currentGoal} userID={this.props.auth.user._id} type="completed" />
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

export default connect(mapStateToProps,{ getUserGoals, getUserSettings })(Home);

import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CurrStatsCrd from "./CurrStatsCrd";
import GoalCrd from "./GoalCrd";
import OverAllStats from "./OverallStats";
import "./Stats.css";

function Stats(props) {
  Stats.propTypes = {
    goals: PropTypes.array,
    distUnits: PropTypes.string
  };
  let currGoal = props.goals.find((goal) => goal.completed === false)
    ? props.goals.find((goal) => goal.completed === false)
    : { runs: [] };
  const allGoals = props.goals.map((goal) => goal);
  return (
    <div className="stats-container">
      <div className="clouds-bg" />
      <div className="stats">
        <div className="title-blk title-blk--stats d-flex justify-start align-center">
            <h5 className="title-blk__title--stats"><strong>Current Stats</strong></h5>
          </div>
        <div className="stats-goals">
          <CurrStatsCrd goal={currGoal} goalUnits={currGoal.distUnits} settingUnits={props.distUnits} />
          <h5>Goals</h5>
          {allGoals.map((goal) => {
            return (
              <GoalCrd
                key={goal._id}
                id={goal._id}
                name={goal.name}
                complete={goal.completed}
                distUnits={props.distUnits}
              />
            );
          })}
        </div>
      </div>
      <div>
        <img className="stats-rabbit" src={require("../../images/sign.png")} alt="Rabbit"/>
        <div className="overall-stats-container">
          <OverAllStats goals={allGoals} settingUnits={props.distUnits} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    goals: state.goals.Goals,
    distUnits: state.settings.distUnits
  };
};

export default connect(mapStateToProps)(Stats);

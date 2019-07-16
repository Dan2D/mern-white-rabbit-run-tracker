import React from "react";
import { connect } from "react-redux";
import CurrStatsCrd from "./CurrStatsCrd";
import GoalCrd from "./GoalCrd";
import OverAllStats from './OverallStats';
import './Stats.css';

function Stats(props) {
    let currGoal = props.goals.find(goal => goal.completed === false) ? props.goals.find(goal => goal.completed === false) : {runs: []};
    const allGoals = props.goals.map(goal => goal);
  return (
    <div className="stats-container container">
        <div className="stats-goals">
          <CurrStatsCrd goal={currGoal} goalUnits={currGoal.distUnit} settingUnits={props.distUnits}/>
          <h5>Goals</h5>
          {allGoals.map(goal => {
              return (
                <GoalCrd key={goal._id} id={goal._id} name={goal.name} complete={goal.completed} distUnits={props.distUnits}/>
              );
          })}
      </div>
      <div className="overall-stats-container">
          <OverAllStats goals={allGoals} settingUnits={props.distUnits} />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    goals: state.goals.Goals,
    distUnits: state.settings.distUnits
  };
};

export default connect(mapStateToProps)(Stats);

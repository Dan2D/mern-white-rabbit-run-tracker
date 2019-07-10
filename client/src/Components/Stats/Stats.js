import React from "react";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import CurrStatsCrd from "./CurrStatsCrd";
import GoalCrd from "./GoalCrd";
import OverAllStats from './OverallStats';
import './Stats.css';

function Stats(props) {
    const allGoals = [props.currGoal, ...props.pastGoals];
    let units = props.distUnits;
  return (
    <div className="stats-container container">
        <div className="stats-goals">
        <CurrStatsCrd goal={props.currGoal} distUnits={units}/>
        <h5>Goals</h5>
        {allGoals.map(goal => {
            return (
              <GoalCrd key={goal.id} id={goal.id} name={goal.name} complete={goal.completed} distUnits={units}/>
            );
        })}
      </div>
      <div className="overall-stats-container">
          <OverAllStats goals={allGoals} distUnits={props.distUnits} />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currGoal: state.goals.currentGoal,
    pastGoals: [...state.goals.pastGoals],
    distUnits: state.goals.distUnits
  };
};

export default connect(mapStateToProps)(Stats);

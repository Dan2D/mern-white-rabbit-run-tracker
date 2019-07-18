import React, { Component } from "react";
import GoalTile from '../Runs/GoalTile';
import UpcomingRuns from "../Runs/UpcomingRuns";
import CompletedRuns from "../Runs/CompletedRuns";
import {delGoal} from '../../store/actions/runActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Stats.css'

class StatsDetail extends Component {
    state = {
        statGoal: {
          name: "",
            raceDay: "",
            runs: []
        }
    }
    static propTypes = {
      delGoal: PropTypes.func.isRequired,
      userGoalsID: PropTypes.string.isRequired,
      goals: PropTypes.array.isRequired,
      distUnits: PropTypes.string.isRequired

    }
    componentDidMount(){
        const id = this.props.match.params.id;
        let statGoal = this.props.goals.filter(goal => goal._id === id)
        this.setState({statGoal: statGoal[0]})
    }
    handleDeleteGoal = (e) => {
      this.props.delGoal(this.props.userGoalsID, this.props.match.params.id);
      e.target.parentElement.click();
    }
  render() {
    let goal = this.props.goals.find(goal => goal._id === this.props.match.params.id);
    return (
            <div className="stats-detail-container">
              <div className="stats-title-blk stats-title-blk--goal d-flex mb-3">
                <p><strong>Goal</strong></p>
                <p><strong>Status: </strong>{goal.completed ? "Completed" : "In Progress ..."}</p>
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
              <CompletedRuns goal={goal} userID={this.props.userGoalsID}/>
             
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      userGoalsID: state.goals._id,
      goals: [...state.goals.Goals],
      distUnits: state.settings.distUnits
    }
}

export default connect(mapStateToProps, {delGoal})(StatsDetail);

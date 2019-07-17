import React, { Component } from "react";
import RunTile from '../Runs/RunTile';
import GoalTile from '../Runs/GoalTile';
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
    console.log(this.state.statGoal)
    const finishGoalBtn = <Link to={`/complete/goal/${this.props.match.params.id}`}>
                            <button className="btn btn-info goal-nav__btn">Finish Goal>></button>
                          </Link>;
    let goal = this.props.goals.find(goal => goal._id === this.props.match.params.id);
    return (
            <div className="stats-detail-container">
              <GoalTile
              name={this.state.statGoal.name}
              goalType={this.state.statGoal.goalType}
              raceDay={this.state.statGoal.raceDay}
              tPace={this.state.statGoal.targetPace}
              goalDist={this.state.statGoal.goalDist}
              aPace={this.state.statGoal.actualPace}
              mood={this.state.statGoal.mood}
              progress={this.state.statGoal.progress}
              completed={this.state.statGoal.completed}
              distUnits={this.state.statGoal.distUnits}
              />
              <div className="goal-nav">
                {this.state.statGoal.completed ? null : finishGoalBtn}
                <Link to={`/edit/goal/${this.props.match.params.id}`}>
                  <button className="btn btn-dark goal-nav__btn">Edit</button>
                </Link>
                <Link to="/">
                  <button className="btn btn-dark goal-nav__btn" onClick={(e) => this.handleDeleteGoal(e)}>Delete Goal?</button>
                </Link>
              </div>
                <div className="stats-title-blk stats-title-blk--goal d-flex mb-3">
                    <p><strong>{goal.name}</strong></p>
                    <p>{`Status: ${goal.completed ? "Completed" : "In Progress ..."}`}</p>
                </div>
                <div className="stats-detail-data container">
                {goal.runs.map((run, indx) => {
                  return (
                    <RunTile
                    key={run._id}
                    userID={this.props.userGoalsID}
                    goalID={this.state.statGoal._id}
                    runID={run._id}
                    name={run.name}
                    date={run.date}
                    tPace={run.targetPace}
                    aPace={run.actualPace}
                    dist={run.runDist}
                    goalDistUnits={run.distUnits}
                    type={run.runType}
                    completed={run.completed}
                    mood={run.mood}
                    />
                  );
                })
            }
            </div>
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

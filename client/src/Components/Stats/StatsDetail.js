import React, { Component } from "react";
import RunTile from '../Runs/RunTile';
import {delGoal} from '../../store/actions/runActions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Stats.css'

class StatsDetail extends Component {
    state = {
        statGoal: {
            runs: []
        }
    }
    componentDidMount(){
      console.log("COMPONENT MOUNTED")
        const id = this.props.match.params.id;
        let statGoal = this.props.goals.filter(goal => goal._id === id)
        this.setState({statGoal: statGoal[0]})
    }
    handleDeleteGoal = (e) => {
      this.props.delGoal(this.props.userGoalsID, this.props.match.params.id);
      e.target.parentElement.click();
    }
  render() {
    const finishGoalBtn = <Link to={`/complete/goal/${this.props.match.params.id}`}>
                            <button className="btn btn-info goal-nav__btn">Finish Goal>></button>
                          </Link>;
    let goal = this.props.goals.find(goal => goal._id === this.props.match.params.id);
    console.log(goal);
    return (
            <div className="stats-detail-container">
              <div className="goal-nav">
                {this.state.statGoal.completed ? null : finishGoalBtn}
                <Link to={`/edit/goal/${this.props.match.params.id}`}>
                  <button className="btn btn-dark goal-nav__btn">Edit</button>
                </Link>
                <Link to="/">
                  <button className="btn btn-dark goal-nav__btn" onClick={(e) => this.handleDeleteGoal(e)}>Delete Goal?</button>
                </Link>
              </div>
                <div className="title-blk title-blk--goal d-flex mb-3">
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
                    dist={run.distance}
                    distUnit={run.distUnit}
                    type={run.type}
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

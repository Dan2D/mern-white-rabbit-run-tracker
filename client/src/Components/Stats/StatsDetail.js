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
        const id = this.props.match.params.id;
        let statGoal = this.props.goals.filter(goal => goal._id === id)
        this.setState({statGoal: statGoal[0]})
    }
    handleDeleteGoal = (e) => {
      this.props.delGoal(this.props.userGoalsID, this.props.match.params.id);
      e.target.parentElement.click();
    }
  render() {

    return (
            <div className="stats-detail-container">
              <div>
                <Link to={`/edit/goal/${this.props.match.params.id}`}>
                  <button>Edit</button>
                </Link>
                <Link to="/">
                  <button onClick={(e) => this.handleDeleteGoal(e)}>Delete Goal?</button>
                </Link>
              </div>
                <div className="title-blk title-blk--goal d-flex">
                    <p><strong>{this.state.statGoal.name}</strong></p>
                    <p>{`Status: ${this.state.statGoal.completed ? "Completed" : "In Progress ..."}`}</p>
                </div>
                <div className="stats-detail-data container">
                {this.state.statGoal.runs.map((run, indx) => {
                  return (
                    <RunTile
                      key={run._id}
                      runId={run._id}
                      name={run.name}
                      date={run.date}
                      tPace={run.targetPace}
                      aPace={run.actualPace}
                      dist={run.distance}
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
        distUnits: state.goals.distUnits
    }
}

export default connect(mapStateToProps, {delGoal})(StatsDetail);

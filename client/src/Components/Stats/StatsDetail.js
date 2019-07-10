import React, { Component } from "react";
import RunTile from '../Runs/RunTile';
import {connect} from 'react-redux';
import './Stats.css'

class StatsDetail extends Component {
    state = {
        statGoal: {
            runs: []
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id;
        let statGoal = this.props.goals.filter(goal => goal.id === id)
        this.setState({statGoal: statGoal[0]})
    }
  render() {

    return (
            <div className="stats-detail-container">
                <div className="title-blk title-blk--goal d-flex">
                    <p><strong>{this.state.statGoal.name}</strong></p>
                    <p>{`Status: ${this.state.statGoal.completed ? "Completed" : "In Progress ..."}`}</p>
                </div>
                <div class="stats-detail-data container">
                {this.state.statGoal.runs.map((run, indx) => {
                  return (
                    <RunTile
                      key={run.id}
                      runId={run.id}
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
        goals: [state.goals.currentGoal, ...state.goals.pastGoals],
        distUnits: state.goals.distUnits
    }
}

export default connect(mapStateToProps)(StatsDetail);

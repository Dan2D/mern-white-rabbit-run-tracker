import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import RunTile from "../Runs/RunTile";
import progressRbbt from "../../images/progress-rabbit.png";
import progressTree from "../../images/progress-tree.png";
import "./Home.css";

class Home extends Component {
  render() {
    let newRuns = 0;
    let completedRuns = 0;
    return (
      <div className="home">
        <h5>Progress</h5>
        <div className="goal-container container">
          {/* Will accept goal and stats from redux state current goal */}
          <h6>{`Goal: ${this.props.currGoal.name}`}</h6>
          <div className="visual-progress">
            <div className="rabbit-percent">
              <p>0%</p>
              <p>&#9660;</p>
              <img
                className="rabbit-percent__rabbit"
                src={progressRbbt}
                alt="white rabbit"
              />
            </div>
            <div className="tree-goal">
              <p className="tree-goal__goal">{`${this.props.currGoal.goalDist}  ${this.props.distUnits}`}</p>
              <img className="tree-goal__tree" src={progressTree} alt="tree" />
            </div>
          </div>
        </div>
        <div className="upcoming-runs">
          <div className="title-blk title-blk--upcoming-runs">
            <h5 className="title-blk__title"><strong>{this.props.currGoal.name}</strong>: Upcoming Runs</h5>
            <Link className="d-flex" to="/add/run">
              <button className="title-bar__add-btn" />
            </Link>
          </div>
          <div className="upcoming-runs__tiles container">
            {this.props.currGoal.runs.map((run, indx) => {
              if (!run.completed){
                newRuns++;
                return (
                  <RunTile
                    key={run.id}
                    runId={run.id}
                    name={run.name}
                    date={run.date}
                    tPace={run.targetPace}
                    dist={run.distance}
                    type={run.type}
                    completed={run.completed}
                  />
                );
              }
              if (indx+1 === this.props.currGoal.runs.length && newRuns === 0){
                return <p key={indx}> No Runs Scheduled!</p>
              }
            })}
            {this.props.currGoal.runs.length === 0 ? <p> No Runs Scheduled!</p> : null}
          </div>
          
        </div>
        <div className="completed-runs">
          <div className="title-blk title-blk--completed-runs">
            <h5 className="title-blk__title"><strong>{this.props.currGoal.name}</strong>: Completed Runs</h5>
          </div>
          <div className="completed-runs__tiles container">
              {this.props.currGoal.runs.map((run, indx) => {
                if (run.completed){
                  completedRuns++;
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
                }
                if (indx+1 === this.props.currGoal.runs.length && completedRuns === 0){
                  return <p key={indx}>No Runs Completed Yet</p>
                }
              })}
              {this.props.currGoal.runs.length === 0 ? <p>No Runs Completed Yet</p> : null}
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state.goals.currentGoal)
  return {
    currGoal: state.goals.currentGoal,
    distUnits: state.goals.distUnits
  };
};

export default connect(mapStateToProps)(Home);

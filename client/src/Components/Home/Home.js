import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {getUserGoals} from '../../store/actions/runActions';
import PropTypes from 'prop-types';
import RunTile from '../Runs/RunTile';
import progressRbbt from '../../images/progress-rabbit.png';
import progressTree from '../../images/progress-tree.png';
import './Home.css';

class Home extends Component {
  state ={
    noGoal: {
      name: "No Current Goal Set", 
      goalDist: 0, 
      runs: []
    },
    modal: false}
    componentDidMount(){
      if (this.props.auth.isAuthenticated && !this.props.auth.isLoading){
        console.log(this.props.auth, "MOUNT")
        this.props.getUserGoals(this.props.auth.user._id);
      }
    }
  componentDidUpdate(prevProps){
      if (this.props.auth.isAuthenticated && !prevProps.auth.isAuthenticated){
        console.log(this.props.auth, "UPDATE")
      this.props.getUserGoals(this.props.auth.user._id);
    }
  }

  static propTypes = {
    getUserGoals: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    goals: PropTypes.object.isRequired,
    distUnits: PropTypes.string.isRequired
  }

  render() {
    if (this.props.isAuthenticated === null){
      return <Redirect to="/login" />
    }
    let currentGoal = this.props.goals.Goals.find(goal => goal.completed === false) ? 
    this.props.goals.Goals.find(goal => goal.completed === false) : this.state.noGoal;

    let newRuns = 0;
    let completedRuns = 0;
    return (
      <div className="home">
       <h5>Progress</h5>
<div className="goal-container container">
  <h6>{`Goal: ${currentGoal.name}`}</h6>
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
      <p className="tree-goal__goal">{`${currentGoal.goalDist}  ${this.props.distUnits}`}</p>
      <img className="tree-goal__tree" src={progressTree} alt="tree" />
    </div>
  </div>
</div>
<div className="upcoming-runs">
  <div className="title-blk title-blk--upcoming-runs">
    <h5 className="title-blk__title"><strong>{currentGoal.name}</strong>: Upcoming Runs</h5>
    <Link className="d-flex" to="/add/run">
      <button className="title-bar__add-btn" />
    </Link>
  </div>
  <div className="upcoming-runs__tiles container">
    {currentGoal.runs.map((run, indx) => {
      if (!run.completed){
        newRuns++;
        return (
          <RunTile
            onFinish={() => this.handleFinishRun()}
            key={run._id}
            goalID={this.props.currGoal._id}
            runID={run._id}
            indx={indx}
            name={run.name}
            date={run.date}
            tPace={run.targetPace}
            dist={run.distance}
            type={run.type}
            completed={run.completed}
          />
        );
      }
      if (indx+1 === currentGoal.runs.length && newRuns === 0){
        return <p key={indx}> No Runs Scheduled!</p>
      }
    })}
    {currentGoal.runs.length === 0 ? <p> No Runs Scheduled!</p> : null}
  </div>
  
</div>
<div className="completed-runs">
  <div className="title-blk title-blk--completed-runs">
    <h5 className="title-blk__title"><strong>{currentGoal.name}</strong>: Completed Runs</h5>
  </div>
  <div className="completed-runs__tiles container">
      {currentGoal.runs.map((run, indx) => {
        if (run.completed){
          completedRuns++;
          return (
            <RunTile
              key={run._id}
              userID={this.props.userID}
              goalID={currentGoal._id}
              runID={run._id}
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
        if (indx+1 === currentGoal.runs.length && completedRuns === 0){
          return <p key={indx}>No Runs Completed Yet</p>
        }
      })}
      {currentGoal.runs.length === 0 ? <p>No Runs Completed Yet</p> : null}
    </div>
  </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    goals: state.goals,
    distUnits: state.settings.distUnits
  };
};

export default connect(mapStateToProps, {getUserGoals})(Home);



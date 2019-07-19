import React, { Component } from "react";
import { setUnitConv, paceConvert } from "../Utils/helpers";
import {delGoal} from '../../store/actions/runActions';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class GoalTile extends Component {

  handleDeleteGoal = (e) => {
    this.props.delGoal(this.props.userGoalsID, this.props.goalID);
    e.target.parentElement.click();
  }

  render() {
    let targetPace = this.props.tPace;
    let actualPace = this.props.Pace;
    let { timeConv, distConv } = setUnitConv(this.props.distUnits, this.props.settingUnits);
    if (timeConv !== distConv){
      targetPace = paceConvert(this.props.tPace, timeConv);
      actualPace = paceConvert(this.props.aPace, timeConv);
    }
    const finishGoalBtn = <Link to={`/complete/goal/${this.props.goalID}`}>
                            <button className="btn btn-info goal-nav__btn">Finish Goal>></button>
                          </Link>;
    if (this.props.goalType === "None"){
      return <p className="noGoal-msg">Set a New Goal To Start!</p>
    }
    return (
      <div className="tile-blk tile-blk--goal">
        <div className="tile-blk__title-bar tile-blk__title-bar--goal">
        <h6><strong>Goal: </strong>{`${this.props.name}`}</h6>
        <div className="title-bar__tile-btns">
            <Link to={{pathname: `/edit/goal/${this.props.goalID}`,
                       state: {goal: this.props.goalID}}}>
              <button className="title-bar__btn edit" />
            </Link>
            <button
              className="title-bar__btn"
              onClick={(e) => this.handleDeleteGoal(e)}
            >
              &times;
            </button>
          </div>
        </div>
        <div className="tile-blk__body">
          <div>
            <h6>
              <strong>Goal Type: </strong>
              {`${this.props.goalType}`}
            </h6>
            <h6>
              <strong>Goal Date: </strong>
              {`${this.props.raceDay.substr(0, 10)}`}
            </h6>
            <h6>
              <strong>Target Pace: </strong>
              {`${targetPace} min / ${this.props.settingUnits}`}
            </h6>
            {this.props.completed ? (
              <h6>
                <strong>Actual Pace: </strong>{" "}
                {`${actualPace} min / ${this.props.settingUnits}`}
              </h6>
            ) : null}
            <h6>
              <strong>Goal Distance: </strong>
              {`${(this.props.goalDist * distConv).toFixed(2)} ${this.props.settingUnits}`}
            </h6>
            {this.props.completed ? (
              <h6>
                <strong>
                  Felt Like:{" "}
                  <img
                    src={require(`../../images/rating-${this.props.mood}.png`)}
                    alt="ratings face"
                  />
                </strong>
              </h6>
            ) : null}
          </div> 
            {this.props.completed ? null : finishGoalBtn}
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userGoalsID: state.auth.user._id,
    settingUnits: state.settings.distUnits
  }
}

export default connect(mapStateToProps, {delGoal})(GoalTile);

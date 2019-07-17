import React, { Component } from "react";
import { setUnitConv, paceConvert } from "../Utils/helpers";
import {connect} from 'react-redux';

class GoalTile extends Component {
  render() {
    console.log(this.props)
    let { timeConv, distConv } = setUnitConv(
      this.props.distUnits,
      this.props.goalDistUnits
    );
    let targetPace = paceConvert(this.props.tPace, timeConv);
    let actualPace = paceConvert(this.props.aPace, timeConv);
    return (
      <div className="goal-tile-container">
        <h6>
          <strong>Goal: </strong>
          {`${this.props.name}`}
        </h6>
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
          {`${targetPace} min / ${this.props.distUnits}`}
        </h6>
        {this.props.completed ? (
          <h6>
            <strong>Actual Pace: </strong>{" "}
            {`${actualPace} min / ${this.props.distUnits}`}
          </h6>
        ) : null}
        <h6>
          <strong>Goal Distance: </strong>
          {`${(this.props.goalDist * distConv).toFixed(2)} ${this.props.distUnits}`}
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
    );
  }
}

const mapStateToProps = state => {
  return {
    distUnits: state.settings.distUnits
  }
}

export default connect(mapStateToProps)(GoalTile);

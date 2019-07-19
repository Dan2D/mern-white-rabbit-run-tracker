import React, { Component } from "react";
import { delRun } from "../../store/actions/runActions";
import { setUnitConv, paceConvert } from "../Utils/helpers";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Runs.css";

class RunTile extends Component {
  static propTypes = {
    delRun: PropTypes.func.isRequired,
    setUnitConv: PropTypes.func,
    paceConvert: PropTypes.func,
    settings: PropTypes.object.isRequired,
    userID: PropTypes.string.isRequired
  };
  render() {
    let targetPace = this.props.tPace;
    let actualPace = this.props.aPace;
    let { timeConv, distConv } = setUnitConv(this.props.distUnits, this.props.settings.distUnits);
    if (timeConv !== distConv){
      targetPace = paceConvert(this.props.tPace, timeConv);
      actualPace = paceConvert(this.props.aPace, timeConv);
    }
    
    let idObj = { userGoalsID: this.props.userID, goalID: this.props.goalID, runID: this.props.runID };
    return (
      <div className="tile-blk" data-id={this.props.runID}>
        <div className="tile-blk__title-bar tile-blk__title-bar--run">
          <h6>{this.props.name}</h6>
          <div className="title-bar__tile-btns">
            <Link to={{ pathname: `/edit/run/${this.props.runID}`, state: { goal: this.props.goalID } }}>
              <button className="title-bar__btn edit" />
            </Link>
            <button className="title-bar__btn" onClick={() => this.props.delRun(idObj)}>
              &times;
            </button>
          </div>
        </div>
        <hr />
        <div className="tile-blk__body">
          <div className="body__text">
            <p>
              <strong>Date: </strong>
              {this.props.date.toString().substr(0, 10)}
            </p>
            <p>
              <strong>Target Pace: </strong>
              {` ${targetPace} min / ${this.props.settings.distUnits}`}
            </p>
            {this.props.completed ? (
              <p>
                <strong>Actual Pace: </strong>
                {`${actualPace} min / ${this.props.settings.distUnits}`}
              </p>
            ) : null}
            <p>
              <strong>Distance: </strong>
              {` ${(this.props.dist * distConv).toFixed(2)} ${this.props.settings.distUnits}`}
            </p>
            <p>
              <strong>Type: </strong>
              {this.props.type}
            </p>
            {this.props.completed ? (
              <p>
                <strong>Felt Like: </strong>
                <img src={require(`../../images/rating-${this.props.mood}.png`)} alt="ratings face" />
              </p>
            ) : null}
          </div>
          {this.props.completed ? null : (
            <Link
              className="align-self-end"
              to={{ pathname: `/complete/run/${this.props.runID}`, state: { goal: this.props.goalID } }}
            >
              <button className="body__complete-btn btn btn-info">Finish Run>></button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userID: state.goals._id,
    settings: state.settings
  };
};

export default connect(
  mapStateToProps,
  { delRun }
)(RunTile);

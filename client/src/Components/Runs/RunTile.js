import React, { Component } from "react";
import { delRun, finishRun } from "../../store/actions/runActions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Runs.css";

class RunTile extends Component {
    // state = {
    //     min: 0,
    //     sec: 0
    // }
    componentDidMount(){
    //    let min = this.props.pace[0]/60000;
    //    let sec = this.props.pace[1]/1000
    //    this.setState({min, sec})
    }
  render() {
    let idObj = {userGoalsID: this.props.userID, goalID: this.props.goalID, runID: this.props.runID};
    return (
      <div className="run-tile" data-id={this.props.runID}>
        <div className="run-tile__title-bar">
          <h5>{this.props.name}</h5>
          <div className="title-bar__tile-btns">
            <Link to={{pathname: `/edit/run/${this.props.runID}`,
                       state: {goal: this.props.goalID}}}>
              <button className="title-bar__btn edit" />
            </Link>
            <button
              className="title-bar__btn"
              onClick={() => this.props.delRun(idObj)}
            >
              &times;
            </button>
          </div>
        </div>
        <hr />
        <div className="run-tile__body">
          <div className="body__text">
            <p>Date: {this.props.date.toString().substr(0,10)}</p>
            <p>Target Pace:{` ${this.props.tPace} min / ${this.props.distUnits}`}</p>
            {this.props.completed ? <p>Actual Pace: {`${this.props.aPace} min / ${this.props.distUnits}`}</p> : null}
            <p> Distance:{` ${this.props.dist} ${this.props.distUnits}`}</p>
            <p>Type: {this.props.type}</p>
            {this.props.completed ? <p>Felt Like: {this.props.mood}</p> : null}
          </div>
          {this.props.completed ? null :
          <Link to={{pathname: `/complete/run/${this.props.runID}`,
                     state: {goal: this.props.goalID}}}>
             <button className="body__complete-btn btn btn-info">
                Finish>>
            </button>
          </Link>
        }

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
      userID: state.goals._id,
        distUnits: state.settings.distUnits
    }
}

export default connect(
  mapStateToProps,
  { delRun, finishRun }
)(RunTile);

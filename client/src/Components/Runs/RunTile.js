import React, { Component } from "react";
import { delRun } from "../../store/actions/runActions";
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
    return (
      <div className="run-tile" data-id={this.props.runId}>
        <div className="run-tile__title-bar">
          <h5>{this.props.name}</h5>
          <div className="title-bar__tile-btns">
            <Link to={`/edit/${this.props.runId}`}>
              <button className="title-bar__btn edit" />
            </Link>
            <button
              className="title-bar__btn"
              onClick={() => this.props.delRun(this.props.runId)}
            >
              &times;
            </button>
          </div>
        </div>
        <hr />
        <div className="run-tile__body">
          <div className="body__text">
            <p>Date: {this.props.date}</p>
            <p>Target Pace:{` ${this.props.tPace} min / ${this.props.distUnits}`}</p>
            {this.props.completed ? <p>Actual Pace: {`${this.props.aPace} min / ${this.props.distUnits}`}</p> : null}
            <p> Distance:{` ${this.props.dist} ${this.props.distUnits}`}</p>
            <p>Type: {this.props.type}</p>
            {this.props.completed ? <p>Felt Like: {this.props.mood}</p> : null}
          </div>
          {this.props.completed ? null :
             <button className="body__complete-btn btn btn-info">
                Finish>>
            </button>}

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        distUnits: state.goals.distUnits
    }
}

export default connect(
  mapStateToProps,
  { delRun }
)(RunTile);

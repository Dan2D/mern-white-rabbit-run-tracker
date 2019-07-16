import React, { Component } from "react";
import {setUnitConv, paceConvert} from '../Utils/helpers';
import PropTypes from 'prop-types';

class CurrStatsCrd extends Component {
  state = {
    lngRun: 0,
    fstRun: 9999000,
    compRuns: 0,
    ttlRuns: 0,
    ttlDist: 0
  };

  static propTypes = {
    setUnitConv: PropTypes.func.isRequired,
    paceConvert: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { runs } = this.props.goal;
    let { lngRun, fstRun, compRuns, ttlRuns, ttlDist } = this.state;
    let runIndx = 0;
    runs.forEach((run, indx) => {
      ttlRuns++;
      if (run.completed) {
        let pace = run.actualPace.split(":");
        pace = parseInt(pace[0] * 60) + parseInt(pace[1]);
        compRuns++;
        ttlDist += run.distance;
        if (run.distance > lngRun) {
          lngRun = run.distance;
        }
        if (pace < fstRun) {
          fstRun = pace;
          runIndx = indx;
        }
      }
    });
    if (compRuns === 0){
      this.setState({fstRun: 0, ttlRuns})
    }
    else {
      this.setState({
        lngRun,
        fstRun: runs[runIndx].actualPace,
        compRuns,
        ttlRuns,
        ttlDist
    })
  }
}
  render() {
    let {timeConv, distConv} = setUnitConv(this.props.settingUnits, this.props.goalUnits);
    let fastRun = paceConvert(this.state.fstRun, timeConv);
    return (
      <div className="curr-stats-container">
        <h5>Current Stats</h5>
        <div className="stat-card stat-card__stats-data">
          <p><strong>Longest Run: </strong>{`${(this.state.lngRun * distConv).toFixed(2)} ${this.props.settingUnits}`}</p>
          <p><strong>Fastest Mile: </strong>{`${fastRun} min / ${this.props.settingUnits}`}</p>
          <p><strong>Completed Runs: </strong>{`${this.state.compRuns} / ${this.state.ttlRuns}`}</p>
          <p><strong>Total Distance: </strong>{`${(this.state.ttlDist * distConv).toFixed(2)} ${this.props.settingUnits}`}</p>
          {this.props.goal.name ? null : <p> No Current Goal Set</p>}
        </div>
      </div>
    );
  }
}

export default CurrStatsCrd;

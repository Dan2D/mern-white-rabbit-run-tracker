import React, { Component } from "react";

class CurrStatsCrd extends Component {
  state = {
    lngRun: 0,
    fstRun: 9999000,
    compRuns: 0,
    ttlDist: 0
  };
  componentDidMount() {
    const { runs } = this.props.goal;
    let { lngRun, fstRun, compRuns, ttlDist } = this.state;
    let spdIndx = 0;
    runs.forEach((run, indx) => {
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
          spdIndx = indx;
        }
      }
    });
    this.setState({
      lngRun,
      fstRun: runs[spdIndx].actualPace,
      compRuns,
      ttlRuns: runs.length,
      ttlDist
    });
  }
  render() {
    return (
      <div className="curr-stats-container">
        <h5>Current Stats</h5>
        <div className="stat-card stat-card__stats-data">
          <p><strong>Longest Run: </strong>{`${this.state.lngRun} ${this.props.distUnits}`}</p>
          <p><strong>Fastest Mile: </strong>{`${this.state.fstRun} min / ${this.props.distUnits}`}</p>
          <p><strong>Completed Runs: </strong>{`${this.state.compRuns} / ${this.state.ttlRuns}`}</p>
          <p><strong>Total Distance: </strong>{`${this.state.ttlDist} ${this.props.distUnits}`}</p>
        </div>
      </div>
    );
  }
}

export default CurrStatsCrd;

import React, { Component } from "react";

class CurrStatsCrd extends Component {
  state = {
    lngRun: 0,
    fstRun: 9999000,
    compRuns: 0,
    ttlRuns: 0,
    ttlDist: 0
  };
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
      this.setState({fstRun: 0})
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
    let kmConv = 1;
    if (this.props.distUnits === "km"){
      kmConv = 1.61;
    }
    return (
      <div className="curr-stats-container">
        <h5>Current Stats</h5>
        <div className="stat-card stat-card__stats-data">
          <p><strong>Longest Run: </strong>{`${(this.state.lngRun*kmConv).toFixed(2)} ${this.props.distUnits}`}</p>
          <p><strong>Fastest Mile: </strong>{`${this.state.fstRun} min / ${this.props.distUnits}`}</p>
          <p><strong>Completed Runs: </strong>{`${this.state.compRuns} / ${this.state.ttlRuns}`}</p>
          <p><strong>Total Distance: </strong>{`${(this.state.ttlDist*kmConv).toFixed(2)} ${this.props.distUnits}`}</p>
          {this.props.goal.name ? null : <p> No Current Goal Set</p>}
        </div>
      </div>
    );
  }
}

export default CurrStatsCrd;

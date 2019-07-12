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
    console.log(this.props.goal, "GOAL")
    const { runs } = this.props.goal;
    let { lngRun, fstRun, compRuns, ttlRuns, ttlDist } = this.state;
    let runIndx = 0;
    runs.forEach((run, indx) => {
      ttlRuns++;
      if (run.completed) {
        console.log("completed")
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
      console.log("ELSE")
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

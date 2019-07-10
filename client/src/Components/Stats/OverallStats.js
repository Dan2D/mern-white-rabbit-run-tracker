import React, { Component } from "react";

class overAllStats extends Component {
  state = {
    lngRun: 0,
    fstRun: 9999000,
    compRuns: 0,
    ttlDist: 0
  };
  componentDidMount() {
    let { lngRun, fstRun, compRuns, ttlDist } = this.state;
    let goalIndx, runIndx;
        this.props.goals.forEach((goal, gIndx) => {
            goal.runs.forEach((run, indx) => {
                if (run.completed){
                    let pace = run.actualPace.split(":");
                    pace = pace[0]*60 + pace[1];
                    compRuns++;
                    ttlDist+= run.distance

                    if (run.distance >lngRun){
                        lngRun = run.distance;
                    }
                    if (pace < fstRun){
                        fstRun = pace;
                        runIndx = indx;
                        goalIndx = gIndx;
                    }
                }
            })
        })
        this.setState({
            lngRun,
            fstRun: this.props.goals[goalIndx].runs[runIndx].actualPace,
            compRuns,
            ttlDist
        })
    }

  render() {
    return (
      <div className="overall-stats-container mb-50">
        <h5>Overall Stats</h5>
        <div className="stat-card stat-card__stats-data">
          <p><strong>Longest Run: </strong>{`${this.state.lngRun} ${this.props.distUnits}`}</p>
          <p><strong>Fastest Mile: </strong>{`${this.state.fstRun} min / ${this.props.distUnits}`}</p>
          <p><strong>Completed Runs: </strong>{` ${this.state.compRuns}`}</p>
          <p><strong>Total Distance: </strong>{`${this.state.ttlDist} ${this.props.distUnits}`}</p>
        </div>
      </div>
    );
  }
}


export default overAllStats;

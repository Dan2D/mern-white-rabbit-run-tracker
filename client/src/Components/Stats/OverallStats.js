import React, { Component } from "react";

class overAllStats extends Component {
  state = {
    lngRun: 0,
    fstRun: 9999000,
    compRuns: 0,
    ttlDist: 0
  };
  componentDidMount() {
    return this.getOverallStats(); 
    }

    getOverallStats = () => {
      let { lngRun, fstRun, compRuns, ttlDist } = this.state;
      let goalIndx, runIndx;
        this.props.goals.forEach((goal, gIndx) => {
            goal.runs.forEach((run, rIndx) => {
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
                        runIndx = rIndx;
                        goalIndx = gIndx;
                    }
                }
            })
        })
        if (compRuns === 0){
          this.setState({fstRun: 0})
        }
        else {
          this.setState({
            lngRun,
            fstRun: this.props.goals[goalIndx].runs[runIndx].actualPace,
            compRuns,
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
      <div className="overall-stats-container mb-50">
        <h5>Overall Stats</h5>
        <div className="stat-card stat-card__stats-data">
        <p><strong>Longest Run: </strong>{`${(this.state.lngRun*kmConv).toFixed(2)} ${this.props.distUnits}`}</p>
          <p><strong>Fastest Mile: </strong>{`${this.state.fstRun} min / ${this.props.distUnits}`}</p>
          <p><strong>Completed Runs: </strong>{`${this.state.compRuns}`}</p>
          <p><strong>Total Distance: </strong>{`${(this.state.ttlDist*kmConv).toFixed(2)} ${this.props.distUnits}`}</p>
        </div>
      </div>
    );
  }
}


export default overAllStats;

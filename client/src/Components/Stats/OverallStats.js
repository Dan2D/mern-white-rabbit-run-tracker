import React, { Component } from "react";
import {setUnitConv, paceConvert} from '../Utils/helpers';
import PropTypes from 'prop-types';

class overAllStats extends Component {
  state = {
    lngRun: 0,
    fstRun: 9999000,
    compRuns: 0,
    ttlDist: 0
  };

  static propTypes = {
    setUnitConv: PropTypes.func,
    paceConvert: PropTypes.func
  }

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
                    ttlDist+= run.runDist
                    if (run.runDist >lngRun){
                        lngRun = run.runDist;
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
      let {timeConv, distConv} = setUnitConv(this.props.settingUnits, this.props.goals[0].distUnits);
      let fastRun = paceConvert(this.state.fstRun, timeConv);
  
      return (
        <div className="overall-stats-tile container mb-50">
          <h5>Overall Stats</h5>
          <div className="stat-card stat-card__stats-data">
          <p><strong>Longest Run: </strong>{`${(this.state.lngRun * distConv).toFixed(2)} ${this.props.settingUnits}`}</p>
            <p><strong>Fastest Mile: </strong>{`${fastRun} min / ${this.props.settingUnits}`}</p>
            <p><strong>Completed Runs: </strong>{`${this.state.compRuns}`}</p>
            <p><strong>Total Distance: </strong>{`${(this.state.ttlDist * distConv).toFixed(2)} ${this.props.settingUnits}`}</p>
          </div>
        </div>
      );
    }
  }
  


export default overAllStats;

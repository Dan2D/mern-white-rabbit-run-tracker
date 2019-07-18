import React, { Component } from "react";
import { finishRun } from "../../store/actions/runActions";
import {setUnitConv, paceConvert, validatePace} from '../Utils/helpers';
import rating1 from '../../images/rating-1.png'
import rating2 from '../../images/rating-2.png'
import rating3 from '../../images/rating-3.png'
import rating4 from '../../images/rating-4.png'
import rating5 from '../../images/rating-5.png'
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import "./Runs.css";



class FinishRun extends Component {
    state = {
        date: new Date(),
        actualPace: "",
        runMood: "3",
        aPaceMsg: null
    }

    static propTypes = {
      finishRun: PropTypes.func.isRequired,
      validatePace: PropTypes.func.isRequired,
      goals: PropTypes.object.isRequired,
      distUnits: PropTypes.string.isRequired
    }

    componentDidMount(){
        const goal = this.props.goals.Goals.find(goal => goal._id === this.props.location.state.goal);
        const id = this.props.match.params.id;
        const run = goal.runs.find(run => run._id === id);
        const runIndx = goal.runs.indexOf(run);
        const {name, date, targetPace, runDist, runType, distUnits} = run;
        this.setState({
            id,
            name,
            date: new Date(date),
            targetPace,
            runDist,
            runType,
            distUnits,
            goalUnits: goal.distUnits,
            runIndx
        })
    }

  handleSubmit = (e) => {
    e.preventDefault();
    let {actualPace} = this.state;
    this.setState({aPaceMsg: null});
    this.setState({aPaceMsg: validatePace(actualPace)})
    if (validatePace(actualPace) !== null ){
      return null;
    }
    const { timeConv} = setUnitConv(this.state.distUnits, this.props.settingUnits);
    actualPace = paceConvert(actualPace, timeConv);
    debugger;
    const finishedRun = {
      userGoalsID: this.props.goals._id,
      goalID: this.props.location.state.goal,
      runID: this.state.id,
      actualPace: actualPace,
      mood: this.state.runMood,
      runDist: this.state.runDist,
      distUnits: this.state.distUnits,
      goalUnits: this.state.goalUnits,
      runIndx: this.state.runIndx
    };
    this.props.finishRun(finishedRun);
    e.target.parentElement.click();
}

handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
}

  render() {
    const { timeConv, distConv } = setUnitConv(this.props.settingUnits, this.state.distUnits);
    const targetPace = paceConvert(this.state.targetPace, timeConv);
    return (
      <div className="format-run container">
        <form onSubmit={e => this.handleSubmit(e)}>
            <p><strong>Run: </strong>{this.state.name}</p>
            <p><strong>Date: </strong>{this.state.date.toString().substr(0,15)}</p>
            <p><strong>Target Pace: </strong>{` ${targetPace} min / ${this.props.settingUnits}`}</p>
            <p><strong>Distance: </strong>{` ${(this.state.runDist * distConv).toFixed(2)} ${this.props.settingUnits}`}</p>
            <p><strong>Type: </strong>{this.state.runType}</p>
            <div className="">
            <p><strong>Actual Pace</strong> (mm:ss)</p>
            <input type="text" required onChange={(e) => this.handleChange(e)} name="actualPace" value={this.state.actualPace}/>
            <p className="error-msg">{this.state.aPaceMsg}</p>
            </div>
            <p>How Did Your Run Feel?</p>
            <div className="form-group">
                <fieldset className=" d-flex justify-content-between" onChange={(e) => this.handleChange(e)}>
                    <label className="d-flex flex-column rating-radio"><img src={rating1} alt="mad face"/><input type="radio" name="runMood" value="1" checked={this.state.runMood === "1"}/></label>
                    <label className="d-flex flex-column rating-radio"><img src={rating2} alt="sad face"/><input type="radio" name="runMood" value="2" checked={this.state.runMood === "2"}/></label>
                    <label className="d-flex flex-column rating-radio"><img src={rating3} alt="meh face"/><input type="radio" name="runMood" value="3" checked={this.state.runMood === "3"}/></label>
                    <label className="d-flex flex-column rating-radio"><img src={rating4} alt="happy face"/><input type="radio" name="runMood" value="4" checked={this.state.runMood === "4"}/></label>
                    <label className="d-flex flex-column rating-radio"><img src={rating5} alt="very happy face"/><input type="radio" name="runMood" value="5" checked={this.state.runMood === "5"}/></label>
                </fieldset>
            </div>

          <Link to="/">
            <button type="submit" className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Complete Run</button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        goals: state.goals,
        settingUnits: state.settings.distUnits
    }
}


export default connect(mapStateToProps, {finishRun})(FinishRun);

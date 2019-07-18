import React, { Component, Fragment } from "react";
import { editRun } from "../../store/actions/runActions";
import {setUnitConv, paceConvert} from '../Utils/helpers';
import {validateTitle, validatePace, validateDist} from '../Utils/helpers';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Runs.css";



class EditRun extends Component {
    state = {
      name: "",
      date: new Date(),
      targetPace: "",
      actualPace: "",
      runDist: "",
      runType: 'Long Distance',
      ttlMsg: null,
      tPaceMsg: null,
      distMsg: null,
      aPaceMsg: null
    }

    static propTypes = {
      editRun: PropTypes.func.isRequired,
      validateTitle: PropTypes.func.isRequired,
      validatePace: PropTypes.func.isRequired,
      validateDist: PropTypes.func.isRequired,
      setUnitConv: PropTypes.func.isRequired,
      paceConvert: PropTypes.func.isRequired,
      userGoalsID: PropTypes.string.isRequired,
      goals: PropTypes.object.isRequired,
      settings: PropTypes.object.isRequired
    }

    componentDidMount(){
        const goal = this.props.goal.find(goal => goal._id === this.props.location.state.goal);
        const id = this.props.match.params.id;
        const run = goal.runs.find(run => run._id === id);
        let {timeConv, distConv} = setUnitConv(this.props.settings.distUnits, run.distUnits);
        const runIndx = goal.runs.indexOf(run);
        const {name, date, targetPace, actualPace, runDist, runType, completed, mood} = run;
        this.setState({
            id,
            name,
            date: new Date(date),
            targetPace: paceConvert(targetPace, timeConv),
            actualPace: paceConvert(actualPace, timeConv),
            runDist: (runDist*distConv).toFixed(2),
            distUnits: this.props.settings.distUnits,
            runType,
            completed,
            runMood: mood.toString(),
            runIndx
        })
    }


  handleSubmit = e => {
    e.preventDefault();
    const {name, targetPace, runDist, actualPace} = this.state;
    this.setState({ttlMsg: null, tPaceMsg: null, distMsg: null, aPaceMsg: null});
    this.setState({ttlMsg: validateTitle(name)});
    this.setState({tPaceMsg: validatePace(targetPace)});
    this.setState({aPaceMsg: validatePace(actualPace)});
    this.setState({distMsg: validateDist(runDist)});
    if (validateTitle(name) !== null || validatePace(targetPace) !== null || validateDist(runDist) !== null ||validatePace(actualPace) !== null){
      return null;
    }
    const updatedRun = {
      userGoalsID: this.props.userGoalsID,
      goalID: this.props.location.state.goal,
      id: this.state.id,
      name: this.state.name,
      date: this.state.date.toISOString().substr(0,10),
      targetPace: this.state.targetPace,
      actualPace: this.state.actualPace,
      runDist: this.state.runDist,
      distUnits: this.state.distUnits,
      runType: this.state.runType,
      completed: this.state.completed,
      mood: this.state.runMood,
      runIndx: this.state.runIndx
    };
    this.props.editRun(updatedRun);
    e.target.parentElement.click();
}

  handleChange = e => {
      this.setState({[e.target.name]: e.target.value})
  };

  handleDateChange = (date) => {
      this.setState({date});
  }

  render() {
    const runTypes = [
      "Long Distance",
      "Short Distance",
      "Speed Run",
      "Trail Run",
      "Hills",
      "Intervals"
    ];
    let finishedStats = <Fragment>
                          <label htmlFor="pace"><strong>Actual Pace</strong> (mm:ss)</label>
                          <input className="form-control mb-3" onChange={(e) => this.handleChange(e)} type="text" name="actualPace" value={this.state.actualPace} />
                          <p className="error-msg">{this.state.aPaceMsg}</p>  
                          <p>How Did Your Run Feel?</p>
                          <div className="form-group">
                            <fieldset className=" d-flex justify-content-between">
                            <label className="d-flex flex-column rating-radio"><img src={require('../../images/rating-1.png')} alt="mad face"/><input type="radio" name="runMood" value="1" checked={this.state.runMood === "1"} onChange={(e) => this.handleChange(e)}/></label>
                                <label className="d-flex flex-column rating-radio"><img src={require('../../images/rating-2.png')} alt="sad face"/><input type="radio" name="runMood" value="2" checked={this.state.runMood === "2"} onChange={(e) => this.handleChange(e)}/></label>
                                <label className="d-flex flex-column rating-radio"><img src={require('../../images/rating-3.png')} alt="meh face"/><input type="radio" name="runMood" value="3" checked={this.state.runMood === "3"} onChange={(e) => this.handleChange(e)}/></label>
                                <label className="d-flex flex-column rating-radio"><img src={require('../../images/rating-4.png')} alt="happy face"/><input type="radio" name="runMood" value="4" checked={this.state.runMood === "4"} onChange={(e) => this.handleChange(e)}/></label>
                                <label className="d-flex flex-column rating-radio"><img src={require('../../images/rating-5.png')} alt="very happy face"/><input type="radio" name="runMood" value="5" checked={this.state.runMood === "5"} onChange={(e) => this.handleChange(e)}/></label>
                            </fieldset>
                        </div>
                      </Fragment>
    return (
      <div className="format-run container">
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="form-group">
            <label htmlFor="name"><strong>Run</strong></label>
            <input
              className="form-control"
              type="text"
              required
              onChange={this.handleChange}
              name="name"
              placeholder="Title"
              value={this.state.name}
            />
            <p className="error-msg">{this.state.ttlMsg}</p>  
          </div>
          <div className="form-group">
            <label htmlFor="name" style={{ display: "block" }}>
            <strong>Date</strong>
            </label>
            <DatePicker
              className="form-control date-picker"
              selected={this.state.date}
              onChange={this.handleDateChange}
              minDate={new Date()}
              peekNextMonth
              onFocus={e => (e.target.readOnly = true)}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
          <div className="form-group">
            <label htmlFor="targetPace"><strong>Target Pace</strong> (mm:ss)</label>
            <input className="form-control" onChange={(e) => this.handleChange(e)} type="text" name="targetPace" value={this.state.targetPace} />
            <p className="error-msg">{this.state.tPaceMsg}</p>  
          </div>
          <div className="form-group">
            <label htmlFor="distance"><strong>Distance </strong>({this.props.settings.distUnits})</label>
            <input className="form-control" onChange={(e) => this.handleChange(e)} type="text" name="runDist" value={this.state.runDist} />
            <p className="error-msg">{this.state.distMsg}</p>  
          </div>
          {this.state.completed ? finishedStats : null}
          <div className="form-group">
            <label htmlFor="run-type"><strong>Type</strong></label>
            <select className="form-control" onChange={(e) => this.handleChange(e)}  name="runType" id="runType" value={this.state.runType}>
              {runTypes.map(run => {
                return (
                  <option key={run} value={run}>
                    {run}
                  </option>
                );
              })}
            </select>
          </div>
          <Link to="/">
            <button type="submit" className="btn btn-primary" onClick={e => this.handleSubmit(e)}>Update Run</button>
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userGoalsID: state.goals._id,
        goal: state.goals.Goals,
        settings: state.settings
    }
}


export default connect(mapStateToProps, {editRun})(EditRun);

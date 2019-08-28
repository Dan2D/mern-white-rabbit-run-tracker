import React, { Component, Fragment } from "react";
import { editRun } from "../../store/actions/runActions";
import {setUnitConv, paceConvert, validateTitle, validatePace, validateDist} from '../Utils/helpers';
import PropTypes from 'prop-types';
import smoothscroll from 'smoothscroll-polyfill';
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
      editRun: PropTypes.func,
      validateTitle: PropTypes.func,
      validatePace: PropTypes.func,
      validateDist: PropTypes.func,
      setUnitConv: PropTypes.func,
      paceConvert: PropTypes.func,
      userGoalsID: PropTypes.string,
      goals: PropTypes.object,
      settings: PropTypes.object
    }

    componentDidMount(){
        smoothscroll.polyfill();
        window.scrollTo(0,0);
        const goal = this.props.goal.find(goal => goal._id === this.props.location.state.goal);
        const id = this.props.match.params.id;
        const run = goal.runs.find(run => run._id === id);
        let {timeConv, distConv} = setUnitConv(run.distUnits, this.props.settings.distUnits);
        const runIndx = goal.runs.indexOf(run);
        let {name, date, targetPace, actualPace, runDist, runType, distUnits, completed, mood} = run;
        if (timeConv !== distConv) {
          targetPace = paceConvert(targetPace, timeConv);
          actualPace = paceConvert(actualPace, timeConv);
        }
        this.setState({
            id,
            name,
            date: new Date(date),
            targetPace,
            actualPace,
            runDist: (runDist*distConv).toFixed(2),
            distUnits,
            runType,
            completed,
            runMood: mood.toString(),
            runIndx,
            gTargetPace: goal.targetPace,
            goalDist: goal.goalDist,
            progress: goal.progress
        })
    }


  handleSubmit = e => {
    e.preventDefault();
    let {name, targetPace, runDist, actualPace} = this.state;
    this.setState({ttlMsg: null, tPaceMsg: null, distMsg: null, aPaceMsg: null});
    this.setState({ttlMsg: validateTitle(name)});
    this.setState({tPaceMsg: validatePace(targetPace)});
    this.setState({aPaceMsg: validatePace(actualPace)});
    this.setState({distMsg: validateDist(runDist)});
    if (this.state.completed && validatePace(actualPace) !== null){
      return null;
    }
    if (validateTitle(name) !== null || validatePace(targetPace) !== null || validateDist(runDist) !== null){
      return null;
    }
    let {timeConv, distConv} = setUnitConv(this.props.settings.distUnits, this.state.distUnits);
    if (timeConv !== distConv) {
      targetPace = paceConvert(targetPace, timeConv);
      actualPace = paceConvert(actualPace, timeConv);
    }
    const updatedRun = {
      userGoalsID: this.props.userGoalsID,
      goalID: this.props.location.state.goal,
      id: this.state.id,
      name: this.state.name,
      date: this.state.date.toISOString().substr(0,10),
      targetPace,
      actualPace,
      runDist: this.state.runDist * distConv,
      runType: this.state.runType,
      completed: this.state.completed,
      mood: this.state.runMood,
      runIndx: this.state.runIndx,
      gTargetPace: this.state.gTargetPace,
      goalDist: this.state.goalDist,
      gProgress: this.state.progress
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
    smoothscroll.polyfill();
    window.scrollTo(0,0);
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
                                <label className="d-flex flex-column rating-radio" htmlFor="runMood-1">
                                  <img src={require('../../images/rating-1.png')} alt="mad face"/>
                                  <input type="radio" name="runMood" value="1" checked={this.state.runMood === "1"} onChange={(e) => this.handleChange(e)}/>
                                </label>
                                <label className="d-flex flex-column rating-radio" htmlFor="runMood-2">
                                  <img src={require('../../images/rating-2.png')} alt="sad face"/>
                                  <input type="radio" name="runMood" value="2" checked={this.state.runMood === "2"} onChange={(e) => this.handleChange(e)}/>
                                </label>
                                <label className="d-flex flex-column rating-radio" htmlFor="runMood-3">
                                  <img src={require('../../images/rating-3.png')} alt="meh face"/>
                                  <input type="radio" name="runMood" value="3" checked={this.state.runMood === "3"} onChange={(e) => this.handleChange(e)}/>
                                </label>
                                <label className="d-flex flex-column rating-radio" htmlFor="runMood-4">
                                  <img src={require('../../images/rating-4.png')} alt="happy face"/>
                                  <input type="radio" name="runMood" value="4" checked={this.state.runMood === "4"} onChange={(e) => this.handleChange(e)}/>
                                </label>
                                <label className="d-flex flex-column rating-radio" htmlFor="runMood-5">
                                  <img src={require('../../images/rating-5.png')} alt="very happy face"/>
                                  <input type="radio" name="runMood" value="5" checked={this.state.runMood === "5"} onChange={(e) => this.handleChange(e)}/>
                                </label>
                            </fieldset>
                        </div>
                      </Fragment>
    return (
      <div className="format-run">
        <form className="container" onSubmit={e => this.handleSubmit(e)}>
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

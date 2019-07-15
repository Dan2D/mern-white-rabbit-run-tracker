import React, {Component} from 'react'
import {updateSettings} from '../../store/actions/settingsActions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Settings.css';

// CAN ADD LATER, NOT IMPORTANT
class Settings extends Component {
    state = {
        distUnits: this.props.distUnits
    }
    onChange = (e) => {
        this.setState({distUnits: e.target.name})
    }

    updateSettings = (e) => {
        e.preventDefault();
        this.props.updateSettings(this.state.distUnits);
        e.target.parentElement.click();
    }

    render(){
        return (
            <div className="settings-container container">
                <h5>Settings</h5>
                <div>
                    <span>Distance Units: </span>
                    <fieldset onChange={(e) => this.onChange(e)}>
                        <label htmlFor="mi"><input className="distUnit-radio" type="radio" name="mi" value="true" checked={this.state.distUnits === "mi"}/>mi</label>
                        <label htmlFor="km"><input className="distUnit-radio" type="radio" name="km" value="true" checked={this.state.distUnits === "km"}/>km</label>
                    </fieldset>
                </div>
                <Link to="/">
                    <button className="btn btn-primary" onClick={(e) => this.updateSettings(e)}>Update Settings</button>
                </Link>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
    distUnits: state.settings.distUnits
  };
};

export default connect(mapStateToProps)(Settings)

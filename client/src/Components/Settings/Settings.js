import React, {Component} from 'react'
import {updateUserSettings} from '../../store/actions/settingsActions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './Settings.css';


class Settings extends Component {
    state = {
        distUnits: this.props.settings.distUnits
    }
    onChange = (e) => {
        this.setState({distUnits: e.target.name})
    }

    updateSettings = (e) => {
        e.preventDefault();
        this.props.updateUserSettings(this.props.settings._id, this.state.distUnits );
        e.target.parentElement.click();
    }

    render(){
        return (
            <div className="settings-container">
                <div className="container">
                <h5>Settings</h5>
                <div className="d-flex">
                    <span>Distance Units: </span>
                    <fieldset className="ml-3" onChange={(e) => this.onChange(e)}>
                        <label htmlFor="mi"><input className="distUnit-radio" type="radio" name="mi" value="true" checked={this.state.distUnits === "mi"}/>mi</label>
                        <label htmlFor="km"><input className="distUnit-radio" type="radio" name="km" value="true" checked={this.state.distUnits === "km"}/>km</label>
                    </fieldset>
                </div>
                <Link to="/">
                    <button className="btn btn-primary" onClick={(e) => this.updateSettings(e)}>Update Settings</button>
                </Link>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
      settings: state.settings
  };
};

export default connect(mapStateToProps, {updateUserSettings})(Settings)

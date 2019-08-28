import React, {Component} from 'react'
import {updateUserSettings} from '../../store/actions/settingsActions';
import smoothscroll from 'smoothscroll-polyfill';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './Settings.css';


class Settings extends Component {
    state = {
        distUnits: this.props.settings.distUnits
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        settings: PropTypes.object
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
        smoothscroll.polyfill();
        window.scrollTo(0,0);
        if (this.props.auth.isAuthenticated === null) {
            return <Redirect to="/login" />;
          }
        return (
            <div className="settings-container">
                <div className="title-blk title-blk--ssettings d-flex justify-start align-center">
                    <h5 className="title-blk__title--settings"><strong>Settings</strong></h5>
                </div>
                <div className="settings container">
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
      auth: state.auth,
      settings: state.settings
  };
};

export default connect(mapStateToProps, {updateUserSettings})(Settings)

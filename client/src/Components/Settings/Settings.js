import React from 'react'

// CAN ADD LATER, NOT IMPORTANT
function Settings() {
    return (
        <div>
            <fieldset>
                <label htmlFor=""><input type="radio" name="distUnits" value="true" checked={this.state.distUnits}/>mi</label>
                <label htmlFor=""><input type="radio" name="distUnits" value="true" checked={this.state.distUnits}/>km</label>
            </fieldset>
        </div>
    )
}

export default Settings

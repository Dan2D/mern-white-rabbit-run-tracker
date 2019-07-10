import React from 'react';
import warningPic from '../../images/finish-goal.svg';

function GoalWarning() {
    return (
        <div className="goal-warning-container">
            <img src={warningPic} alt="bunny in magic hat"/>
            <p>Please Complete Your Goal Before Adding Another!</p>
        </div>
    )
}

export default GoalWarning

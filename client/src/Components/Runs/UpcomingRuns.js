import React from 'react'
import {Link} from 'react-router-dom';
import RunTile from './RunTile';

function UpcomingRuns(props) {
  const addRunBtn = <Link className="d-flex" to="/add/run">
                     <button className="title-bar__add-run">+Run</button>
                  </Link>;
  let newRuns = 0;
    return (
        <div className="upcoming-runs">
          <div className="title-blk title-blk--upcoming-runs">
            <h5 className="title-blk__title">
              Upcoming Runs
            </h5>
            {props.goal.goalType === "None" ? null : addRunBtn}
          </div>
          <div className="upcoming-runs__tiles my-container">
            {props.goal.runs.map((run, indx) => {
              if (!run.completed) {
                newRuns++;
                return (
                  <RunTile
                    key={run._id}
                    goalID={props.goal._id}
                    runID={run._id}
                    indx={indx}
                    name={run.name}
                    date={run.date}
                    tPace={run.targetPace}
                    dist={run.runDist}
                    distUnits={run.distUnits}
                    type={run.runType}
                    completed={run.completed}
                  />
                );
              }
              if (indx + 1 === props.goal.runs.length && newRuns === 0) {
                return <p key={indx}> No Runs Scheduled!</p>;
              }
              return null;
            })}
            {props.goal.runs.length === 0 ? <p> No Runs Scheduled!</p> : null}
          </div>
        </div>
    )
}

export default UpcomingRuns;

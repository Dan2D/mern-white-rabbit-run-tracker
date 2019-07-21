import React from 'react'
import RunTile from '../Tiles/RunTile';

function CompletedRuns(props) {
  let completedRuns = 0;
    return (
        <div className="completed-runs">
          <div className="title-blk title-blk--completed-runs d-flex">
            <h5 className="title-blk__title">
             Completed Runs
            </h5>
          </div>
          <div className="completed-runs__tiles my-container">
            {props.goal.runs.map((run, indx) => {
              if (run.completed) {
                completedRuns++;
                return (
                  <RunTile
                    key={run._id}
                    userID={props.userID}
                    goalID={props.goal._id}
                    runID={run._id}
                    name={run.name}
                    date={run.date}
                    tPace={run.targetPace}
                    aPace={run.actualPace}
                    dist={run.runDist}
                    distUnits={run.distUnits}
                    type={run.runType}
                    completed={run.completed}
                    mood={run.mood}
                  />
                );
              }
              if (indx + 1 === props.goal.runs.length && completedRuns === 0) {
                return <p key={indx}>No Runs Completed Yet</p>;
              }
              return null;
            })}
            {props.goal.runs.length === 0 ? (
              <p>No Runs Completed Yet</p>
            ) : null}
          </div>
        </div>
    )
}

export default CompletedRuns;

import React from 'react'
import {Link} from 'react-router-dom';
import RunTile from '../Tiles/RunTile';

function RunList(props) {
    const type = props.type === "upcoming" ? "upcoming" : "completed";
  const addRunBtn = <Link className="d-flex" to="/add/run">
                     <button className="title-bar__add-run">+Run</button>
                  </Link>;
  let runs = 0;
    return (
        <div className={`${type}-runs`}>
          <div className={`title-blk title-blk--${type}-runs`}>
            <h5 className="title-blk__title">
              {`${type[0].toUpperCase() + type.substr(1)} Runs`}
            </h5>
            {(props.goal.goalType !== "None" && props.type !== "completed") && addRunBtn}
          </div>
          <div className={`${type}-runs__tiles my-container`}>
            {props.goal.runs.map((run, indx) => {
              if ((!run.completed && props.type === "upcoming") || (run.completed && props.type === "completed")) {
                runs++;
                return (
                  <RunTile
                    key={run._id}
                    userID={props.userID}
                    goalID={props.goal._id}
                    runID={run._id}
                    indx={indx}
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
              if (indx + 1 === props.goal.runs.length && runs === 0) {
                return <p key={indx}>{props.type === "upcoming" ? "No Runs Scheduled!" : "No Runs Completed Yet!"}</p>;
              }
              return null;
            })}
            {props.goal.runs.length === 0 ? <p> {props.type === "upcoming" ? "No Runs Scheduled!" : "No Runs Completed Yet!"}</p> : null}
          </div>
        </div>
    )
}

export default RunList;

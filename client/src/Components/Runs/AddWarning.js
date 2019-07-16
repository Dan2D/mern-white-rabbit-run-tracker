import React from "react";
import warningPic from "../../images/finish-goal.svg";

function AddWarning(props) {
  return (
    <div className="add-warning-container">
      <img src={warningPic} alt="bunny in magic hat" />
      {props.type === "goal" ? (
        <p>Please Complete Your Goal Before Adding Another!</p>
      ) : (
        <p>Please Add A Current Goal Before Adding Runs</p>
      )}
    </div>
  );
}

export default AddWarning;

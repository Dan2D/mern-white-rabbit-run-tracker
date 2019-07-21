import React from "react";
import { setUnitConv } from "../Utils/helpers";
import progressRbbt from "../../images/progress-rabbit.png";
import progressTree from "../../images/progress-tree.png";

function VisualProg(props) {
  let { distConv } = setUnitConv(props.currentGoal.distUnits, props.settingUnits);
  const rabbitProgressMove = (currentGoal, progressEl) => {
    let width = 0;
    if (progressEl) {
      width = progressEl.offsetWidth;
    }
    document.documentElement.style.setProperty(
      "--rabbit-x",
      ((parseFloat(currentGoal.progress) / 100) * (width - 100) + "px")
    );
  };
  let progressEl = document.querySelector(".visual-progress");
  rabbitProgressMove(props.currentGoal, progressEl);
  return (
    <div className="visual-progress">
      <p className="start-pos">|</p>
      <div className="rabbit-percent">
        <p className="rabbit-percent__percent">{`${props.currentGoal.progress}%`}</p>
        <p>&#9660;</p>
        <img className="rabbit-percent__rabbit" src={progressRbbt} alt="white rabbit" />
      </div>
      <div className="tree-goal">
        <p className="tree-goal__goal">
          {`${(props.currentGoal.goalDist * distConv).toFixed(2)} ${props.settingUnits}`}
        </p>
        <img className="tree-goal__tree" src={progressTree} alt="tree" />
      </div>
    </div>
  );
}

export default VisualProg;

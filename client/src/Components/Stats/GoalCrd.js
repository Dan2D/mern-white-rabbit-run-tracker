import React, { Component } from "react";
import { Link } from "react-router-dom";
import carrot from "../../images/carrot.png";

class GoalCrd extends Component {
  render() {
    const complete = (
      <div className="goal-complete d-flex">
        <p>Complete</p>
        <img src={carrot} alt="carrot" />
      </div>
    );
    const inProgress = <p>In Progress...</p>;

    return (
      <Link to={`/stats/${this.props.id}`}>
        <div className="stat-card stat-card__goal mb-3 d-flex">
          <p>
            <strong>{this.props.name}</strong>
          </p>
          {this.props.complete ? complete : inProgress}
        </div>
      </Link>
    );
  }
}

export default GoalCrd;

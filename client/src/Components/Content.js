import React, {Component} from 'react';
import {getUserGoals} from '../store/actions/runActions';
import {connect} from 'react-redux';
import Home from './Home/Home';
import CreateRun from './Runs/CreateRun';
import CreateGoal from './Runs/CreateGoal';
import EditGoal from './Runs/EditGoal';
import FinishGoal from './Runs/FinishGoal';
import EditRun from './Runs/EditRun';
import FinishRun from './Runs/FinishRun';
import Stats from './Stats/Stats';
import StatsDetail from './Stats/StatsDetail';
import Settings from './Settings/Settings';
import {Route} from 'react-router-dom';

class Content extends Component {
        componentDidMount(){
                this.props.getUserGoals();
              }
render(){
    return (
            <div className="content-container">
                    <Route path="/" exact component={Home} />
                    <Route path="/add/goal" exact component={CreateGoal} />
                    <Route path="/edit/goal/:id" component={EditGoal} />
                    <Route path="/complete/goal/:id" component={FinishGoal} />
                    <Route path="/add/run" exact component={CreateRun} />
                    <Route path="/edit/run/:id" component={EditRun} />
                    <Route path="/complete/run/:id" component={FinishRun} />
                    <Route path="/stats" exact component={Stats} />
                    <Route path="/stats/:id" exact component={StatsDetail} />
                    <Route path="/settings" exact component={Settings} />
            </div>
    )
}
}
export default connect(null, {getUserGoals})(Content);

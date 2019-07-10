import React from 'react';
import Home from './Home/Home';
import CreateRun from './Runs/CreateRun';
import CreateGoal from './Runs/CreateGoal';
import EditRun from './Runs/EditRun';
import Stats from './Stats/Stats';
import StatsDetail from './Stats/StatsDetail';
import Settings from './Settings/Settings';
import {Route} from 'react-router-dom';

function Content() {
    return (
            <div className="content-container">
                    <Route path="/" exact component={Home} />
                    <Route path="/add/run" exact component={CreateRun} />
                    <Route path="/add/goal" exact component={CreateGoal} />
                    <Route path="/edit/:id" component={EditRun} />
                    <Route path="/stats" exact component={Stats} />
                    <Route path="/stats/:id" exact component={StatsDetail} />
                    <Route path="/settings" exact component={Settings} />
            </div>
    )
}

export default Content

import React, { Component} from "react";
import { loadUser } from "./store/actions/authActions";
import Content from "./Components/Content";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: null
    };
  }

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Content />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

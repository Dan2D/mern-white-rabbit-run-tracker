import React from "react";
import Nav from "./Components/Nav/Nav";
import Content from "./Components/Content";
import { BrowserRouter as Router} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Nav />
          <div style={{ height: "10vh" }} />
          <Content />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

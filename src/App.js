import React from "react";
import "./App.css";
import Worldwide from "./worldwide";
import India from "./india"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/worldwide" component={Worldwide} />
          <Route path="/india" component={India} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;

import React, { Fragment } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// components
import Preloader from "./components/layout/Preloader";
// Redux Setup
import { Provider } from "react-redux";
import store from "./store";
// Pages
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
// private Route
import PrivateRoute from "./routing/PrivateRoute";
function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <Preloader />

        <Router>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/" component={Home} />
          </Switch>
        </Router>
      </Fragment>
    </Provider>
  );
}

export default App;

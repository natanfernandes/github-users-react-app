import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Home from '../screens/Home';
import User from '../screens/User';

export default function AppRoutes() {
    return (
        <Router>
            <Switch>
                <Route path="/user">
                    <User />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}
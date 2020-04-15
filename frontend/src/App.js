import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import Landing from "./components/Landing";
import AboutUs from "./components/AboutUs";
import Register from "./components/Register";

import { Provider, connect } from "react-redux";
import tennisApp from "./reducers";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";


let store = createStore(tennisApp, applyMiddleware(thunk));


class RootContainerComponent extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/about" component={AboutUs} />
                    <Route exact path="/register" component={Register} />
                </Switch>
            </BrowserRouter>
        );
    }
}

let RootContainer = RootContainerComponent;

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootContainer />
            </Provider>
        )
    }
}


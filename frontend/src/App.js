import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
//import logo from './logo.svg';
import './App.css';

import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import Landing from "./components/Landing";
import AboutUs from "./components/AboutUs";
import Register from "./components/Register";
import MyProfile from "./components/MyProfile";
import HowItWorks from "./components/HowItWorks";

import {auth} from "./actions";
import artorimoApp from "./reducers";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";


let store = createStore(artorimoApp, applyMiddleware(thunk));


class RootContainerComponent extends Component {
    componentDidMount() {
        this.props.loadUser();
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/about" component={AboutUs} />
                    <Route exact path="/how-it-works" component={HowItWorks} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile" component={MyProfile} />
                </Switch>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUser: () => {
            return dispatch(auth.loadUser());
        }
    }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootContainer />
            </Provider>
        )
    }
}


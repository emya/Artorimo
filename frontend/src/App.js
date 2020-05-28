import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
//import logo from './logo.svg';
import './App.css';

import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import Landing from "./components/Landing";
import ClientLanding from "./components/ClientLanding";
import AboutUs from "./components/AboutUs";
import Register from "./components/Register";
import Login from "./components/Login";
import SideMenu from "./components/SideMenu";
import MyProfile from "./components/MyProfile";
import MyProfileEdit from "./components/MyProfileEdit";
import HowItWorks from "./components/HowItWorks";
import ContactUs from "./components/ContactUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Test from "./components/Test";

import {auth} from "./actions";
import artorimoApp from "./reducers";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";


let store = createStore(artorimoApp, applyMiddleware(thunk));


class RootContainerComponent extends Component {
    componentDidMount() {
        this.props.loadUser();
    }

    PrivateRoute = ({component: ChildComponent, ...rest}) => {
        return <Route {...rest} render={props => {
            if (this.props.auth.isLoading) {
                return <em>Loading...</em>;
            } else if (!this.props.auth.isAuthenticated) {
                return <Redirect to="/" />;
            } else {
                return <ChildComponent {...props} />
            }
        }} />
    }

    render() {
        let {PrivateRoute} = this;

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/artists" component={ClientLanding} />
                    <Route exact path="/about" component={AboutUs} />
                    <Route exact path="/how-it-works" component={HowItWorks} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/contact-us" component={ContactUs} />
                    <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                    <Route exact path="/test" component={Test} />
                    <PrivateRoute exact path="/myprofile" component={MyProfile} />
                    <PrivateRoute exact path="/myprofile/edit" component={MyProfileEdit} />
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

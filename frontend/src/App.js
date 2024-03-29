import React, { Component } from 'react';
import { Provider, connect } from "react-redux";
//import logo from './logo.svg';
import './App.css';

import {Route, Switch, BrowserRouter, Redirect} from 'react-router-dom';
import Landing from "./components/Landing";
import ClientLanding from "./components/ClientLanding";
import StaffLanding from "./components/StaffLanding";
import AboutUs from "./components/AboutUs";
import Register from "./components/Register";
import CompleteRegistration from "./components/CompleteRegistration";
import Login from "./components/Login";
import SideMenu from "./components/SideMenu";
import MyProfile from "./components/MyProfile";
import MyProfileEdit from "./components/MyProfileEdit";
import MyPortfolio from "./components/MyPortfolio";
import MyPortfolioEdit from "./components/MyPortfolioEdit";
import Portfolio from "./components/Portfolio";
import Profile from "./components/Profile";
import AskHelp from "./components/AskHelp";
import HowItWorks from "./components/HowItWorks";
import ContactUs from "./components/ContactUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import HowToUseIconio from "./components/HowToUseIconio";
import IconioArtistGuide from "./components/IconioArtistGuide";
import IconioUserGuide from "./components/IconioUserGuide";
import IconioUploadCompleted from "./components/IconioUploadCompleted";
import IconioUploadFailed from "./components/IconioUploadFailed";
import IconioScreenshot from "./components/IconioScreenshot";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import ActivateAccount from "./components/ActivateAccount";
import Welcome from "./components/Welcome";
import Users from "./components/Users";
import SendEmails from "./components/SendEmails";
import SendEmailMagazines from "./components/SendEmailMagazines";
import Community from "./components/Community";
import CommunityCategories from "./components/CommunityCategories";
import CommunityPosts from "./components/CommunityPosts";
import CommunityPost from "./components/CommunityPost";
import MakeCommunityPost from "./components/MakeCommunityPost";
import IconMaker from "./components/IconMaker";
import IconMakerTest from "./components/IconMakerTest";
import IconMakerForTwo from "./components/IconMakerForTwo";
import SetupIconMaker from "./components/SetupIconMaker";
import IconioUploader from "./components/IconioUploader";
import Iconio from "./components/Iconio";
import PayPal from "./components/PayPal";
import PayPalDone from "./components/PayPalDone";
import IconioDownload from "./components/IconioDownload";
import AdditionalItems from "./components/AdditionalItems";
import IconioArtistLanding from "./components/IconioArtistLanding";
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

    StaffRoute = ({component: ChildComponent, ...rest}) => {
        return <Route {...rest} render={props => {
            if (this.props.auth.isLoading) {
                return <em>Loading...</em>;
            } else if (!this.props.auth.isAuthenticated || !this.props.auth.user.is_staff) {
                return <Redirect to="/" />;
            } else {
                return <ChildComponent {...props} />
            }
        }} />
    }

    render() {
        let {PrivateRoute} = this;
        let {StaffRoute} = this;

        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/artists" component={ClientLanding} />
                    <Route exact path="/artists/portfolio/:userId" component={Portfolio} />
                    <Route exact path="/about" component={AboutUs} />
                    <Route exact path="/how-it-works" component={HowItWorks} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/complete/registration" component={CompleteRegistration} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/contact-us" component={ContactUs} />
                    <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                    <Route exact path="/iconio/creators/guide" component={HowToUseIconio} />

                    <Route exact path="/user-guide" component={IconioUserGuide} />
                    <Route exact path="/test" component={Test} />
                    <Route exact path="/reset/password" component={ForgotPassword} />
                    <Route exact path="/reset/password/:token" component={ResetPassword} />
                    <Route exact path="/activate/account/:uidb64/:activeToken" component={ActivateAccount} />
                    <PrivateRoute exact path="/welcome" component={Welcome} />
                    <PrivateRoute exact path="/myprofile" component={MyProfile} />
                    <PrivateRoute exact path="/myprofile/edit" component={MyProfileEdit} />
                    <PrivateRoute exact path="/myportfolio" component={MyPortfolio} />
                    <PrivateRoute exact path="/myportfolio/edit" component={MyPortfolioEdit} />
                    <PrivateRoute exact path="/ask/help" component={AskHelp} />
                    <PrivateRoute exact path="/iconio/uploader" component={IconioUploader} />

                    <PrivateRoute exact path="/artist-guide" component={IconioArtistGuide} />
                    <PrivateRoute exact path="/iconio/upload/completed" component={IconioUploadCompleted} />
                    <PrivateRoute exact path="/iconio/upload/failed" component={IconioUploadFailed} />

                    <Route exact path="/iconio/creators/top" component={IconioArtistLanding} />
                    <Route exact path="/iconio/:artist_name" component={Iconio} />
                    <Route exact path="/iconio/payment/paypal" component={PayPal} />
                    <Route exact path="/iconio/payment/paypal/done" component={PayPalDone} />
                    <Route exact path="/iconio/download/:token" component={IconioDownload} />
                    <Route exact path="/iconio/screenshot/:order_id" component={IconioScreenshot} />

                    <StaffRoute exact path="/iconio" component={Iconio} />
                    <StaffRoute exact path="/staff/top" component={StaffLanding} />
                    <StaffRoute exact path="/profile/:userId" component={Profile} />
                    <StaffRoute exact path="/all/users" component={Users} />
                    <StaffRoute exact path="/send/emails" component={SendEmails} />
                    <StaffRoute exact path="/send/emagazines" component={SendEmailMagazines} />

                    <Route exact path="/iconmaker" component={IconMaker} />
                    <StaffRoute exact path="/iconmaker/test" component={IconMakerTest} />
                    <StaffRoute exact path="/iconmaker/fortwo" component={IconMakerForTwo} />
                    <Route exact path="/iconio/sample/uploader" component={SetupIconMaker} />

                    <PrivateRoute exact path="/community" component={CommunityCategories} />
                    <PrivateRoute exact path="/community/posts/:category" component={CommunityPosts} />
                    <PrivateRoute exact path="/community/make/post" component={MakeCommunityPost} />
                    <PrivateRoute exact path="/community/post/:postId" component={CommunityPost} />
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

import React from 'react';
import Lifecycle, {
    Redirect,
    Route,
    Router, Switch
} from "react-router";

import {Home} from "./Home";
import {HashRouter} from "react-router-dom";
import {Clock} from "../component/Clock";
import {LeftNavigationMenu} from "./LeftNavigationMenu";
import {SearchResult} from "./SearchResult";
import {DataShowGrid} from "./DataShowGrid";
import {SearchResultShow} from "./SearchResultShow";
import {PersonalCenter} from "./PersonalCenter";
import {message} from "antd";
import mixins from "react-mixin";
import {SimpleLogin} from "./SimpleLogin";
import {DataInfo} from "../component/DataInfo";
import MyErrorBoundary from '../common/MyErrorBoundary'

export class MyRouter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keywords:null
        }
    }

    getUser = (here,result) => {
        this.props.getUser(here,result.user)
    }

    saveSearchKeyWords = (keywords) => {
        this.setState({
            keywords:keywords
        })
    }

    /**
     * 传入一个组件，验证用户是否登录，如未登录，弹出提示，如已登录，渲染组件
     * @param component
     */
    accessControl = (component) => {
        let {user} = this.props;
        return !user ? <Redirect to={'/home'} />:<PersonalCenter user={this.props.user} />;
    }

    render() {
        return (
            <div className="site-layout-background" style={{padding: 24, textAlign: 'center'}}>
                <Route exact path='/'>
                    <Home keywords={this.state.keywords} saveSearchKeyWords={this.saveSearchKeyWords} />
                </Route>
                <Route exact path='/home'>
                    <Home />
                </Route>
                <Route exact path='/menu'>
                    <LeftNavigationMenu />
                </Route>
                <Route exact path='/searchResult'>
                    <SearchResultShow keywords={this.state.keywords} saveSearchKeyWords={this.saveSearchKeyWords} />
                </Route>
                <Route exact path='/personalCenter' >
                    {this.accessControl(<PersonalCenter user={this.props.user} />)}
                </Route>
                <Route exact path='/login' >
                    <SimpleLogin getUser={this.getUser} />
                </Route>
                <Route exact path='/dataInfo' >
                    <DataInfo data={{name: "数据展示样板"}} user={this.props.user} />
                </Route>
                <Route exact path='/myCollections' >
                    {this.accessControl(<PersonalCenter user={this.props.user} />)}
                </Route>

            </div>
        );
    }

}
import React from 'react';
import Lifecycle, {
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

export class MyRouter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keywords:null
        }
    }



    componentDidMount() {

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
    // accessControl = (component) => {
    //     let {user} = this.props;
    //     if (!user) {
    //         message.info(`您还未登录，请先去登录`).then(r => console.log(r));
    //         return <Home keywords={this.state.keywords} saveSearchKeyWords={this.saveSearchKeyWords} />;
    //     }
    //     return component;
    // }

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
                    <SearchResult />
                </Route>
                <Route exact path='/dataInfo'>
                    <SearchResultShow keywords={this.state.keywords} saveSearchKeyWords={this.saveSearchKeyWords} />
                </Route>
                <Route exact path='/personalCenter' >
                    {/*{this.accessControl(<PersonalCenter user={this.props.user} />)}*/}
                    <PersonalCenter user={this.props.user} />
                </Route>
                <Route exact path='/login' >
                    <SimpleLogin />
                </Route>

            </div>
        );
    }

}
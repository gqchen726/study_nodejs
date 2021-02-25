import React from 'react';
import {
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

export class MyRouter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keywords:null
        }
    }

    saveSearchKeyWords = (keywords) => {
        this.setState({
            keywords:keywords
        })
    }

    render() {
        return (
            <div className="site-layout-background" style={{padding: 24, textAlign: 'center'}}>
                <Route exact path='/'>
                    <Home saveSearchKeyWords={this.saveSearchKeyWords} />
                </Route>
                <Route exact path='/home'>
                    <Home />
                </Route>
                <Route exact path='/mine'>
                    <Clock />
                </Route>
                <Route exact path='/menu'>
                    <LeftNavigationMenu />
                </Route>
                <Route exact path='/searchResult'>
                    <SearchResult />
                </Route>
                <Route exact path='/dataInfo'>
                    <SearchResultShow keywords={this.state.keywords} />
                </Route>

            </div>
        );
    }

}
// import './public/css/App.css';
import React from "react";
import {MyRouter} from "./contains/MyRouter";
import {
    Route, Router, Switch
} from "react-router";
import {hashHistory} from 'history'
import {Home} from "./contains/Home";
import {HashRouter} from "react-router-dom";
import {Login} from "./contains/Login";
import localContext from "./cache/LocalContext";
import {Page} from "./contains/Page";



class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            user: localContext.get('user'),
        });
    }
    //自动绑定this
    getUser = (here,user) => {
        this.setState({user:user})
    }



    render() {
        return (
            // <MyRouter user={this.state.user} getUser={this.getUser} />
            <Page user={this.state.user} getUser={this.getUser} />
        );

    }

}
export default App;

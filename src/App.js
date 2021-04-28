import React from "react";
import localContext from "./cache/LocalContext";
import {Page} from "./contains/Page";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import {PageH} from "./contains/PageH";
import {PageN} from "./contains/PageN";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            // user: localContext.has('user') ?localContext.get("user"):null,
            user: window.localStorage.getItem("user") ?window.localStorage.getItem("user"):null,
        });
    }

    componentWillMount() {
        console.log(window.localStorage.getItem("user"))
        window.localStorage.setItem('myCat', 'Tom');
        console.log(window.localStorage.getItem('myCat'))
    }

    //自动绑定this
    getUser = (here,user) => {
        this.setState({user:user})
    }



    render() {
        return (

            <ErrorBoundary>
            {/*<MyRouter user={this.state.user} getUser={this.getUser} />*/}
            {/*    <Page user={this.state.user} getUser={this.getUser} />*/}
            {/*    <PageH user={this.state.user} getUser={this.getUser} />*/}
                <PageN user={this.state.user} getUser={this.getUser} />
            </ErrorBoundary>
        );

    }

}
export default App;

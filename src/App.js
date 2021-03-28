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
            user: localContext.get('user'),
        });
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

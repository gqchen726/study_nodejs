// import './public/css/App.css';
import React from "react";
import localContext from "./cache/LocalContext";
import {Page} from "./contains/Page";
import MyErrorBoundary from "./common/MyErrorBoundary";


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
            <MyErrorBoundary>
                {/*<MyRouter user={this.state.user} getUser={this.getUser} />*/}
                <Page user={this.state.user} getUser={this.getUser} />
            </MyErrorBoundary>
        );

    }

}
export default App;

import React from 'react';
import {
    Route,
    Router, Switch
} from "react-router";

import {Home} from "./Home";
import {HashRouter} from "react-router-dom";

export class MyRouter extends React.Component {

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path='/'>
                        <Home user={this.props.user} getUser={this.props.getUser} />
                        {/*<Page/>*/}
                    </Route>
                    {/*<Route path="/Login" component={Login} />*/}
                    {/*<Route path="/Page" component={Page} />*/}
                </Switch>
            </HashRouter>
        );
    }

}
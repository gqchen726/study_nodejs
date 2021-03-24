import React from 'react';
import {
    Redirect,
    Route,
    Switch,
} from "react-router";

import {Home} from "./Home";
import {LeftNavigationMenu} from "./LeftNavigationMenu";
import {SearchResultShow} from "./SearchResultShow";
import {PersonalCenterW} from "./PersonalCenter";
import {SimpleLogin} from "./SimpleLogin";
import {DataInfoW} from "../component/DataInfo";
import {PageNotFound} from "../component/MyResult";
import {MyRouterWithHook} from "./MyRouterWithHook";

export class MyRouter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keywords:null,
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

    saveAny = (dataName,data) => {
        switch (dataName) {
            case 'datas':
                this.setState({
                    datas:data
                })
                return;
            case 'keywords':
                this.setState({
                    keywords:data
                })
                return;
        }

    }

    /**
     * 传入一个组件，验证用户是否登录，如未登录，弹出提示，如已登录，渲染组件
     * @param component
     */
    accessControl = (component) => {
        let {user} = this.props;
        return !user ? <Redirect to={'/home'} />:<PersonalCenterW user={this.props.user} />;
    }

    render() {
        console.log(this)
        // return (
        //     <div className="site-layout-background" style={{padding: 24, textAlign: 'center'}}>
        //         <Switch>
        //             <Route exact path='/'>
        //                 <Home keywords={this.state.keywords} saveSearchKeyWords={this.saveSearchKeyWords} saveAny={this.saveAny} />
        //             </Route>
        //             <Route exact path='/home'>
        //                 <Home keywords={this.state.keywords} saveSearchKeyWords={this.saveSearchKeyWords} saveAny={this.saveAny} />
        //             </Route>
        //             <Route exact path='/menu'>
        //                 <LeftNavigationMenu />
        //             </Route>
        //             <Route exact path='/searchResult'>
        //                 <SearchResultShow keywords={this.state.keywords} saveSearchKeyWords={this.saveSearchKeyWords} saveAny={this.saveAny} datas={this.state.datas} />
        //             </Route>
        //             <Route exact path='/personalCenter' >
        //                 {this.accessControl(<PersonalCenterW user={this.props.user} />)}
        //             </Route>
        //             <Route exact path='/login' >
        //                 <SimpleLogin getUser={this.getUser} />
        //             </Route>
        //             <Route exact path="/dataInfo/:key" >
        //                 <DataInfoW datas={this.state.datas} user={this.props.user} />
        //             </Route>
        //             <Route exact path='/myCollections' >
        //                 {this.accessControl(<PersonalCenterW user={this.props.user} />)}
        //             </Route>
        //             <Route exact path='/result/404' >
        //                 {/*<Route exact path={'/404'}>*/}
        //                     <PageNotFound />
        //                 {/*</Route>*/}
        //             </Route>
        //         </Switch>
        //
        //     </div>
        // );
        return <MyRouterWithHook
                    getUser={this.getUser}
                    saveAny={this.saveAny}
                    accessControl={this.accessControl}
                    keywords={this.state.keywords}
                    user={this.props.user}
                    datas={this.state.datas}
                />
    }

    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return ;
        };
    }

}
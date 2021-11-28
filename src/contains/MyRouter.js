import React from 'react';
import {
    Redirect,
} from "react-router";

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
        return !user ? <Redirect to={'/home'} />:component;
    }

    render() {
        return <MyRouterWithHook
                    getUser={this.getUser}
                    saveAny={this.saveAny}
                    accessControl={this.accessControl}
                    keywords={this.state.keywords}
                    user={this.props.user}
                    datas={this.state.datas}
                    refreshMenuItems={this.props.refreshMenuItems}
                />
    }

    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
            return ;
        };
    }

}
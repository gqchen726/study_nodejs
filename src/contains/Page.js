import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined, HomeOutlined, BarsOutlined,
} from '@ant-design/icons';
import Switch from "antd/es/switch";
import SubMenu from "antd/es/menu/SubMenu";
import {UserStateBar} from "./UserStateBar";
import {Prompt} from "react-router";
import {HashRouter, Link} from "react-router-dom";
import {MyRouter} from "./MyRouter";
import React from "react";
import { Layout, Menu } from 'antd';
import './../public/css/Page.css'
import {Button, message} from "antd/es";
import history from "../common/history";
export class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lineMode: false,
            lightTheme: true,
            user:props.user,
            keywords:null,
        };

    }



    saveSearchKeyWords = (keywords) => {
        this.setState({
            keywords:keywords
        })
    }

    getUser = (here,user) => {
        this.props.getUser(here,user)
        this.setState({
            user: user
        })
    }

    changeMode = () => {
        this.setState({
            lineMode: !this.state.lineMode,
        })
    };

    changeTheme = () => {
        this.setState({
            lightTheme: !this.state.lightTheme,
        })
    };

    renderRoutes = () => {
        return (
            <MyRouter user={this.state.user} getUser={this.getUser} />
        );
    }


    jurisdiction = () => {
        let {user} = this.state;
        if (!user) {
            message.info(`您还未登录，请先去登录`).then(r => console.log(r));
            return null;
        }
    }

    render () {
        let {lineMode} = this.state;
        let {lightTheme} = this.state;
        const { Header, Content, Footer, Sider } = Layout;
        return (
            <HashRouter>
                <Prompt
                    message={(location, action) => {
                        if (action === 'POP') {
                            console.log("Backing up...")
                        }
                        return !location.pathname.startsWith("/personalCenter" | "/myOrder" | "/browsingHistory" | "/myCollections")
                            ? true
                            : "您还未登录，请前去登录后再进行此操作!"
                    }}
                />
                <Layout className={'Page'}>
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '140vh',
                            position: 'fixed',
                            left: 0,
                        }}
                        theme='light'
                    >
                        <div className="logo"/>
                        <Switch onChange={this.changeMode} />

                        <Menu
                            mode={!lineMode ? 'vertical' : 'inline'}
                            theme='light'
                            defaultSelectedKeys={['1']}
                        >
                            <Menu.Item key="sub0" title="首页" icon={<HomeOutlined />}>
                                <Link to={'/home'}>首页</Link>
                            </Menu.Item>
                            <SubMenu key="sub1" title="景区查看" icon={<BarsOutlined />}>
                                <Menu.Item key="5">大同古城墙</Menu.Item>
                                <Menu.Item key="6">华严寺</Menu.Item>
                                <Menu.Item key="7">善化寺</Menu.Item>

                            </SubMenu>


                            <Menu.Item key="sub2" title="个人中心" icon={<UserOutlined/>}>
                                <Link to={'/personalCenter'}>个人中心</Link>
                            </Menu.Item>

                            <Menu.Item key="sub3" title="我的订单" icon={<UploadOutlined/>}>
                                <Link to={'/myOrder'}>我的订单</Link>
                            </Menu.Item>

                            <Menu.Item key="sub4" title="我的收藏" icon={<BarChartOutlined/>}>
                                <Link to={'/myCollections'}>我的收藏</Link>
                            </Menu.Item>

                            <Menu.Item key="sub5" title="浏览历史" icon={<CloudOutlined/>}>
                                <Link to={'/browsingHistory'}>浏览历史</Link>
                            </Menu.Item>

                        </Menu>

                    </Sider>
                    <Layout className="site-layout"
                    >
                        {/*<Header className="site-layout-background" style={{padding: 0}}>*/}
                        {/*    <StateBar user={this.state.user} getUser={this.getUser} />*/}
                        {/*</Header>*/}
                        <UserStateBar user={this.state.user} getUser={this.getUser} />
                        <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                            {
                                this.renderRoutes() ? this.renderRoutes():null
                            }
                        </Content>
                        <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>
            </HashRouter>
        )
    }
}
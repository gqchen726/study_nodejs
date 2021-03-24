import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UserOutlined,
    UploadOutlined,
    VideoCameraOutlined,
    HomeOutlined,
    BarsOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import Switch from "antd/es/switch";
import SubMenu from "antd/es/menu/SubMenu";
import {UserStateBar} from "./UserStateBar";
import {Prompt, Route} from "react-router";
import {HashRouter, Link, BrowserRouter} from "react-router-dom";
import {MyRouter} from "./MyRouter";
import React from "react";
import { Layout, Menu } from 'antd';
import './../public/css/Page.css'
import {Button, message} from "antd/es";
import history from "../common/history";
import {MyPrompt} from "../component/MyPrompt";
import {MyRouterWithHook} from "./MyRouterWithHook";
import {SimpleLogin} from "./SimpleLogin";
import {LoginPage} from "./LoginPage";


//创建context,定义一个全局变量
const ThemeContext = React.createContext("light");
export class PageH extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lineMode: false,
            lightTheme: true,
            user:props.user,
            keywords:null,
            collapsed: false
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
    changeState = () => {
        this.setState({
            collapsed: !this.state.collapsed,
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
            // <MyRouterWithHook user={this.state.user} getUser={this.getUser} />
        );
    }

    renderLayout = () => {
        let {lineMode, lightTheme, collapsed} = this.state;
        const { Header, Content, Footer, Sider } = Layout;
        let rules = [];
        return (
            <Layout className={'Page'}>
                <Sider
                    style={{
                        overflow: 'auto',
                        height: '140vh',
                        position: 'fixed',
                        left: 0,
                    }}
                    theme='light'
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <div className="logo"/>
                    <div className={'modeControl'}>
                        <Switch onChange={this.changeMode} />更换菜单样式
                        <br />
                        <Button type="primary" onClick={this.changeState} style={{ marginBottom: 16 }}>
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                            {!collapsed ? "缩起菜单":null}
                        </Button>
                    </div>

                    <Menu
                        mode={!lineMode ? 'vertical' : 'inline'}
                        theme='light'
                        defaultSelectedKeys={['1']}
                        inlineCollapsed={collapsed}
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
        );
    }

    render () {
        let {lineMode, lightTheme, collapsed} = this.state;
        const { Header, Content, Footer, Sider } = Layout;
        let rules = [];
        return (
            <HashRouter>
                {/*路由拦截*/}
                <MyPrompt
                    user={this.props.user}
                />
                <Route exact path={'/'}>
                    {this.renderLayout()}
                </Route>
                <Route exact path={'/login'}>
                    <LoginPage getUser={this.props.getUser} />
                </Route>
            </HashRouter>
        )
    }
}


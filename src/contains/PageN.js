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
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";


//创建context,定义一个全局变量
const ThemeContext = React.createContext("light");
export class PageN extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lineMode: true,
            lightTheme: true,
            user:props.user,
            keywords:null,
            collapsed: false,
            categorys: null,
            menuItems: null
        };

    }

    componentWillMount() {
        // axios.get(urlsUtil.product.searchProductCategoryList).then((response) => {
        //     let data = response.data;
        //     console.log(data)
        //     console.log(data.body)
        //     if (!data.code) {
        //         this.setState({
        //             categorys : data.body
        //         })
        //     }
        // }
        this.renderMenuItems();
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        this.renderMenuItems();
    }

    renderCategorys = () => {
        axios.get(urlsUtil.product.searchProductCategoryList).then((response) => {
            let data = response.data;
            console.log(data)
            console.log(data.body)
            if (!data.code) {
                return data.body;
            }
        })
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
            <MyRouter user={this.props.user} getUser={this.getUser} />
            // <MyRouterWithHook user={this.props.user} getUser={this.getUser} />
        );
    }
    renderMenuItems = () => {
        axios.get(urlsUtil.product.searchProductCategoryList).then((response) => {
            let data = response.data;
            let menuItems = null;
            console.log(data.body)
            if (data.code) {
                menuItems = data.body.map((value,index) => {
                    return <Menu.Item key={index}><Link to={`/searchResult/${value}`}>{value}</Link></Menu.Item>;
                })
                console.log(menuItems)
            }
            let oldMenuItems = this.state.menuItems;
            if (oldMenuItems != menuItems) {
                // this.setState({
                //     menuItems: menuItems
                // })
                this.state.menuItems = menuItems;
            }
        })
        // if (!datas) return null;
        // return data.map((value,index) => {
        //     return <Menu.Item key={index}>{value}</Menu.Item>;
        // })
    }

    renderLayout = () => {
        let {lineMode, lightTheme, collapsed, menuItems} = this.state;
        let {user} = this.props;
        const { Header, Content, Footer, Sider,} = Layout;
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
                            {menuItems}
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
                        <Menu.Item key="sub6" title="修改密码" icon={<CloudOutlined/>}>
                            <Link to={'/userPasswordOfUpdate'}>修改密码</Link>
                        </Menu.Item>

                        {
                            !!user && user.admin ?
                                <Menu.Item key="sub7" title="新增产品" icon={<CloudOutlined/>}>
                                    <Link to={'/addProduct'}>新增产品</Link>
                                </Menu.Item> : null
                        }

                    </Menu>

                </Sider>
                <Layout className="site-layout"
                >
                    {/*<Header className="site-layout-background" style={{padding: 0}}>*/}
                    {/*    <StateBar user={this.props.user} getUser={this.getUser} />*/}
                    {/*</Header>*/}
                    <UserStateBar user={this.props.user} getUser={this.getUser} />
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
                {this.props.user?this.renderLayout():<LoginPage getUser={this.props.getUser} />}
            </HashRouter>
        )
    }
}


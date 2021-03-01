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
import {Route} from "react-router";
import {Home} from "./Home";
import {HashRouter, Link} from "react-router-dom";
import {LeftNavigationMenu} from "./LeftNavigationMenu";
import {SearchResult} from "./SearchResult";
import {DataShowGrid} from "./DataShowGrid";
import {MyRouter} from "./MyRouter";
import React from "react";
import { Layout, Menu } from 'antd';
import './../public/css/Page.css'
import {Button, message} from "antd/es";
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

    componentDidMount() {
        let user = {
            name:"Tom",
            age:"18",
            gender:"male",
            mobileNumber:"18306868857",
            email:"cgq786153492@gmail.com",
            address:"china",
            birth:"1998/10/01",
            registerCode:"000000",
            administratorRights:"1"
        };
        this.setState({user: user})
    }

    /**
     * 传入一个组件，验证用户是否登录，如未登录，弹出提示，如已登录，渲染组件
     * @param component
     */
    accessControl = (component) => {

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
            <MyRouter user={this.state.user} />
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

                                    <Button type="link" onClick={this.jurisdiction}>
                                        <Link to={'/personalCenter'}>个人中心</Link>
                                    </Button>
                            </Menu.Item>

                            <Menu.Item key="sub3" title="我的订单" icon={<UploadOutlined/>}>
                                <Button type="link" onClick={this.jurisdiction}>
                                    <Link to={'/menu'}>我的订单</Link>
                                </Button>
                            </Menu.Item>

                            <Menu.Item key="sub4" title="我的收藏" icon={<BarChartOutlined/>}>
                                <Button type="link" onClick={this.jurisdiction}>
                                    <Link to={'/collections'}>我的收藏</Link>
                                </Button>
                            </Menu.Item>

                            <Menu.Item key="sub5" title="浏览历史" icon={<CloudOutlined/>}>
                                <Button type="link">
                                    <Link to={'/searchResult'}>浏览历史</Link>
                                </Button>
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
import {
    BarChartOutlined,
    CloudOutlined,
    UserOutlined,
    UploadOutlined,
    HomeOutlined,
    BarsOutlined,
} from '@ant-design/icons';
import SubMenu from "antd/es/menu/SubMenu";
import {UserStateBar} from "./UserStateBar";
import {HashRouter, Link, BrowserRouter} from "react-router-dom";
import {MyRouter} from "./MyRouter";
import React from "react";
import { Layout, /*Menu*/ } from 'antd';
import './../public/css/PageH.css'
import {MyPrompt} from "../component/MyPrompt";
import {Content, Footer, /*Header*/} from "antd/es/layout/layout";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import { Power, User} from "grommet-icons";
import {
    Anchor,
    Box,
    Header,
    Nav,
    Menu,
    ResponsiveContext,
} from 'grommet';
import {Grommet as GrommetIcon, Menu as MenuIcon } from 'grommet-icons';
import Avatar from "antd/es/avatar";
import {UserStateBarOfH} from "./UserStateBarOfH";
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
            collapsed: false,
            menuItems: [
                {
                    label: "init1"
                },
                {
                    label: "init2"
                },

            ],
            fontStyle: {fontSize:"18px",fontWeight:600,color:"#7d4acf"}
        };

    }

    componentWillMount() {
        this.renderMenuItems1();
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

    renderMenuItems = () => {
        axios.get(urlsUtil.product.searchProductCategoryList).then((response) => {
            let data = response.data;
            let menuItems = null;
            console.log(data.body)
            if (data.code == 0) {
                menuItems = data.body.map((value,index) => {
                    return (
                        <Menu.Item
                            style={{width:110}}
                            key={index}
                        >
                            <Link
                                to={`/searchResult/${value}`}
                            >
                                {value}
                            </Link>
                        </Menu.Item>
                    );
                })
                console.log(menuItems)
            }
            let oldMenuItems = this.state.menuItems;
            if (oldMenuItems != menuItems) {
                this.state.menuItems = menuItems;
            }
        })
    }
    renderMenuItems1 = () => {
        const {fontStyle} = this.state;
        axios.get(urlsUtil.product.searchProductCategoryList).then((response) => {
            let data = response.data;
            let menuItems = null;
            console.log(data.body)
            if (data.code == 0) {
                menuItems = data.body.map((value,index) => {
                    return (
                        {
                            label: <span style={fontStyle}>{value}</span>,
                            href: `/#/searchResult/${value}`,
                        }
                    );
                })
            }
            let oldMenuItems = this.state.menuItems;
            if (oldMenuItems != menuItems) {
                this.setState({
                    menuItems: menuItems
                });
            }
        })
    }
    renderMenuItems2 = () => {
        axios.get(urlsUtil.product.searchProductCategoryList).then((response) => {
            let data = response.data;
            let menuItems = null;
            console.log(data.body)
            if (data.code == 0) {
                menuItems = data.body.map((value,index) => {
                    return (
                        <Anchor
                            href={`/searchResult/${value}`}
                            label={value}
                        />
                    );
                })
            }
            return menuItems;
        })
    }




    renderLayout2 = () => {
        let {menuItems} = this.state;
        console.log(menuItems)
        let {user} = this.props;
        const { Header, Content, Footer} = Layout;
        const {fontStyle} = this.state;
        return (
            <Layout className="layout"
            >
                <Header background="light-4" pad="small">
                    {/*<Avatar src={gravatarLink} />*/}
                    <Nav direction="row">
                        <Anchor label={<span style={fontStyle}>首页</span>} href="/#/home" />

                        {/*<ResponsiveContext.Consumer>*/}
                        {/*    <Box justify="end" direction="row" gap="medium">*/}
                        {/*        {this.renderMenuItems2}*/}
                        {/*    </Box>*/}
                        {/*</ResponsiveContext.Consumer>*/}
                        {/*<Menu
                            a11yTitle="Navigation Menu"
                            dropProps={{ align: { top: 'bottom', right: 'right' } }}
                            icon={<MenuIcon color="brand" />}
                            items={menuItems}
                        />*/}
                        <Menu
                            dropProps={{
                                align: { top: 'bottom', left: 'left' },
                                // color: "#7d4acf",
                                elevation: 'xlarge',
                            }}
                            label={<span style={fontStyle}>景区分类</span>}
                            // icon={<MenuIcon color="brand" />}
                            items={menuItems}
                        />
                        <Anchor label={<span style={fontStyle}>个人中心</span>} href="/#/personalCenter" />
                        <Anchor label={<span style={fontStyle}>我的订单</span>} href="/#/myOrders" />
                        <Anchor label={<span style={fontStyle}>我的收藏</span>} href="/#/myCollections" />
                        <Anchor label={<span style={fontStyle}>浏览历史</span>} href="/#/browsingHistory" />
                        {
                            !!user && user.admin ?
                                <Anchor label={<span style={fontStyle}>新增景点</span>} href="/#/addProduct" /> : null
                        }
                        <UserStateBarOfH user={this.props.user} getUser={this.getUser} />


                    </Nav>
                </Header>
                {/*<Header background="dark-1" pad="medium">
                    <Box align="center" pad="small" direction={"row"}>
                        <Link to={'/home'}>首页</Link>
                        <Link to={'/personalCenter'}>个人中心</Link>
                    </Box>
                    <ResponsiveContext.Consumer>
                        {responsive =>
                            responsive === 'small' ? (
                                <Menu
                                    label="Click me"
                                    items={[
                                        { label: 'This is', onClick: () => {} },
                                        { label: 'The Menu', onClick: () => {} },
                                        { label: 'Component', onClick: () => {} },
                                    ]}
                                />
                            ) : (
                                <Nav direction="row">
                                    <Anchor href="#" label="This is" />
                                    <Anchor href="#" label="The Nav" />
                                    <Anchor href="#" label="Component" />
                                </Nav>
                            )
                        }
                    </ResponsiveContext.Consumer>
                </Header>*/}
                {/*<UserStateBar user={this.state.user} getUser={this.getUser} />*/}
                <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                    <div className="site-layout-content">
                        {
                            this.renderRoutes() ? this.renderRoutes():null
                        }
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
    renderLayout3 = () => {
        let {menuItems} = this.state;
        let {user} = this.props;
        const { Header, Content, Footer} = Layout;
        return (
            <Layout className="layout"
            >
                <Header background="light-4" pad="medium" height="xsmall">
                    <Anchor
                        href="https://tools.grommet.io/"
                        icon={<GrommetIcon color="brand" />}
                        label="Grommet Tools"
                    />
                    <ResponsiveContext.Consumer>
                        {size =>
                            size === 'small' ? (
                                <Box justify="end">
                                    <Menu
                                        a11yTitle="Navigation Menu"
                                        dropProps={{ align: { top: 'bottom', right: 'right' } }}
                                        icon={<MenuIcon color="brand" />}
                                        items={[
                                            {
                                                label: <Box pad="small">Grommet.io</Box>,
                                                href: 'https://v2.grommet.io/',
                                            },
                                            {
                                                label: <Box pad="small">Feedback</Box>,
                                                href: 'https://github.com/grommet/grommet/issues',
                                            },
                                        ]}
                                    />
                                </Box>
                            ) : (
                                <Box justify="end" direction="row" gap="medium">
                                    <Anchor href="https://v2.grommet.io/" label="Grommet.io" />
                                    <Anchor
                                        href="https://github.com/grommet/grommet/issues"
                                        label="Feedback"
                                    />
                                </Box>
                            )
                        }
                    </ResponsiveContext.Consumer>
                </Header>

                <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                    <div className="site-layout-content">
                        {
                            this.renderRoutes() ? this.renderRoutes():null
                        }
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }

    renderLayout4 = () => {
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

                    <Box align="center" pad="large">
                        <Link to={'/home'}>首页</Link>
                    </Box>
                    {/*<Box align="center" pad="large">
                        <Menu
                            dropProps={{ align: { top: 'bottom', left: 'left' } }}
                            label="actions"
                            items={menuItems}
                        />
                    </Box>*/}
                    <Box align="center" pad="large">
                        <Link to={'/personalCenter'}>个人中心</Link>
                    </Box>

                </Sider>
                <Layout className="site-layout"
                >
                    <UserStateBar user={this.props.user} getUser={this.getUser}/>
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
        return (
            <HashRouter>
                {/*路由拦截*/}
                <MyPrompt
                    user={this.props.user}
                />
                {this.renderLayout2()}
            </HashRouter>
        )
    }
}


import React from 'react'
import Menu from "antd/es/menu";
import SubMenu from "antd/es/menu/SubMenu";
import Switch from "antd/es/switch";
import Divider from "antd/es/divider";

export class LeftNavigationMenu extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            lineMode: false,
            lightTheme: true,
        };

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


    render() {
        let {lineMode} = this.state;
        let {lightTheme} = this.state;

        return (
            <div style={{width: 256}}>
                <Switch onChange={this.changeMode} /> Change Mode
                <Divider type="vertical" />
                <Switch onChange={this.changeTheme} /> Change Style
                <Menu
                    defaultSelectedKeys={['1']}
                    // defaultOpenKeys={['sub1']}
                    mode={!lineMode ? 'vertical' : 'inline'}
                    theme={lightTheme ? 'light' : 'dark'}
                >
                    <SubMenu key="sub1" title="大同">
                        <Menu.Item key="5">大同古城墙</Menu.Item>
                        <Menu.Item key="6">华严寺</Menu.Item>
                        <Menu.Item key="6">善化寺</Menu.Item>
                        <Menu.Item key="6">悬空寺</Menu.Item>
                        <Menu.Item key="7">云冈石窟</Menu.Item>
                        <Menu.Item key="8">桃花山</Menu.Item>
                        <Menu.Item key="8">方特欢乐世界</Menu.Item>
                        <Menu.Item key="8">平型关战役遗址</Menu.Item>
                        <Menu.Item key="8">桃花山景区桃花山景区</Menu.Item>
                        <Menu.Item key="8">九龙壁</Menu.Item>
                        <Menu.Item key="8">晋华宫煤矿</Menu.Item>
                        <Menu.Item key="8">晋华宫煤矿</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title="晋中">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        );
    }

}
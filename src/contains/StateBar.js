import React from "react";
import {
    PageHeader,
    Space,
    Modal,
} from "antd/es";
import {ButtonList} from "../component/ButtonList";
import {Login} from "./Login";
import sessionContext from "../cache/sessionContext";
import {localContext} from "../cache/localContext"
// const localContext = require('./../cache/localContext');

export class StateBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            visible: false,
            pageHeader: null,
            modalContent: null,
        };
    }

    componentDidMount() {
        this.returnPageHandler(this.state.user);
        this.setState({
            modalContent:<Login getUser={this.getUser} />,
        })

    }

    getUser = (here,result) => {
        if(result.stateMsg === 'success') {
            this.props.getUser(here,result.user)
        }
        let modalContent = result.result;
        this.setState({
            modalContent:modalContent
        })


    }


    returnExtraButton = (para) => {
        return <ButtonList buttons={para} />;
    }

    hideModal = () => {
        this.setState({visible: false})
        this.returnPageHandler(this.props.user);
    }
    showModal = () => {
        this.setState({
            visible: true,
        })
    }




    returnLoginConversationBox = () => {
        return (
            <Modal
                title= "Modal"
                visible= {this.state.visible}
                onOk= {this.hideModal}
                onCancel= {this.hideModal}
                closable= {false}
                okText= '确认'
                cancelText= '关闭'

            >

                {this.state.modalContent}
            </Modal>
        );
    }

    returnPageHandler = (user) => {
        let isLogin = !!user;
        let logined = [
            {
                type: 'ghost',
                content: '我的订单'
            },
            {
                type: 'default',
                content: '浏览历史'
            },
            {
                type: 'primary',
                content: '个人中心'
            },
            {
                type: 'primary',
                content: '登出',
                handleClick: () => {
                    localContext.remove('user');
                    sessionContext.remove('user');
                    window.location.reload();
                }
            }
        ];
        let noLogin = [
            {
                type: 'primary',
                content: '去登录',
                handleClick: this.showModal
            }
        ];
        let buttonsPara = isLogin ? logined:noLogin;

        let pageHeader = (
            <div>
                <PageHeader
                    avatar={{ src: 'http://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                    ghost={false}
                    // onBack={() => window.history.back()}
                    title={!isLogin ? '请登录':user.name}

                    extra={this.returnExtraButton(buttonsPara)}
                    style={{padding:'0px 36px'}}
                />
            </div>
        );
        this.setState({pageHeader:pageHeader})
    }

    render() {
        return (
            <div>
                <Space>
                    {this.returnLoginConversationBox()}
                </Space>
                <div>
                    {this.state.pageHeader}
                </div>
            </div>
        );
    }
}
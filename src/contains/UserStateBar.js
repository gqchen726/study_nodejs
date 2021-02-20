import React from "react";
import {
    PageHeader,
    Space,
    Modal,
} from "antd/es";
import {ButtonList} from "../component/ButtonList";
import {SimpleLogin} from "./SimpleLogin";
const localContext = require('../cache/LocalContext');

export class UserStateBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            visible: false,
            pageHeader: null,
            modalContent: null,
        };
        this.returnPageHandler = this.returnPageHandler.bind(this);
        this.returnExtraButton = this.returnExtraButton.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.showModal = this.showModal.bind(this);
        this.returnLoginConversationBox = this.returnLoginConversationBox.bind(this);
    }

    componentDidMount() {
        this.returnPageHandler(this.state.user);
        this.setState({
            modalContent:<SimpleLogin getUser={this.getUser} />,
        })
    }



    getUser = (here,result) => {
        if(result.state === 'success') {
            this.props.getUser(here,result.user)
            let modalContent = result.result;
            this.setState({
                modalContent:modalContent
            })
        } else {
            let modalContent = result.result;
            this.setState({
                modalContent:modalContent
            })
        }


    }


    returnExtraButton(para) {
        return <ButtonList buttons={para} />;
    }

    hideModal() {
        this.setState({visible: false})
        this.returnPageHandler(this.props.user);
    }
    showModal() {
        this.setState({
            visible: true,
        })
    }




    returnLoginConversationBox() {
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

    returnPageHandler(user) {
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
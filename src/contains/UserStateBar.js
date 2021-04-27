import React from "react";
import {
    PageHeader,
    Space,
    Modal,
} from "antd/es";
import {ButtonList} from "../component/ButtonList";
import {SimpleLogin} from "./SimpleLogin";
const localContext = require('../cache/LocalContext');
import PropTypes from "prop-types"
import "./../public/css/UseStatusBar.css"
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
export class UserStateBar extends React.Component {

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
        let {user, mode} = this.props;
        this.returnPageHandler(user, mode);
        this.getLoginCard();
    }

    getLoginCard = () => {
        this.setState({
            modalContent:<SimpleLogin getUser={this.getUser} />,
        })
    }



    getUser = (here,result) => {
        if (here && result) {
            if(result.stateMsg === 'loginSuccess') {
                this.props.getUser(here,result.user)
            }
            let modalContent = result.result;
            this.setState({
                modalContent:modalContent
            })
            setTimeout(() => {
                if (result.stateMsg === 'registerSuccess') {
                    this.getLoginCard();
                }
            },1000)
        }
    }


    returnExtraButton = (para,isbr) => {
        return <ButtonList buttons={para} isBr={isbr} />;
    }

    hideModal = () => {
        let {user, mode} = this.props;
        this.setState({visible: false})
        this.returnPageHandler(user, mode);
    }
    showModal = () => {
        this.setState({
            visible: true,
        })
    }




    returnLoginConversationBox = () => {
        return (
            <Modal
                title= "用户面板"
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

    returnPageHandler = (user,mode) => {
        let isLogin = !!user;
        let logined = [
            // {
            //     type: 'ghost',
            //     content: '我的订单'
            // },
            // {
            //     type: 'default',
            //     content: '浏览历史'
            // },
            // {
            //     type: 'primary',
            //     content: '个人中心'
            // },
            {
                type: 'primary',
                content: '登出',
                handleClick: () => {
                    localContext.remove('user');
                    window.location.reload();
                }
            },
            {
                type: 'primary',
                content: '修改密码',
                linkPath: "/userPasswordOfUpdate"
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


        let pageHeader;
        if (mode == "Icon") {
            pageHeader =  (
                <div>
                    {this.returnExtraButton(buttonsPara,true)}
                </div>
            );
        } else {
            pageHeader = (
                <div>
                    <PageHeader
                        avatar={{ src: user.avatar? `${urlsUtil.image.get}?file=${user.avatar}`:'http://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
                        ghost={false}
                        // onBack={() => window.history.back()}
                        // title={!isLogin ? '请登录':user.name.value}
                        title={!isLogin ? '请登录':user.name}

                        extra={this.returnExtraButton(buttonsPara,false)}
                        style={{padding:'0px 36px'}}
                    />
                </div>
            );
        }
        this.setState({pageHeader:pageHeader})
    }

    render() {
        let {pageHeader} = this.state;
        return (
            <div>
                <Space>
                    {this.returnLoginConversationBox()}
                </Space>
                <div>
                    {
                        pageHeader
                    }
                </div>
            </div>
        );
    }
}
UserStateBar.propTypes = {
    mode: PropTypes.string,
    user: PropTypes.object,
    getUser: PropTypes.func
}
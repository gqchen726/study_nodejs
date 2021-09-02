import {Button, Card, Input, Select, Tooltip, Switch, Alert, notification, message} from "antd/es";
// import {CheckOutlined} from '@ant-design/icons';
import React from "react";
import "../public/css/Login.css";
import axios from "axios";
import {Page} from "./Page";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {useHistory, withRouter} from "react-router";
import {Link} from "react-router-dom";
import "./../public/css/User.css"
import {util} from "../common/Util";
export class UserPasswordOfUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newObj: {
                mobileNumber: props.user.mobileNumber
            },
            cardList: [],
            cardContentList:[],
            key: 'updateForPassword',
            getUser: props.getUser,
            logonCredentials: null,
            loading: false,
            loadingCount: null,
            getCheckCodeButtonContent: '获取验证码',
            tipMessage: {},
            verificationOfPass: false
        };

    }

    componentWillMount() {
        this.buttonControl()
    }


    /**
     * 用户修改密码业务逻辑
     */
    updatePassword = () => {
        this.setState({
            isLoading: true,
        })
        let {newObj} = this.state;

        // 真实请求
        axios.post(urlsUtil.user.changePassword, newObj).then(
            (response) => {
                let data = response.data;
                let result;
                this.setState({
                    isLoading: false,
                })
                util.tipMessage('update password tips',data.message)
            })
            .catch(
                (error) => {
                    this.setState({
                        isLoading: false,
                    })
                    util.tipMessage('login tips',error.toString())
                });

    }

    /**
     * 密码修改方式标签的切换
     * @param key 标签key
     * @param type 标签类型
     */
    onTabChange = (key,type) => {
        this.setState({
            [type] :key
        });
    }

    /**
     * 获取验证码
     */
    getCheckCode = () => {
        let loadingCount = 60;
        let getCheckCodeButtonContent;
        this.setState({loading:true})
        util.sendCheckCode(this.props.user.mobileNumber);



        let timerKey = setInterval(() => {

            if (loadingCount > 0) {
                getCheckCodeButtonContent = --loadingCount;
            } else {
                getCheckCodeButtonContent = '点此获取验证码';
            }
            this.setState({getCheckCodeButtonContent:getCheckCodeButtonContent})
        },1000);
        this.setState({timerKey:timerKey})
        setTimeout(() => {
            this.setState({loading:false,getCheckCodeButtonContent:'重新获取验证码'});
            clearInterval(this.state.timerKey)
        },60*1000)
    }
    

    /**
     * 自动收集表单信息并注入到user对象中
     * @param event
     */
    autoSave = (event) => {
        let value = event.target.value;
        let id = event.target.id;

        let {newObj} = this.state;


        if(id === "name") {
            newObj.name = value;
        } else if(id === "mobileNumber") {
            newObj.mobileNumber = value;
        } else if(id === "checkCode") {
            newObj.checkCode = value;
        } else if(id === "password") {
            newObj.password = value;
        } else if(id === "rePassword") {
            newObj.rePassword = value;
        } else if(id === "oldPassword") {
            newObj.oldPassword = value;
        } else if(id === "newPassword") {
            newObj.newPassword = value;
        } else if(id === "confirmNewPassword") {
            newObj.confirmNewPassword = value;
        }
        this.verificationOfTextContentValidity(id,value);


        this.setState({
            newObj: newObj,
        })
    }

    /**
     * 传入newObj对象以校验修改密码时两次输入密码的一致性
     * @param user
     * @returns {*}
     */
    rePasswordCheck = (newObj) => {
        if (newObj.newPassword != newObj.confirmNewPassword) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 按钮控制，当输入框校验不通过时，登录或注册按钮禁用点击
     * @returns {boolean}
     */
    buttonControl = () => {
        let {newObj} = this.state;
        let {verificationOfPass} = this.state;
        let {key} = this.state;
        if (verificationOfPass) {
            if (key == "updateForPassword") {
                verificationOfPass = ((newObj.oldPassword && newObj.newPassword && newObj.confirmNewPassword) ? true:false);
            } else {
                verificationOfPass = ((newObj.checkCode && newObj.newPassword && newObj.confirmNewPassword) ? true:false);
            }
        }
        setTimeout(() => {
            this.setState({
                verificationOfPass: verificationOfPass
            })
        },0)
    }

    /**
     * 文本内容合法性校验
     * @param mobileNumber
     */
    verificationOfTextContentValidity = (targetType,targetValue) => {
        // /^[1-9][0-9]{10}$/
        let passwordRegExp = /^.*(?=.{6,})(?=.*\d)((?=.*[A-Z])|(?=.*[a-z]))(?=.*[!@#$%^&*?.]).*$/;

        let {tipMessage} = this.state;
        let {newObj} = this.state;
        let verificationOfPass;

        if (targetType === "confirmNewPassword") {
            if (targetValue && !passwordRegExp.test(targetValue)) {
                tipMessage.newPasswordTip = <Alert type='error' message='合法密码应介于8~20位之间且仅允许且必须出现出现字母、数字和特殊字符' />;
                verificationOfPass = false;
            } else {
                verificationOfPass = true;
                tipMessage.newPasswordTip = null;
                if (newObj.newPassword && newObj.newPassword) {
                    if (!this.rePasswordCheck(newObj)) {
                        tipMessage.newPasswordTip = <Alert type='error' message='两次输入的密码不一致' />;
                        verificationOfPass = false;
                    } else {
                        tipMessage.newPasswordTip = null;
                        verificationOfPass = true;
                    }
                }
            }
        } else if (targetType === "confirmNewPassword") {
            if (targetValue && !passwordRegExp.test(targetValue)) {
                tipMessage.confirmNewPasswordTip = <Alert type='error' message='合法密码应介于8~20位之间且仅允许且必须出现出现字母、数字和特殊字符' />;
                verificationOfPass = false;
            } else {
                verificationOfPass = true;
                tipMessage.confirmNewPasswordTip = null;
                if (newObj.newPassword && newObj.newPassword) {
                    if (!this.rePasswordCheck(newObj)) {
                        tipMessage.confirmNewPasswordTip = <Alert type='error' message='两次输入的密码不一致' />;
                        verificationOfPass = false;
                    } else {
                        tipMessage.confirmNewPasswordTip = null;
                        verificationOfPass = true;
                    }
                }
            }
        }else if (targetType === "oldPassword") {
            if (targetValue) {
                verificationOfPass = false;
            } else {
                tipMessage.passwordTip = null;
                verificationOfPass = true;
            }
        }


        //利用setTimeout方法可以解决state的异步问题，
        // 因为setState只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的
        setTimeout(() => {
            this.setState({
                tipMessage: tipMessage,
                verificationOfPass: verificationOfPass
            })
        },0)
    }


    /**
     * 返回修改密码按钮
     * @returns {JSX.Element}
     */
    returnUpdatePasswordButton = (verificationOfPass) => {
        return (
            <Button
                type={"primary"}
                disabled={false}/*{!verificationOfPass}*//*{!this.buttonControl()}*/
                style={{width:'30%'}}
                onClick={this.updatePassword}
                loading={this.state.isLoading}
            >
                修改密码

            </Button>
        );
    }


    /**
     * 修改密码卡片组件的渲染
     * @returns {JSX.Element}
     */
    renderUpdatePasswordCard = (verificationOfPass) => {

        const cardList = [
            {
                key: 'updateForPassword',
                tab: '通过旧密码修改密码'
            },
            {
                key: 'updateForCheckCode',
                tab: '通过验证码修改密码'
            }
        ];
        /*
         * 通过旧密码修改密码卡片
         */
        const updateForPassword = (
            <div style={{width:'100%'}}>
                <Input.Group compact>
                    <div style={{width:'100%'}}>
                        旧&nbsp;&nbsp;密&nbsp;&nbsp;码:&nbsp;&nbsp;
                        <Input.Password
                            id='oldPassword'
                            style={{ width: '80%' }}
                            placeholder={'请输入旧密码'}
                            allowClear={false}
                            maxLength={20}
                            onChangeCapture={this.autoSave}
                        />
                    </div>
                    <br />
                    <br />
                    <div style={{width:'100%'}}>
                        新&nbsp;&nbsp;密&nbsp;&nbsp;码:&nbsp;&nbsp;
                        <Input.Password
                            id='newPassword'
                            style={{ width: '80%' }}
                            placeholder={'请输入新密码'}
                            allowClear={false}
                            maxLength={20}
                            onChangeCapture={this.autoSave}
                        />
                    </div>
                    <br />
                    <br />
                    {this.state.tipMessage.newPasswordTip}
                    <div style={{width:'100%'}}>
                        新&nbsp;&nbsp;密&nbsp;&nbsp;码:&nbsp;&nbsp;
                        <Input.Password
                            id='confirmNewPassword'
                            style={{ width: '80%' }}
                            placeholder={'请确认新密码'}
                            allowClear={false}
                            maxLength={20}
                            onChangeCapture={this.autoSave}
                        />
                    </div>
                    <br />
                    {this.state.tipMessage.confirmNewPasswordTip}
                </Input.Group>
                <br />
                {this.returnUpdatePasswordButton(verificationOfPass)}
            </div>
        );
        /*
         * 通过验证码修改密码卡片
         */
        const updateForCheckCode = (
            <div style={{width:'100%'}}>
                <Input.Group compact>
                    <div style={{width:'100%'}}>
                        验&nbsp;&nbsp;证&nbsp;&nbsp;码:&nbsp;&nbsp;
                        <Input
                            id='checkCode'
                            style={{ width: '50%' }}
                            placeholder={'请输入验证码'}
                            allowClear={false}
                            maxLength={6}
                            onChangeCapture={this.autoSave}
                        />
                        <Tooltip placement={'top'} title={'获取验证码'}>
                            <Button
                                style={{width:'30%'}}
                                type={"primary"}
                                loading={this.state.loading}
                                onClick={this.getCheckCode}
                            >
                                <span
                                    style={{font:{size:'11px'}}}
                                >
                                    {this.state.getCheckCodeButtonContent}
                                </span>
                            </Button>
                        </Tooltip>
                    </div>
                    <br />
                    <br />
                    <div style={{width:'100%'}}>
                        新&nbsp;&nbsp;密&nbsp;&nbsp;码:&nbsp;&nbsp;
                        <Input.Password
                            id='newPassword'
                            style={{ width: '80%' }}
                            placeholder={'请输入新密码'}
                            allowClear={false}
                            maxLength={20}
                            onChangeCapture={this.autoSave}
                        />
                    </div>
                    <br />
                    <br />
                    {this.state.tipMessage.newPasswordTip}
                    <div style={{width:'100%'}}>
                        新&nbsp;&nbsp;密&nbsp;&nbsp;码:&nbsp;&nbsp;
                        <Input.Password
                            id='confirmNewPassword'
                            style={{ width: '80%' }}
                            placeholder={'请确认新密码'}
                            allowClear={false}
                            maxLength={20}
                            onChangeCapture={this.autoSave}
                        />
                    </div>
                    <br />
                    {this.state.tipMessage.confirmNewPasswordTip}
                </Input.Group>
                <br />
                {this.returnUpdatePasswordButton(verificationOfPass)}
            </div>
        );


        let cardContentList = {
            updateForPassword: updateForPassword,
            updateForCheckCode: updateForCheckCode,
        };
        let {key} = this.state;


        let loginCard = (
            <Card
                title="修改密码"
                tabList={cardList}
                activeTabKey={this.state.key}
                onTabChange={key => {
                    this.onTabChange(key, 'key');
                }}
            >
                {cardContentList[key]}
            </Card>
        );
        return loginCard;
    }



    render() {

        let {verificationOfPass} = this.state;

        return (
            <div className="User-UpdatePassword"  style={{ width: '100%' }}>
                {this.renderUpdatePasswordCard(verificationOfPass)}
            </div>
        );
    }
}
export const UserPasswordOfUpdateW = withRouter(UserPasswordOfUpdate)
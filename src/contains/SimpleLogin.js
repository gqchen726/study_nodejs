import { Button, Card, Input, Select, Tooltip, Switch, Alert } from "antd/es";
// import {CheckOutlined} from '@ant-design/icons';
import React from "react";
import "../public/css/Login.css";
import axios from "axios";
const localContext = require('../cache/LocalContext');
import {userUrls} from "../public/ApiUrls/UserUrls";
export class SimpleLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: null,
            mobileNumber:null,
            user: {},
            // globalUrl:`http://localhost:8000/login`,
            // globalUrl:`http://192.168.1.6:8000/mytest`,
            globalUrls:userUrls,
            cardList: [],
            cardContentList:[],
            key: 'loginForPassword',
            isGoLogin:false,
            getUser: props.getUser,
            logonCredentials: null,
            loading: false,
            loadingCount: null,
            getCheckCodeButtonContent: '获取验证码',
            rememberMe: false,
            tipMessage: {},
        };

    }

    login = () => {
        this.setState({
            isLoading: true,
        })
        let {user} = this.state;
        let result = null;

        //真实请求
        // let url = `${this.state.globalUrl}/login/in`;
        // axios.post(userUrls.loginUrl, user).then(
        //      (response) => {
        //          this.setState({
        //              isLoading: false,
        //          })
        //          if(response.code) {
        //              result = {
        //                  stateMsg: 'failed',
        //                  result:(
        //                      <div className="Home-Login">
        //                          {/*<br />*/}
        //                          登录失败
        //                      </div>
        //                  )
        //              };
        //          } else {
        //              result = {
        //                  stateMsg: 'success',
        //                  user:user,
        //                  result:(
        //                      <div className="Home-Login">
        //                          {/*<br />*/}
        //                          登录成功
        //                      </div>
        //                  )
        //              };
        //          }
        //     }).catch(
        //         (error) => {
        //             result = {
        //                 stateMsg: 'failed',
        //                 error:error,
        //                 result:(
        //                     <div className="Home-Login">
        //                         {/*<br />*/}
        //                         发生错误
        //                     </div>
        //                 )
        //             };
        //         });
        // this.toUser(result);



        // 模拟数据
        user = {
            name:"Tom",
            age:"18",
            gender:"male",
            mobileNumber:this.state.mobileNumber,
            email:"cgq786153492@gmail.com",
            address:"china",
            birth:"1998/10/01",
            registerCode:"000000",
            administratorRights:"1"
        };
        result = {
            stateMsg: 'success',
            user:user,
            result:(
                <div className="Home-Login">
                    {/*<br />*/}
                    登录成功
                </div>
            )
        };
        this.toUser(result);

        // 本地缓存Cookie
        if (this.state.rememberMe) {
            localContext.put('user',user);
        }



    }
    register = () => {
        this.setState({
            isLoading: true,
        })
        let {user} = this.state;
        let result = null;
        // let url = `${this.state.globalUrl}/user/create`;
        axios.post(userUrls.registerUrl, user).then(
             (response) => {
                this.setState({
                    isLoading: false,
                })
                if(response.code) {
                    result = {
                        stateMsg: 'success',
                        result:(
                            <div className="Home-Login">
                                {/*<br />*/}
                                注册失败
                            </div>
                        )
                    };
                } else {
                    result = {
                        stateMsg: 'success',
                        result:(
                            <div className="Home-Login">
                                {/*<br />*/}
                                注册成功
                            </div>
                        )
                    };
                }
            })
            .catch( (error) => {
                console.log("error");
                this.toUser({
                    stateMsg: 'failed',
                    error:error,
                    result:(
                        <div className="Home-Login">
                            {/*<br />*/}
                            发生错误
                        </div>
                    )
                });
            });
        this.toUser(result);
    }

    toUser = (result) => {
        this.props.getUser(this,result);
    }

    onTabChange = (key,type) => {
        this.setState({
            [type] :key
        });
    }
    getCheckCode = () => {
        let loadingCount = 60;
        let getCheckCodeButtonContent;
        this.setState({loading:true})

        let timerKey = setInterval(() => {
            console.log("timer running");
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
        // console.log(event);
        let value = event.target.value;
        let id = event.target.id;

        let {user} = this.state;


        if(id === "username") {
            user.username = value;
        } else if(id === "mobileNumber") {
            user.mobileNumber = value;
        } else if(id === "checkCode") {
            user.checkCode = value;
        } else if(id === "password") {
            user.password = value;
        } else if(id === "rePassword") {
            user.rePassword = value;
        }
        this.verificationOfTextContentValidity(id,value);



        this.setState({
            user: user,
        })
    }

    /**
     * 传入user对象以校验注册时两次输入密码的一致性
     * @param user
     * @returns {*}
     */
    rePasswordCheck = (user) => {
        let {tipMessage} = this.state;

        if (user.password != user.rePassword) {
            tipMessage.passwordTip = <Alert type='error' message='两次输入的密码不一致' />;
        } else {
            tipMessage.passwordTip = null;
        }
        return tipMessage;
    }

    /**
     * 文本内容合法性校验
     * @param mobileNumber
     */
    verificationOfTextContentValidity = (targetType,targetValue) => {
        let phoneRegExp = /^[0-9]{0,11}$/;
        let passwordRegExp = /^[0-9a-zA-Z]{8,20}$/;

        let {tipMessage} = this.state;
        let {user} = this.state;

        if (targetType === "mobileNumber") {
            if (targetValue && !phoneRegExp.test(targetValue)) {
                tipMessage.phoneNumberTip = <Alert type='error' message='手机号码中不得出现除0～9的字符' />;
            } else if (targetValue.length === 11 && this.state.isGoLogin === true) {
                let url = `${userUrls.checkMobileNumber}?mobileNumber=${targetValue}`;

                axios.get(url).then(
                    (response) => {
                        if (!response.code) {
                            tipMessage.phoneNumberTip = <Alert type='error' message={response.data.message} />;
                        }
                    }
                );
                // let res = '该手机号码已被注册';
                // tipMessage.phoneNumberTip = <Alert type='error' message={res} />;
            } else {
                tipMessage.phoneNumberTip = null;
            }
        } else if (targetType === "password" || targetType === "rePassword") {
            if (targetValue && !passwordRegExp.test(targetValue)) {
                tipMessage.passwordTip = <Alert type='error' message='合法密码应介于8~20位之间且仅允许且必须出现出现大小写字母和数字' />;
            } else {
                tipMessage.passwordTip = null;
                if (user.password && user.rePassword) {
                    tipMessage = this.rePasswordCheck(user);

                }
            }
        }


        //利用setTimeout方法可以解决state的异步问题，
        // 因为setState只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的
        setTimeout(() => {
            this.setState({
                tipMessage: tipMessage,
            })
        },0)
    }
    /**
     * 登录与注册卡片的互相转换
     */
    cardStateSwitch = () => {
        let {isGoLogin} = this.state;
        this.setState({
            isGoLogin: !isGoLogin
        });
    }


    componentDidMount = () => {
        let optionsArr = ["+86","+1"];
        let options = optionsArr.map( (items) => <Select.Option key={items} >{items}</Select.Option>)
        this.setState({
            options:options,
        });
    }

    returnLoginButton = () => {
        return (
            <Button type={"primary"} style={{width:'30%'}} onClick={this.login} loading={this.state.isLoading}>登陆</Button>
        );
    }
    isRememberMe = () => {
        let {rememberMe} = this.state;
        this.setState({rememberMe: !rememberMe})
    }
    /**
     * 登录卡片组件的渲染
     * @returns {JSX.Element}
     */
    renderLoginCard = () => {

        const cardList = [
            {
                key: 'loginForPassword',
                tab: '密码登陆'
            },
            {
                key: 'loginForCheckCode',
                tab: '验证码登陆'
            }
        ];
        /*
         * 密码登陆卡片
         */
        const loginForPassword = (
            <div style={{width:'100%'}}>
                <Input.Group compact>
                    {/*<space size={[16,0]}>*/}
                    {/*    */}
                    {/*</space>*/}
                    <div style={{width:'100%'}}>
                        手机号码:&nbsp;&nbsp;
                        <Tooltip placement={'top'} title={'请输入正确的的11位手机号码'}>
                            <Input id='mobileNumber'
                                   style={{ width: '80%' }}
                                   placeholder={'请输入您的手机号码'}
                                   allowClear={false}
                                   maxLength={11}
                                   onChangeCapture={this.autoSave}
                            />
                        </Tooltip>
                    </div>
                    <br />
                    {this.state.tipMessage.phoneNumberTip}

                    <br />
                    <div style={{width:'100%'}}>
                        密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:&nbsp;&nbsp;
                        <Input.Password
                            id='password'
                            style={{ width: '80%' }}
                            placeholder={'请输入密码'}
                            allowClear={false}
                            maxLength={20}
                            onChangeCapture={this.autoSave}
                        />
                    </div>



                    <br />
                    {this.state.tipMessage.passwordTip}
                </Input.Group>
                <br />
                <p style={{textAlign: 'left'}}>记住我<Switch checked={this.state.rememberMe} size='small' onClick={this.isRememberMe} /></p>
                {this.returnLoginButton()}
            </div>
        );
        /*
         * 验证码登陆卡片
         */
        const loginForCheckCode = (
            <div style={{width:'100%'}}>
                <Input.Group compact>
                   <div style={{width:'100%'}}>
                       手机号码:&nbsp;&nbsp;
                       <Tooltip placement={'top'} title={'请输入正确的的11位手机号码'}>
                           <Input id='mobileNumber'
                                  style={{ width: '50%' }}
                                  placeholder={'请输入您的手机号码'}
                                  allowClear={false}
                                  maxLength={11}
                                  onChangeCapture={this.autoSave}
                           />
                       </Tooltip>
                       <Tooltip placement={'top'} title={'获取验证码'}>
                           <Button style={{width:'30%'}} loading={this.state.loading} type={"primary"} onClick={this.getCheckCode}><span style={{font:{size:'11px'}}}>{this.state.getCheckCodeButtonContent}</span></Button>
                       </Tooltip>
                   </div>

                    <br />
                    {this.state.tipMessage.phoneNumberTip}
                    <br />
                    {/*验证码输入框*/}
                    <div style={{width: '100%'}}>
                        验&nbsp;&nbsp;证&nbsp;&nbsp;码:&nbsp;&nbsp;
                        <Input id='checkCode'
                               style={ { width: '80%'} }
                               maxLength={6}
                               placeholder="请输入验证码"
                               allowClear={false}
                               onChangeCapture={this.autoSave}
                        />
                    </div>
                    <br />
                    {this.state.tipMessage.passwordTip}
                </Input.Group>
                <br />
                {this.returnLoginButton()}
            </div>
        );


        let cardContentList = {
            loginForPassword: loginForPassword,
            loginForCheckCode: loginForCheckCode,
        };
        let {key} = this.state;


        let loginCard = (
            <Card
                title="登陆"
                tabList={cardList}
                activeTabKey={this.state.key}
                onTabChange={key => {
                    this.onTabChange(key, 'key');
                }}
                extra={<Button type={"primary"} onClick={this.cardStateSwitch} >{this.state.isGoLogin ? "登陆":"注册"}</Button>}
            >
                {cardContentList[key]}
            </Card>
        );
        return loginCard;
    }


    renderRegisterCard = () => {

        const customerRegisterCard = (

            <Card
                // style={{width:'160%'}}
                title="注册"
                extra={<Button type={"primary"} onClick={this.cardStateSwitch} >{this.state.isGoLogin ? "登陆":"注册"}</Button>}
            >
                <div>
                    <Input.Group compact>
                        {/*用户名输入框*/}
                        <div style={{ width: '100%' }}>
                            用&nbsp;&nbsp;户&nbsp;&nbsp;名:&nbsp;&nbsp;
                            <Input id='username' style={{ width: '80%' }} placeholder={'请输入用户名'} allowClear={false} maxLength={30} onChangeCapture={this.autoSave} />
                        </div>
                        <br /><br />
                        {/*手机号码输入框*/}
                        <div style={{width:'100%'}}>

                            <span style={{width:'100%'}}>
                                手机号码:&nbsp;&nbsp;
                                <Input id='mobileNumber'
                                       style={{ width: '50%' }}
                                       placeholder={'请输入您的手机号码'}
                                       allowClear={false}
                                       maxLength={11}
                                       onChangeCapture={this.autoSave}
                                />

                                <Tooltip placement={'top'} title={'获取验证码'}>
                                    <Button style={{width:'30%'}} type={"primary"} loading={this.state.loading} onClick={this.getCheckCode}><span style={{font:{size:'11px'}}}>{this.state.getCheckCodeButtonContent}</span></Button>
                                </Tooltip>
                            </span>
                        </div>
                        <br />
                        {/*手机号码输入框提示*/}
                        {this.state.tipMessage.phoneNumberTip}
                        <br />
                        {/*验证码输入框*/}
                        <div style={{width: '100%'}}>
                            验&nbsp;&nbsp;证&nbsp;&nbsp;码:&nbsp;&nbsp;
                            <Input id='checkCode'
                                   style={ { width: '80%'} }
                                   maxLength={6}
                                   placeholder="请输入验证码"
                                   allowClear={false}
                                   onChangeCapture={this.autoSave}
                            />
                        </div>

                        <br /><br />
                        {/*密码输入框*/}
                        <div style={{width:'100%'}}>
                            密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:&nbsp;&nbsp;
                            <Input.Password
                                id='password'
                                style={{ width: '80%' }}
                                placeholder={'请输入密码'}
                                allowClear={false}
                                maxLength={20}
                                onChangeCapture={this.autoSave}
                            />
                        </div>
                        <br />
                        {/*密码输入框提示*/}
                        {this.state.tipMessage.passwordTip}
                        <br />
                        <div style={{width:'100%'}}>
                            密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:&nbsp;&nbsp;
                            <Input.Password
                                id='rePassword'
                                style={{ width: '80%' }}
                                placeholder={'请再次输入密码'}
                                allowClear={false}
                                maxLength={20}
                                onChangeCapture={this.autoSave}
                            />
                        </div>
                    </Input.Group>
                    <br />
                    <Button type={"primary"} style={{width:'30%'}} onClick={this.register}>注册</Button>
                </div>
            </Card>

        );
        return customerRegisterCard;
    }

    render() {
        let {isGoLogin} = this.state;
        let currentCard;

        if(!isGoLogin) {
            let loginCard = this.renderLoginCard();
            currentCard = loginCard;
        } else {
            let customerRegisterCard = this.renderRegisterCard();
            currentCard = customerRegisterCard;
        }
        return (
            <div className="Home-Login"  style={{ width: '100%' }}>
                {currentCard}
            </div>
        );
    }
}

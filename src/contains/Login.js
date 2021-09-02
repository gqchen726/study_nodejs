import { Button, Card, Input, Select, Tooltip, Switch, Alert } from "antd/es";
// import {CheckOutlined} from '@ant-design/icons';
import React from "react";
import "../public/css/Login.css";
import axios from "axios";

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: null,
            selected:'+86',
            phone:null,
            user: {
                name: null,
                fullPhoneNumber: null,
                password: null,
                rePassword: null,
                checkCode: null
            },
            loginCheckUrl:`http://localhost:8000/login`,
            // loginCheckUrl:`http://192.168.1.5:8000/login/loginIn`,
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
    saveSelected = (selected) => {
        let {phone} = this.state;
        if(phone) {
            let fullPhoneNumber = `${selected}${phone}`;
            let {user} = this.state;
            user.fullPhoneNumber = fullPhoneNumber;
            this.setState({
                selected:selected,
                user: user
            });
        } else {
            this.setState({selected:selected});
        }
    }
    savePhone = (event) => {
        let phone = event.target.value;

        let {selected} = this.state;
        let fullPhoneNumber = `${selected}${phone}`;
        let {user} = this.state;
        user.fullPhoneNumber = fullPhoneNumber;
        this.verificationOfPhoneNumberValidity(phone)
        this.setState({
            user: user,
            phone: phone
        })
    }
    login = () => {
        // this.setState({
        //     isLoading: true,
        // })
        let {user} = this.state;
        let requestBody = {
            "moblieNumber": user.fullPhoneNumber,
            "password": user.password,
        };

        axios.post(this.state.loginCheckUrl, requestBody).then(
                 function (response) {

                     this.setState({
                         isLoading: false,
                     })
                     this.toUser({
                         state: 'success',
                         user:user,
                         result:(
                             <div className="Home-Login">
                                 {/*<CheckOutlined /><br />*/}
                                 登录成功
                             </div>
                         )
                     });
                 })
                 .catch(function (error) {

                     this.toUser({
                         state: 'failed',
                         error:error,
                         result:(
                             <div className="Home-Login">
                                 {/*<CheckOutlined /><br />*/}
                                 登录失败
                             </div>
                         )
                     });
                 });



        // let {loginCheckUrl} = this.state;
        //
        // let contentType ="application/x-www-form-urlencoded; charset=utf-8";
        // let ss = JSON.stringify(requestBody);
        // Ajax.call('http://localhost:80/login', requestBody,"POST");





        // user.name.value = "Tom";
        //
        // this.toUser({
        //     state: 'success',
        //     user:user,
        //     result:(
        //         <div className="Home-Login">
        //             {/*<CheckOutlined /><br />*/}
        //             登录成功
        //         </div>
        //     )
        // });

        // if (this.state.rememberMe) {
        //     localContext.put('user',user);
        // }



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
    saveName = (name) => {

    }
    /**
     * 密码框改变时自动保存到user对象中
     * @param event
     */
    savePassword = (event) => {
        let password = event.target.value;
        this.verificationOfPasswordValidity(password);
        let {user} = this.state;
        user.password = password;
        this.setState({
            user: user
        })
    }
    /**
     * 手机号码合法性校验
     * @param phoneNumber
     */
    verificationOfPhoneNumberValidity = (phoneNumber) => {
        let regExp = /^[0-9]{0,11}$/;
        let {tipMessage} = this.state;
        if (phoneNumber && !regExp.test(phoneNumber)) {
            tipMessage.phoneNumberTip = <Alert type='error' message='手机号码中不得出现除0～9的字符' />;
        } else {
            tipMessage.phoneNumberTip = null;
        }
        this.setState({
            tipMessage: tipMessage,
        })
    }
    /**
     * 密码合法性校验
     * @param password
     */
    verificationOfPasswordValidity = (password) => {
        let regExp = /^[0-9a-zA-Z]{8,20}$/;
        let {tipMessage} = this.state;
        if (password && !regExp.test(password)) {
            tipMessage.passwordTip = <Alert type='error' message='合法密码应介于8~20位之间且仅允许且必须出现出现大小写字母和数字' />;
        } else {
            tipMessage.passwordTip = null;
        }
        this.setState({
            tipMessage: tipMessage,
        })
    }
    saveLogonCredentials = (event) => {
        let logonCredentials = event.target.value;
        let {fullPhoneNumber} = this.state.user;
        if(logonCredentials) {
            if (fullPhoneNumber) {
                this.setState({
                    user: {
                        fullPhoneNumber:this.state.user.fullPhoneNumber,
                        logonCredentials:logonCredentials
                    }
                })
            } else {
                this.setState({
                    user: {
                        logonCredentials:logonCredentials
                    }
                })
            }
        }
    }
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
    renderLoginCard = () => {
        let {options} = this.state;
        let {selected} = this.state;

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
                    <div style={{width:'100%'}}>
                        <Select label={options} style={{width:'20%'}} value={selected} onChange={this.saveSelected}>
                            {options}
                        </Select>
                        <span style={{width:'80%'}}>
                            <Input id='phone' style={{ width: '80%' }} placeholder={'请输入您的手机号码'} allowClear={true} maxLength={11} onChangeCapture={this.savePhone} />
                        </span>
                    </div>
                    <br />
                    {this.state.tipMessage.phoneNumberTip}
                    <br />
                    <Tooltip placement={"right"} title={"密码的最大长度不可超过20"}>
                        <Input.Password style={ { width: '100%'} } maxLength={20}
                                        placeholder="请输入密码" allowClear={true}
                                        onChange={this.savePassword}
                        />
                    </Tooltip>
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
                        <Select label={options} style={{width:'20%'}} value={selected} onChange={this.saveSelected}>
                            {options}
                        </Select>
                        <span style={{width:'80%'}}>
                                <Input id='phone' style={{ width: '50%' }} placeholder={'请输入您的手机号码'} allowClear={true} maxLength={11} onChangeCapture={this.savePhone} />
                                <Tooltip placement={'top'} title={'获取验证码'}>
                                    <Button style={{width:'30%'}} loading={this.state.loading} type={"primary"} onClick={this.getCheckCode}><span style={{font:{size:'11px'}}}>{this.state.getCheckCodeButtonContent}</span></Button>
                                </Tooltip>
                        </span>
                    </div>
                    <br />
                    {this.state.tipMessage.phoneNumberTip}
                    <br />
                    <Tooltip placement={"right"} title={"请输入6位的短信验证码"}>
                        <Input style={ { width: '100%'} } maxLength={20}
                                        placeholder="请输入验证码" allowClear={true}
                                        onChange={this.saveLogonCredentials}
                        />
                    </Tooltip>
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

    checkPassword = () => {

    }

    renderRegisterCard = () => {
        let {options} = this.state;
        let {selected} = this.state;
        const customerRegisterCard = (

            <Card
                // style={{width:'160%'}}
                title="注册"
                extra={<Button type={"primary"} onClick={this.cardStateSwitch} >{this.state.isGoLogin ? "登陆":"注册"}</Button>}
            >
                <div>
                    <Input.Group compact>
                        <Input id='name' style={{ width: '100%' }} placeholder={'请输入用户名'} allowClear={true} maxLength={30} onChangeCapture={this.saveName} />
                        <br /><br />
                        <div style={{width:'100%'}}>
                            <Select label={options} style={{width:'20%'}} value={selected} onChange={this.saveSelected}>
                                {options}
                            </Select>

                            <span style={{width:'80%'}}>
                                <Input id='phone' style={{ width: '50%' }} placeholder={'请输入您的手机号码'} allowClear={true} maxLength={11} onChangeCapture={this.savePhone} />

                                <Tooltip placement={'top'} title={'获取验证码'}>
                                    <Button style={{width:'30%'}} type={"primary"} loading={this.state.loading} onClick={this.getCheckCode}><span style={{font:{size:'11px'}}}>{this.state.getCheckCodeButtonContent}</span></Button>
                                </Tooltip>
                            </span>
                        </div>
                        <br />
                        {this.state.tipMessage.phoneNumberTip}
                        <br />
                        <Tooltip placement={"right"} title={this.state.getCheckCodeButtonContent}>
                            <Input style={ { width: '100%'} } maxLength={20}
                                            placeholder="请输入验证码" allowClear={true}
                            />
                        </Tooltip>
                        {this.state.tipMessage.passwordTip}
                        <br /><br />
                        <Input.Password id='name' style={{ width: '100%' }} placeholder={'请输入密码'} allowClear={true} maxLength={30} onChangeCapture={this.checkPassword} />
                        <Input.Password id='name' style={{ width: '100%' }} placeholder={'请再次输入密码'} allowClear={true} maxLength={30} onChangeCapture={this.checkPassword} />
                    </Input.Group>
                    <br />
                    <Button type={"primary"} style={{width:'30%'}} onClick={this.login}>注册</Button>
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

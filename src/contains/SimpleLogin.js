import {Button, Card, Input, Select, Tooltip, Switch, Alert, notification, message, Image} from "antd/es";
// import {CheckOutlined} from '@ant-design/icons';
import React from "react";
import "../public/css/Login.css";
import axios from "axios";
import {Page} from "./Page";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {useHistory, withRouter} from "react-router";
import {Link} from "react-router-dom";
import {util} from "../common/Util";
import sessionContext from "../cache/sessionContext";
import localContext from "../cache/LocalContext";
export class SimLogin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: null,
            mobileNumber:null,
            user: {
                mobileNumber: null,
                password: null,
                rePassword: null,
                name: null,
                checkCode: null
            },
            cardList: [],
            cardContentList:[],
            key: 'loginForPassword',
            isRegisterCard:false,
            getUser: props.getUser,
            logonCredentials: null,
            loading: false,
            loadingForCheckCode: false,
            loadingForLogin: false,
            loadingForRegister: false,
            loadingCount: null,
            getCheckCodeButtonContent: '获取验证码',
            rememberMe: false,
            tipMessage: {},
            verificationOfPass: false
        };

    }


    /**
     * 登录业务逻辑
     */
    login = () => {
        // 清除用户登录凭证
        localContext.remove('user');
        this.setState({
            loadingForLogin: true,
        })
        let {user} = this.state;

        // 真实请求
        axios.post(urlsUtil.user.loginUrl, user).then(
             (response) => {
                 let data = response.data;
                 let result;
                 this.setState({
                     loadingForLogin: false,
                 })
                 if (data.code == "0") {
                     console.log("success")

                     result = {
                         stateMsg: 'loginSuccess',
                         user:data.body,
                         result:(
                             <div className="Home-Login">
                                 {/*<br />*/}
                                 登录成功
                                 {data.message}
                             </div>
                         )
                     };
                     //PageN专属,PageH需注释掉
                     result = data.body;
                     // 本地缓存Cookie
                     if (this.state.rememberMe) {
                         localContext.put('user',result);
                     } else {
                         sessionContext.put('user',result);
                     }
                     this.props.getUser(this,result);

                 }
                 else if(data.code == 1) {
                     // result = {
                     //     stateMsg: 'loginFailed',
                     //     result:(
                     //         <div className="Home-Login">
                     //             {/*<br />*/}
                     //             登录失败
                     //             {data.message}
                     //         </div>
                     //     )
                     // };
                     notification.open({
                         message: 'login tips',
                         description: data.message
                     });
                     // message.error(data.body.message);
                 }



            })
            .catch(
                (error) => {
                    this.setState({
                        loadingForLogin: false,
                    })
                    console.log(error)
                    notification.open({
                        message: 'login tips',
                        description: '网络异常'
                    })
                });

        // // 模拟数据
        // user = {
        //     name:{
        //         value: "Tom",
        //         isAllowEdit:true,
        //         chineseName: "昵称"
        //     },
        //     age:{
        //         value: "18",
        //         isAllowEdit:true,
        //         chineseName: "年龄"
        //     },
        //     gender:{
        //         value: "male",
        //         isAllowEdit:true,
        //         chineseName: "性别"
        //     },
        //     mobileNumber:{
        //         value: this.state.user.mobileNumber,
        //         isAllowEdit:false,
        //         chineseName: "手机号码"
        //     },
        //     email:{
        //         value: "cgq786153492@gmail.com",
        //         isAllowEdit:true,
        //         chineseName: "电子邮箱"
        //     },
        //     address:{
        //         value: "china",
        //         isAllowEdit:true,
        //         chineseName: "地址"
        //     },
        //     birth:{
        //         value: "1998/10/01",
        //         isAllowEdit:true,
        //         chineseName: "出生日期"
        //     },
        //     registerCode:{
        //         value: "000000",
        //         isAllowEdit:true,
        //         chineseName: "注册码"
        //     },
        //     administratorRights:{
        //         value: "1",
        //         isAllowEdit:true,
        //         chineseName: "权限"
        //     }
        // };
        // let result = {
        //     stateMsg: 'success',
        //     user:user,
        //     result:(
        //         <div className="Home-Login">
        //             {/*<br />*/}
        //             登录成功
        //         </div>
        //     )
        // };
        // this.props.getUser(this,result);
        //
        //
        // // 本地缓存Cookie
        // if (this.state.rememberMe) {
        //     localContext.put('user',user);
        // }



    }

    /**
     * 注册业务逻辑
     */
    register = () => {
        this.setState({
            loadingForRegister: true,
        })
        let {user} = this.state;
        let result = null;
        // let url = `${this.state.globalUrl}/user/create`;
        axios.post(urlsUtil.user.registerUrl, user).then(
             (response) => {
                 let data = response.data;
                this.setState({
                    loadingForRegister: false,
                })
                if(data.code == 0) {
                    result = {
                        stateMsg: 'registerSuccess',
                        result:(
                            <div className="Home-Login">
                                {/*<br />*/}
                                {data.message},1s后自动跳转
                            </div>
                        )
                    };
                    //PageN专属,PageH需注释掉
                    result = data.body;
                    sessionContext.put("user",result)
                    this.props.getUser(this,result);

                } else {
                    result = {
                        stateMsg: 'registerFailed',
                        result:(
                            <div className="Home-Login">
                                {/*<br />*/}
                                {data.message}
                            </div>
                        )
                    };
                }
                 util.tipMessage('Register Tips',data.message)

            })
            .catch(
                (error) => {
                    this.setState({
                        loadingForRegister: false,
                    })
                    console.log(error)
                    util.tipMessage('Register Tips','网络异常')
                });
    }

    /**
     * 登录标签的切换
     * @param key 标签key
     * @param type 标签类型
     */
    onTabChange = (key,type) => {
        this.setState({
            [type] : key,
            loading: false,
            loadingForCheckCode: false,
            loadingForLogin: false,
            loadingForRegister: false,
            loadingCount: null,
            getCheckCodeButtonContent: '获取验证码',
            rememberMe: false,
            tipMessage: {},
            verificationOfPass: false,
            user: {}
        });
    }

    /**
     * 获取验证码
     */
    getCheckCode = () => {
        let loadingCount = 60;
        let getCheckCodeButtonContent;

        let {user} = this.state;
        if (!user.email) {
            util.tipMessage("验证码提示","请输入邮箱地址后重试");
            return;
        }
        util.sendCheckCode(user.email);
        this.setState({loadingForCheckCode:true})
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
            this.setState({loadingForCheckCode:false,getCheckCodeButtonContent:'重新获取验证码'});
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

        let {user} = this.state;


        /*if(id === "name") {
            user.name = value;
        } else if(id === "mobileNumber") {
            user.mobileNumber = value;
        } else if(id === "checkCode") {
            user.checkCode = value;
        } else if(id === "password") {
            user.password = value;
        } else if(id === "rePassword") {
            user.rePassword = value;
        } else if(id === "email") {
            user.email = value;
        } else if(id === "registerCode") {
            user.registerCode = value;
        }*/

        switch (id) {
            case "name" : {
                user.name = value;
                this.verificationOfTextContentValidity(id,value);
                return;
            }
            case "mobileNumber" : {
                user.mobileNumber = value;
                this.verificationOfTextContentValidity(id,value);
                return;
            }
            case "checkCode" : {
                user.checkCode = value;
                this.verificationOfTextContentValidity(id,value);
                return;
            }
            case "password" : {
                user.password = value;
                this.verificationOfTextContentValidity(id,value);
                return;
            }
            case "rePassword" : {
                user.rePassword = value;
                this.verificationOfTextContentValidity(id,value);
                return;
            }
            case "email" : {
                user.email = value;
                this.verificationOfTextContentValidity(id,value);
                return;
            }
            case "registerCode" : {
                user.registerCode = value;
                return;
            }

        }
        // this.verificationOfTextContentValidity(id,value);

        // if (!!user.name) {
        //     this.verificationOfTextContentValidity("name",user.name);
        // }
        // if (!!user.mobileNumber) {
        //     this.verificationOfTextContentValidity("mobileNumber",user.mobileNumber);
        // }
        // if (!!user.checkCode) {
        //     this.verificationOfTextContentValidity("checkCode",user.checkCode);
        // }
        // if (!!user.password) {
        //     this.verificationOfTextContentValidity("password",user.password);
        // }
        // if (!!user.rePassword) {
        //     this.verificationOfTextContentValidity("rePassword",user.rePassword);
        // }

        this.buttonControl()

        let {tipMessage} = this.state;
        if (!!tipMessage.phoneNumberTip) {
            this.setState({
                verificationOfPass: false,
            })
        }

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
        let {user} = this.state;
        let {verificationOfPass} = this.state;
        let {key} = this.state;
        let {isRegisterCard} = this.state;
        if (verificationOfPass) {
            if (isRegisterCard) {
                verificationOfPass = ((user.password && user.mobileNumber && user.name && user.rePassword && user.checkCode) ? true:false);
            } else {
                if (key == "loginForPassword") {
                    verificationOfPass = ((user.password && user.mobileNumber) ? true:false);
                } else {
                    verificationOfPass = ((user.checkCode && user.mobileNumber) ? true:false);
                }
            }
        }
        this.setState({
            verificationOfPass:verificationOfPass
        })
    }

    /**
     * 文本内容合法性校验
     * @param mobileNumber
     */
    verificationOfTextContentValidity = (targetType,targetValue) => {
        // /^[1-9][0-9]{11}$/
        let phoneRegExp =   /^[0-9]{11}$/
        let checkCodeRegExp =   /^[0-9]{6}$/
        let emailRegExp =   /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
        // let phoneRegExp =   /^.*(?=.{11})[1-9].*$/;
        let passwordRegExp = /^.*(?=.{6,})(?=.*\d)((?=.*[A-Z])|(?=.*[a-z]))(?=.*[!@#$%^&*?.]).*$/;

        let {tipMessage} = this.state;
        let {user} = this.state;
        let verificationOfPass;

        if (targetType === "mobileNumber") {
            // if (targetValue.length == 11 && !phoneRegExp.test(targetValue)) {
            //     tipMessage.phoneNumberTip = <Alert type='error' message='非法的手机号码' />;
            //     verificationOfPass = false;
            // } else if (targetValue.length === 11 && this.state.isRegisterCard === true) {
            //     tipMessage.phoneNumberTip = null;
            //     let url = `${urlsUtil.user.checkMobileNumber}?mobileNumber=${targetValue}`;
            //
            //     axios.get(url).then(
            //         (response) => {
            //             let code = response.data.body.code;
            //             if (!code) {
            //                 tipMessage.phoneNumberTip = <Alert type='error' message={response.data.message} />;
            //                 verificationOfPass = false;
            //             } else {
            //                 verificationOfPass = true;
            //             }
            //         }
            //     );
            //     // let res = '该手机号码已被注册';
            //     // tipMessage.phoneNumberTip = <Alert type='error' message={res} />;
            // }
            if (targetValue === "") {
                tipMessage.phoneNumberTip = null;
                verificationOfPass = false;
            } else if (!phoneRegExp.test(targetValue)) {
                tipMessage.phoneNumberTip = <Alert type='error' message='手机号码非法' />;
                verificationOfPass = false;
            }
            else if (targetValue.length < 11) {
                tipMessage.phoneNumberTip = <Alert type='error' message='请输入有效的11位电话号码' />;
                verificationOfPass = false;
            }
            else if (targetValue.length === 11) {
                tipMessage.phoneNumberTip = null;
                verificationOfPass = true;
                if (!phoneRegExp.test(targetValue)) {
                    tipMessage.phoneNumberTip = <Alert type='error' message='手机号码非法' />;
                    verificationOfPass = false;
                }
                if (this.state.isRegisterCard === true) {
                    let url = `${urlsUtil.user.checkMobileNumber}?mobileNumber=${targetValue}`;

                    axios.get(url).then(
                        (response) => {
                            let body = response.data.body;
                            if (!body) {
                                console.log("该手机号码已被注册")
                                tipMessage.phoneNumberTip = <Alert type='error' message={"该手机号码已被注册"} />;
                                verificationOfPass = false;
                            } else {
                                verificationOfPass = true;
                            }
                            this.setState({
                                tipMessage: tipMessage,
                                verificationOfPass: verificationOfPass
                            })
                        }
                    );
                    // let res = '该手机号码已被注册';
                    // tipMessage.phoneNumberTip = <Alert type='error' message={res} />;
                }
            } else {
                tipMessage.phoneNumberTip = null;
                verificationOfPass = true;
            }
        } else if (targetType === "password" || targetType === "rePassword") {
            if (targetValue && !passwordRegExp.test(targetValue)) {
                tipMessage.passwordTip = <Alert type='error' message='合法密码应介于8~20位之间且仅允许且必须出现字母、数字和特殊字符' />;
                verificationOfPass = false;
            } else if (targetValue == "") {
                tipMessage.passwordTip = null;
                verificationOfPass = false;
            }else {
                verificationOfPass = true;
                tipMessage.passwordTip = null;
                if (user.password && user.rePassword) {
                    if (!this.rePasswordCheck(user)) {
                        tipMessage.passwordTip = <Alert type='error' message='两次输入的密码不一致' />;
                        verificationOfPass = false;
                    } else {
                        tipMessage.passwordTip = null;
                        verificationOfPass = true;
                    }
                }
            }
        } else if (targetType === "checkCode") {
            if (targetValue && !checkCodeRegExp.test(targetValue)) {
                tipMessage.checkCodeTip = <Alert type='error' message='请输入六位验证码' />;
                verificationOfPass = false;
            } else if (targetValue && checkCodeRegExp.test(targetValue)) {
                verificationOfPass = true;
                tipMessage.checkCodeTip = null;
            }
        } else if (targetType === "email") {
            if (targetValue && !emailRegExp.test(targetValue)) {
                tipMessage.emailTip = <Alert type='error' message='邮箱格式不正确' />;
                verificationOfPass = false;
            } else if (targetValue && emailRegExp.test(targetValue)) {
                verificationOfPass = true;
                tipMessage.emailTip = null;
            }
        }

        if (this.state.isRegisterCard === true) {
            if ((user.mobileNumber && user.password && user.rePassword && user.checkCode && user.name && user.email)) {
                verificationOfPass = true;
            } else {
                verificationOfPass = false;
            }
        }

        if (!!tipMessage.phoneNumberTip || !!tipMessage.passwordTip || !!tipMessage.checkCodeTip ) {
            verificationOfPass = false;
        }
        // else {
        //     verificationOfPass = false;
        // }


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
     * 登录与注册卡片的互相转换
     */
    cardStateSwitch = () => {
        let {isRegisterCard} = this.state;
        this.setState({
            isRegisterCard: !isRegisterCard,
            verificationOfPass: false,
            user: {
                // mobileNumber: null,
                // password: null,
                // rePassword: null,
                // name: null,
                // checkCode: null
            },
            tipMessage: {},
            loading: false,
            loadingForCheckCode: false,
            loadingForLogin: false,
            loadingForRegister: false,
            loadingCount: null,
            getCheckCodeButtonContent: '获取验证码',
            rememberMe: false,
        });
    }


    // componentDidMount = () => {
    //     let optionsArr = ["+86","+1"];
    //     let options = optionsArr.map( (items) => <Select.Option key={items} >{items}</Select.Option>)
    //     this.setState({
    //         options:options,
    //     });
    // }

    /**
     * 返回登录按钮
     * @returns {JSX.Element}
     */
    returnLoginButton = (verificationOfPass) => {
        return (
            <Button
                type={"primary"}
                disabled={!verificationOfPass}
                style={{width:'30%'}}
                onClick={this.login}
                loading={this.state.loadingForLogin}
            >
                登陆
                {/*<Link to={`/`} onClick={this.login} >登陆</Link>*/}
            </Button>
        );
    }

    /**
     * 记住登录状态localStorage
     */
    isRememberMe = () => {
        let {rememberMe} = this.state;
        this.setState({rememberMe: !rememberMe})
    }
    /**
     * 登录卡片组件的渲染
     * @returns {JSX.Element}
     */
    renderLoginCard = (verificationOfPass) => {

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
                {this.returnLoginButton(verificationOfPass)}
            </div>
        );
        /*
         * 验证码登陆卡片
         */
        const loginForCheckCode = (
            <div style={{width:'100%'}}>
                <Input.Group compact>
                   <div style={{width:'100%'}}>
                       邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:&nbsp;&nbsp;
                       <Tooltip placement={'top'} title={'请输入您的邮箱地址'}>
                           <Input id='email'
                                  style={{ width: '50%' }}
                                  placeholder={'请输入您的邮箱地址'}
                                  allowClear={false}
                                  maxLength={32}
                                  onChangeCapture={this.autoSave}
                           />
                       </Tooltip>
                       <Tooltip placement={'top'} title={'获取验证码'}>
                           <Button
                               style={{width:'30%'}}
                               loading={this.state.loadingForCheckCode}
                               type={"primary"}
                               onClick={this.getCheckCode}
                           >
                               <span style={{font:{size:'11px'}}}>
                                   {this.state.getCheckCodeButtonContent}
                               </span>
                           </Button>
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
                    {this.state.tipMessage.checkCodeTip}
                </Input.Group>
                <br />
                {this.returnLoginButton(verificationOfPass)}
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
                extra={
                    <Button
                        type={"primary"}
                        onClick={this.cardStateSwitch}
                    >
                        {this.state.isRegisterCard ? "登陆":"注册"}
                    </Button>
                }
            >
                {cardContentList[key]}
            </Card>
        );
        return loginCard;
    }

    /**
     * 注册卡片的渲染
     **/
    renderRegisterCard = (verificationOfPass) => {

        const customerRegisterCard = (

            <Card
                // style={{width:'160%'}}
                title="注册"
                extra={<Button type={"primary"} onClick={this.cardStateSwitch} >{this.state.isRegisterCard ? "登陆":"注册"}</Button>}
            >
                <div>
                    <Input.Group compact>
                        {/*用户名输入框*/}
                        <div style={{ width: '100%' }}>
                            <span className={"necessity"}>*</span>
                            用&nbsp;&nbsp;户&nbsp;&nbsp;名:&nbsp;&nbsp;
                            <Input id='name' style={{ width: '80%' }} placeholder={'请输入用户名'} allowClear={false} maxLength={30} onChangeCapture={this.autoSave} />
                        </div>
                        <br /><br />
                        {/*手机号码输入框*/}
                        <div style={{width:'100%'}}>
                            <span className={"necessity"}>*</span>
                            手机号码:&nbsp;&nbsp;
                            <Input id='mobileNumber'
                                   style={{ width: '80%' }}
                                   placeholder={'请输入您的手机号码'}
                                   allowClear={false}
                                   maxLength={11}
                                   onChangeCapture={this.autoSave}
                            />
                        </div>
                        <br />
                        {/*手机号码输入框提示*/}
                        {this.state.tipMessage.phoneNumberTip}
                        <br />
                        {/*邮箱输入框*/}
                        <div style={{width:'100%'}}>

                            <span style={{width:'100%'}}>
                                <span className={"necessity"}>*</span>
                                邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱:&nbsp;&nbsp;
                                <Input id='email'
                                       style={{ width: '50%' }}
                                       placeholder={'请输入您的邮箱地址'}
                                       allowClear={false}
                                       maxLength={128}
                                       onChangeCapture={this.autoSave}
                                />

                                <Tooltip placement={'top'} title={'获取验证码'}>
                                    <Button
                                        style={{width:'30%'}}
                                        type={"primary"}
                                        loading={this.state.loadingForCheckCode}
                                        onClick={this.getCheckCode}
                                    >
                                        <span
                                            style={{font:{size:'11px'}}}
                                        >
                                            {this.state.getCheckCodeButtonContent}
                                        </span>
                                    </Button>
                                </Tooltip>
                            </span>
                        </div>
                        <br />
                        {/*邮箱输入框提示*/}
                        {this.state.tipMessage.emailTip}
                        <br />
                        {/*验证码输入框*/}
                        <div style={{width: '100%'}}>
                            <span className={"necessity"}>*</span>
                            验&nbsp;&nbsp;证&nbsp;&nbsp;码:&nbsp;&nbsp;
                            <Input id='checkCode'
                                   style={ { width: '80%'} }
                                   maxLength={6}
                                   placeholder="请输入验证码"
                                   allowClear={false}
                                   onChangeCapture={this.autoSave}
                            />
                        </div>
                        {this.state.tipMessage.checkCodeTip}
                        <br /><br />
                        {/*密码输入框*/}
                        <div style={{width:'100%'}}>
                            <span className={"necessity"}>*</span>
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
                            <span className={"necessity"}>*</span>
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
                        <br />
                        <br />
                        <div style={{width:'100%'}}>
                            &nbsp;注&nbsp;&nbsp;册&nbsp;&nbsp;码:&nbsp;&nbsp;
                            <Input
                                id='registerCode'
                                style={{ width: '80%' }}
                                placeholder={'请输入注册码(选填)'}
                                allowClear={false}
                                maxLength={8}
                                onChangeCapture={this.autoSave}
                            />
                        </div>
                    </Input.Group>
                    <br />
                    <Button
                        type={"primary"}
                        disabled={!verificationOfPass}
                        style={{width:'30%'}}
                        loading={this.state.loadingForRegister}
                        onClick={this.register}
                    >
                        注册
                    </Button>
                </div>
            </Card>

        );
        return customerRegisterCard;
    }

    render() {
        let {isRegisterCard} = this.state;
        let currentCard;
        let {verificationOfPass} = this.state;

        if(!isRegisterCard) {
            let loginCard = this.renderLoginCard(verificationOfPass);
            currentCard = loginCard;
        } else {
            let customerRegisterCard = this.renderRegisterCard(verificationOfPass);
            currentCard = customerRegisterCard;
        }
        return (
            <div className="Home-Login" style={{ width: '100%' }}>
                {currentCard}
            </div>
        );
    }
}
export const SimpleLogin = withRouter(SimLogin)

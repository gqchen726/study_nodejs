import React from 'react'
import Card from "antd/es/card";
import {MyDescriptions} from "../component/MyDescriptions";
import {Button} from "antd/es";
import {withRouter} from "react-router";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {util} from "../common/Util";
import sessionContext from "../cache/sessionContext";
import localContext from "../cache/localContext";
import {EditOutlined, SaveOutlined} from "@ant-design/icons"

export class PersonalCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            isLoading: false,
            user: props.user,
            fileList: []
        }
    }



    getFileList = (fileList) => {
        this.setState({
            fileList:fileList
        })
    }

    onClickHandler = () => {
        let {isEditMode, user, fileList} = this.state;

        if (isEditMode) {
            if (!user) {
                return ;
            }
            this.setState({
                isLoading: true
            })
            if (fileList.length > 0) {
                user.avatar = fileList[0].response.body;
            }
            axios.post(urlsUtil.user.updatePersonInfo,user).then((response) => {
                let responseBody = response.data;
                this.changeEditMode();
                if (!responseBody.code) {
                    this.setState({
                        user : responseBody.body,
                    })
                    this.props.getUser(this,responseBody.body);
                    sessionContext.put('user',responseBody.body);
                    if (localContext.has("user")) localContext.put('user',responseBody.body);
                } else {
                    util.tipMessage('save info tips',responseBody.message)
                }
            }).catch((error) => {
                util.tipMessage('save info tips',error.toString())
            })
            this.setState({
                isLoading: false
            })
        } else {
            this.changeEditMode();
        }
    }



    changeEditMode = () => {
        this.setState({
            isEditMode: !this.state.isEditMode,
        })
    }

    saveNewDescriptered = (newDescriptered) => {
        this.setState({
            newDescriptered : newDescriptered
        })
    }

    renderDescs = (user,isEditMode,isLoading) => {
        // let columns = ["name","age","gender","birth","mobileNumber","email","address","registerCode"];
        if (!user) {
            return null;
        }


        return (
            <div className='personalCenter'>
                {/*个人信息展示*/}
                <Card
                    title={user.name}
                    extra={
                        (!user)?
                            null:<Button icon={isEditMode? <SaveOutlined />:<EditOutlined />} loading={isLoading} type={"primary"} onClick={this.onClickHandler} >{isEditMode ? "保存":"编辑 "}</Button>
                    }
                >
                    <MyDescriptions
                        title={"个人中心"}
                        layout={"horizontal"}
                        bordered={false}
                        style={{
                            labelStyle: {width:"8%"},
                            columnStyle: { xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }
                        }}
                        // columns={columns}
                        descriptered={user}
                        isEditMode={this.state.isEditMode}
                        saveNewDescriptered={this.saveNewDescriptered}
                        getFileList={this.getFileList}
                    />
                </Card>
            </div>
        );


    }

    render() {
        let {user} = this.state;
        let {isEditMode} = this.state;
        let {isLoading} = this.state;
        return this.renderDescs(user,isEditMode,isLoading);
    }
}
export const PersonalCenterW = withRouter(PersonalCenter);
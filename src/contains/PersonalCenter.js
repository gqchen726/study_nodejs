import React from 'react'
// import '../public/css/DataShowGrid.css'
import {Input} from "antd";
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";
import Descriptions from "antd/es/descriptions";
import Badge from "antd/es/badge";
import {MyDescriptions} from "../component/MyDescriptions";
import {Button, notification} from "antd/es";
import {CarouselMap} from "./CarouselMap";
import {withRouter} from "react-router";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {util} from "../common/Util";

class PersonalCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
            isLoading: false,
            user: props.user
        }
    }


    onClickHandler = () => {
        let {isEditMode} = this.state;
        let {newDescriptered} = this.state;

        if (isEditMode) {
            if (!newDescriptered) {
                return ;
            }
            this.setState({
                isLoading: true
            })
            axios.post(urlsUtil.user.updatePersonInfo,newDescriptered).then((response) => {
                let responseBody = response.data;
                console.log(response)

                this.changeEditMode();
                if (!responseBody.code) {
                    this.setState({
                        user : responseBody.body,
                    })
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
                {/*数据详情信息展示*/}
                <Card
                    title={user.name}
                    extra={
                        (!user)?
                            null:<Button loading={isLoading} type={"primary"} onClick={this.onClickHandler} >{isEditMode ? "保存":"编辑 "}</Button>
                    }
                >
                    <MyDescriptions
                        title={"Data Info"}
                        layout={"horizontal"}
                        bordered={true}
                        // columns={columns}
                        descriptered={user}
                        isEditMode={this.state.isEditMode}
                        saveNewDescriptered={this.saveNewDescriptered}
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
        // let {user} = this.props;
        // let columns = ["name","age","gender","birth","mobileNumber","email","address","registerCode"];
        // return (
        //     <div className='personalCenter'>
        //         {/*数据详情信息展示*/}
        //         <Card
        //             title={user.name}
        //             extra={
        //                 (!user || !user.administratorRights)?
        //                     null:<Button type={"primary"} onClick={this.changeEditMode} >编辑</Button>
        //             }
        //         >
        //             {/*跑马灯*/}
        //             <CarouselMap autoPlay={true} />
        //             <MyDescriptions
        //                 title={"Data Info"}
        //                 layout={"horizontal"}
        //                 bordered={true}
        //                 columns={columns}
        //                 descriptered={user}
        //                 isAdminSpecific={true}
        //                 isEditMode={this.state.isEditMode}
        //             />
        //         </Card>
        //     </div>
        // );
    }
}
export const PersonalCenterW = withRouter(PersonalCenter);
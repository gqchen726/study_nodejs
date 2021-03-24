import React from 'react'
// import '../public/css/DataShowGrid.css'
import {Input} from "antd";
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";
import Descriptions from "antd/es/descriptions";
import Badge from "antd/es/badge";
import {MyDescriptions} from "../component/MyDescriptions";
import {Button} from "antd/es";
import {CarouselMap} from "./CarouselMap";
import {withRouter} from "react-router";


class PersonalCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
        }
    }



    changeEditMode = () => {
        this.setState({
            isEditMode: !this.state.isEditMode,
        })
    }

    renderDescs = (user) => {
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
                            null:<Button type={"primary"} onClick={this.changeEditMode} >编辑</Button>
                    }
                >
                    <MyDescriptions
                        title={"Data Info"}
                        layout={"horizontal"}
                        bordered={true}
                        // columns={columns}
                        descriptered={user}
                        isEditMode={this.state.isEditMode}
                    />
                </Card>
            </div>
        );


    }

    render() {
        let {user} = this.props;
        return this.renderDescs(user);
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
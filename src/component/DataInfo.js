import React from 'react'
import {CarouselMap} from "../contains/CarouselMap";
import {Card} from "antd";
import {Button} from "antd/es";
import PropTypes from 'prop-types'
import {MyDescriptions} from "./MyDescriptions";

const localContext = require('../cache/LocalContext');
export class DataInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
        }
    }

    renderDataDetail = () => {

    }

    changeEditMode = () => {
        this.setState({
            isEditMode:!this.state.isEditMode,
        })
    }


    render() {
        let {data} = this.props;
        let {user} = this.props;
        let columns = ["name","age","gender","birth","mobileNumber","email","address","registerCode"];
        return (
            <div className='dataInfo'>
                {/*数据详情信息展示*/}
                <Card
                    title={data.name.value}
                    extra={
                        (!user || !user.administratorRights)?
                            null:<Button type={"primary"} onClick={this.changeEditMode} >编辑</Button>
                    }
                >
                    {/*跑马灯*/}
                    <CarouselMap autoPlay={true} />
                    <MyDescriptions
                        title={"Data Info"}
                        layout={"horizontal"}
                        bordered={true}
                        columns={columns}
                        descriptered={user}
                        isAdminSpecific={true}
                        isEditMode={this.state.isEditMode}
                    />
                </Card>
            </div>
        );
    }
}
DataInfo.defaultTypes = {
    data:{
        name: "数据展示样板"
    }
}
DataInfo.propTypes = {
    user:PropTypes.object,
    data:PropTypes.object,
}

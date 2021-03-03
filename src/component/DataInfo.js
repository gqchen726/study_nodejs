import React from 'react'
import {CarouselMap} from "../contains/CarouselMap";
import {Card} from "antd";
import {Button} from "antd/es";
import PropTypes from 'prop-types'
import {MyDescriptions} from "./MyDescriptions";
import {withRouter} from "react-router";


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

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };



    render() {
        let {datas} = this.props;
        console.log(this)
        let {user} = this.props;
        console.log(this.props.match)
        let {key} = this.props.match.params
        if (!datas) {
            return null;
        }
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
                        descriptered={datas[key]}
                        isAdminSpecific={true}
                        isEditMode={this.state.isEditMode}
                    />
                </Card>
            </div>
        );
    }
}
export const DataInfoW =  withRouter(DataInfo);
DataInfo.defaultTypes = {
    data:{
        name: "数据展示样板"
    }
}
DataInfo.propTypes = {
    user:PropTypes.object,
    data:PropTypes.any,
}

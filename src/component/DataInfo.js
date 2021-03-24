import React from 'react'
import {CarouselMap} from "../contains/CarouselMap";
import {Card} from "antd";
import {Button} from "antd/es";
import PropTypes from 'prop-types'
import {MyDescriptions} from "./MyDescriptions";
import {
    Link,
    withRouter
} from "react-router-dom";


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

    returnMode = (user,isAdminSpecific) => {
        if (!isAdminSpecific) {
            return (!user)?
                null:<Button type={"primary"} onClick={this.changeEditMode} >编辑</Button>
        } else if (isAdminSpecific) {
            return (!user || !user.admin)?
                null:<Button type={"primary"} onClick={this.changeEditMode} >编辑</Button>
        }
    }


    render() {

        let {datas} = this.props;
        let {key} = this.props.match.params
        let data = datas[key];
        let {user} = this.props;
        let {isAdminSpecific} = this.props;

        if (!data) {
            return null;
        }
        // let columns = ["name","age","gender","birth","mobileNumber","email","address","registerCode"];
        return (
            <div className='dataInfo'>
                {/*数据详情信息展示面板*/}
                <Card
                    title={data.name}
                    extra={
                        this.returnMode(user,isAdminSpecific)
                    }
                >
                    {/*跑马灯*/}
                    <CarouselMap autoPlay={true} />
                    <MyDescriptions
                        title={"产品信息"}
                        layout={"horizontal"}
                        bordered={true}
                        descriptered={data}
                        isAdminSpecific={true}
                        isEditMode={this.state.isEditMode}
                    />
                </Card>
                {/*用户操作面板*/}
                <Card>
                    <Button
                        style={{width:'10%'}}
                        onClick={this.search}
                    >
                        <span
                            style={{font:{size:'11px'}}}
                        >
                            <Link to={`/result${404}`} >收藏</Link>
                        </span>
                    </Button>
                    <Button
                        style={{width:'10%'}}
                        onClick={this.search}
                    >
                        <span
                            style={{font:{size:'11px'}}}
                        >
                            <Link to={`/orderGenerate/${key}`} >购买</Link>
                        </span>
                    </Button>
                </Card>
            </div>
        );
    }
}
export const DataInfoW =  withRouter(DataInfo);

DataInfo.propTypes = {
    user:PropTypes.object,
    data:PropTypes.any,
}

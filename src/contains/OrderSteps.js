import { Steps } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import React from "react";
import Card from "antd/es/card";
import Button from "antd/es/button";
import {UserStateBar} from "./UserStateBar";
import {MyDescriptions} from "../component/MyDescriptions";
import {withRouter} from "react-router";
import Space from "antd/es/space";
import {MyResult} from "../component/MyResult";
import {Link} from "react-router-dom";
import Input from "antd/es/input";

const { Step } = Steps;

export class OrderSteps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: {
                GenericOrderStatus: "process",
                PayStatus: "wait",
                Done: "wait"
            },
            productNum: 1,
        }
    }

    previous = () => {
        let {status} = this.state;
        if ("process" == status.GenericOrderStatus) {
            return ;
        }
        if ("process" == status.Done) {
            return ;
        }
        if ("process" == status.PayStatus) {
            status.GenericOrderStatus = "process";
            status.PayStatus = "wait";
            this.setState({
                status: status
            })
        }
    }
    next = () => {
        let {status} = this.state;
        if ("process" == status.GenericOrderStatus) {
            //在此向后端发送请求,生成订单，返回订单号，设置state
            status.GenericOrderStatus = "finish";
            status.PayStatus = "process";
            this.setState({
                status: status,
                orderCode: "TL000000001111",
            })
            return ;
        }
        if ("process" == status.Done) {
            return ;
        }
        if ("process" == status.PayStatus) {

            status.PayStatus = "finish";
            status.Done = "finish";
            this.setState({
                status: status
            })
        }
    }
    reduce = () => {
        let {productNum} = this.state;
        productNum--;
        this.setState({
            productNum: productNum,
        })
    }
    plus = () => {
        //在增加之前做验证，请求后端，期望返回余票数量，设置增加的最大值
        let {productNum} = this.state;
        productNum++;
        this.setState({
            productNum: productNum,
        })
    }

    returnOrderCard = (productNum) => {
        let {status} = this.state;
        let {datas} = this.props;
        let {key} = this.props.match.params
        let data = datas[key];
        // if (!data.map) {
        //     return ;
        // }
        console.log(data)
        if (status.GenericOrderStatus == "process") {
            return (
                <Space direction={"vertical"} size={"small"} align={"center"}>
                    <MyDescriptions
                        title={"Data Info"}
                        layout={"horizontal"}
                        bordered={true}
                        // columns={columns}
                        descriptered={data}
                        isAdminSpecific={true}
                        isEditMode={this.state.isEditMode}
                    />
                    <br />

                    <Space direction={"horizontal"} size={"small"} align={"center"}>
                        <Button
                            style={{width:'3%'}}
                            onClick={this.reduce}
                        >
                            -
                        </Button>
                        {productNum}
                        <Button
                            style={{width:'3%'}}
                            onClick={this.plus}
                        >
                            +
                        </Button>
                    </Space>
                </Space>
            );
        }
        if (status.GenericOrderStatus == "process") {
            let {orderCode} = this.state;
            return (
                <Space>
                    {
                        orderCode
                    }
                    <MyDescriptions descriptered={data} />
                </Space>
            );
        }
        if (status.Done == "finish") {
            return (
                <MyResult
                    status="success"
                    title="订单已完成"
                    extra={
                        [
                            <Button
                                type={"primary"}
                                style={{width:'10%'}}
                                key={"goHome"}
                            >
                                <Link to={'/home'} >
                                    返回首页
                                </Link>
                            </Button>,
                            <Button
                                type={"primary"}
                                style={{width:'10%'}}
                                key={"goOrderList"}
                            >
                                <Link to={`/result${404}`} >
                                    查看订单详情
                                </Link>
                            </Button>
                        ]
                    }
                />
            );
        }
    }
    render() {
        let {status} = this.state;
        let {productNum} = this.state;
        return (
            <Card>
                <Steps>
                    <Step status={status.GenericOrderStatus}
                          title="GenericOrder"
                          icon={status.GenericOrderStatus == "process" ? <LoadingOutlined /> :<SolutionOutlined />}
                    />
                    <Step status={status.PayStatus}
                          title="Pay"
                          icon={status.PayStatus == "process" ? <LoadingOutlined /> :<UserOutlined />}
                    />
                    <Step status={status.Done}
                          title="Done"
                          icon={<SmileOutlined />}
                    />
                </Steps>
                {/*1.订单生成卡片*/}
                {/*2.支付卡片*/}
                {/*3.订单完成卡片*/}
                {
                    this.returnOrderCard(productNum)
                }
                <br />
                <Button
                    type={"primary"}
                    style={{width:'10%'}}
                    onClick={this.previous}
                >
                    上一步
                </Button>
                &nbsp;&nbsp;
                <Button
                    type={"primary"}
                    style={{width:'10%'}}
                    onClick={this.next}
                >
                    下一步
                </Button>
            </Card>
        );
    }
}
export const OrderStepsW = withRouter(OrderSteps)
OrderSteps.defaultProps = {
    status: {
        GenericOrderStatus: "process",
        PayStatus: "wait",
        Done: "wait"
    }
}
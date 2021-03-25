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
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import "./../public/css/OrderStep.css"
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

    componentWillMount() {
        this.state = {
            status: {
                GenericOrderStatus: "process",
                PayStatus: "wait",
                Done: "wait"
            },
            productNum: 1,
            datas: this.props.datas
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
        let {datas} = this.props;
        let {user} = this.props;
        let {key} = this.props.match.params
        let data = datas[key];
        let {productNum} = this.state;
        if ("process" == status.GenericOrderStatus) {
            //在此向后端发送请求,生成订单，返回订单号，设置state
            let orderGenerate = {
                // order : {
                //     productCode: data.productCode,
                //     productNum: productNum,
                // },
                productCode: data.productCode,
                productNum: productNum,
                mobileNumber: user.mobileNumber,
            }
            axios.post(urlsUtil.order.genericOrderUrl,orderGenerate).then((response) => {
                let orderGenerate = response.data.body;

                setTimeout(() => {
                    this.setState({
                        orderGenerate: orderGenerate,
                    })
                },0)
            });

            // // 模拟订单数据
            // let order = {
            //     order: {
            //         orderCode: "TL10000001",
            //         status: "未支付",
            //         totalPrice: data.price * productNum,
            //         generationYTime: new Date().toString(),
            //         User_id: user.mobileNumber,
            //         startTime: new Date().toString(),
            //         endTime: new Date(7).toString(),
            //         productId: data.id
            //     },
            //     product: data,
            // }

            status.GenericOrderStatus = "finish";
            status.PayStatus = "process";
            this.setState({
                status: status,
                // orderGenerate: order,
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
        if(productNum > 0) {
            productNum--
        }
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
        let {datas} = this.state;
        let {key} = this.props.match.params
        let data = datas[key];
        let {orderGenerate} = this.state;
        console.log(this);
        // if (!data.map) {
        //     return ;
        // }



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
        if (status.PayStatus == "process") {

            if (!orderGenerate) return <div>data is null</div>

            return (
                // <Space>
                //     {
                //         orderGenerate.order.orderCode
                //     }
                //     <br />
                //     <MyDescriptions descriptered={orderGenerate.order} title={"订单信息"} bordered={true} layout={"horizontal"} />
                //     <br />
                //     <MyDescriptions descriptered={orderGenerate.product} title={"产品信息"} bordered={true} layout={"vertical"} />
                // </Space>
                <div>
                    <br />
                    <div className={"OrderCode"}>
                        {
                            orderGenerate.order.orderId
                            // "TL1111111111111"
                        }
                    </div>
                    <div className={"OrderDetail"}>
                        <br />
                        <MyDescriptions descriptered={orderGenerate.order} title={"订单信息"} bordered={true} layout={"horizontal"} />
                        <br />
                        <MyDescriptions descriptered={orderGenerate.product} title={"产品信息"} bordered={true} layout={"vertical"} />
                    </div>
                </div>
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
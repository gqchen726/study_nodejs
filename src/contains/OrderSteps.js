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
import DatePicker from "antd/es/date-picker";
const { Step } = Steps;
import moment from 'moment';
import {MyDatePicker} from "../component/MyDatePicker";
import {selectOneProduct} from "../utils/SelectAnProductFromCode";
import {notification} from "antd/es";
import {util} from "../common/Util";

export class OrderSteps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: {
                GenericOrderStatus: "process",
                ConfirmStatus: "wait",
                Done: "wait"
            },
            productNum: 1,
            orderGenerate: {},
        }
    }

    componentWillMount() {
        console.log(this.props.match.params);
        if (!!this.props.match.params.key) {
            let productCode = this.props.match.params.key
            selectOneProduct(productCode).then(
                (response) => {
                    let product = response.data.body;
                    this.setState({
                        product: product
                    })
                }
            );
        } else {
            let {orderId} = this.props.match.params;
            console.log(orderId)
            axios.get(`${urlsUtil.order.getOrderUrl}?orderId=${orderId}`).then((response) => {
                let {data} = response;
                if (data.code == 0) {
                    let order = data.body;
                    this.setState({
                        orderGenerate:order,
                        status: {
                            GenericOrderStatus: "done",
                            ConfirmStatus: "done",
                            Done: "finish"
                        },
                    })
                } else {
                    util.tipMessage('orderDetail tips',data.message)
                }
            })
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
        if ("process" == status.ConfirmStatus) {
            status.GenericOrderStatus = "process";
            status.ConfirmStatus = "wait";
            this.setState({
                status: status
            })
        }
    }


    next = () => {
        let {status, productNum, orderGenerate} = this.state;
        let {datas, user} = this.props;
        // let {key} = this.props.match.params
        // let data = datas[key];
        let data = this.state.product;
        if ("process" == status.GenericOrderStatus) {
            //在此向后端发送请求,生成订单，返回订单号，设置state
            orderGenerate.productCode = data.productCode;
            orderGenerate.productNum = productNum;
            orderGenerate.mobileNumber = user.mobileNumber;
            if (!orderGenerate.date) {
                util.tipMessage("日期必填提示","请确认预约时间")
                return ;
            }
            axios.post(urlsUtil.order.genericOrderUrl,orderGenerate).then((response) => {
                if (response.data.code == 0) {
                    let orderGenerate = response.data.body;
                    status.GenericOrderStatus = "finish";
                    status.ConfirmStatus = "process";
                    setTimeout(() => {
                        this.setState({
                            orderGenerate: orderGenerate,
                            status: status,
                        })
                    },0)
                } else {
                    util.tipMessage('order tips',data.message)
                }
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

           /* status.GenericOrderStatus = "finish";
            status.ConfirmStatus = "process";
            this.setState({
                status: status,
                // orderGenerate: order,
            })
            return ;*/
        }
        if ("process" == status.Done) {
            return ;
        }
        if ("process" == status.ConfirmStatus) {

            status.ConfirmStatus = "finish";
            status.Done = "finish";
            axios.get(`${urlsUtil.order.updateOrderStatus}?mobileNumber=${this.props.user.mobileNumber}&orderId=${orderGenerate.order.orderId}&status=paid`)
                .then((response) => {
                    let {code} = response.data;
                    if (code === "0") {
                        this.setState({
                            status: status,
                            orderGenerate: orderGenerate
                        })
                    } else {
                        util.tipMessage('paid tips',data.message)
                    }
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
        let {productNum} = this.state;
        productNum++;
        this.setState({
            productNum: productNum,
        })
    }
    saveReservationDate = (date, dateString) => {
        this.state.orderGenerate.date = dateString;
    }

    returnOrderCard = (productNum, product, status, orderGenerate) => {
        let data = product;
        // let {orderGenerate} = this.state;
        console.log(orderGenerate)
        console.log(this);
        if (!data) {
            return ;
        }
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
                    {/*<span>预约日期:</span>*/}
                    {/*<DatePicker*/}
                    {/*    format="YYYY-MM-DD HH:mm:ss"*/}
                    {/*    disabledDate={disabledDate}*/}
                    {/*    disabledTime={disabledDateTime}*/}
                    {/*    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}*/}
                    {/*/>*/}
                    <MyDatePicker title={"预约日期:"} onClickHandler={this.saveReservationDate} fromToday={true} />
                    <br />
                    <Space direction={"horizontal"} size={"small"} align={"center"}>
                        购买数量:
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
        if (status.ConfirmStatus == "process") {

            if (!orderGenerate) return <div>data is null</div>

            return (
                <div>
                    <br />
                    <div className={"OrderCode"}>
                        {
                            orderGenerate.order.orderId ? orderGenerate.order.orderId : null
                        }
                    </div>
                    <div className={"OrderDetail"}>
                        <br />
                        <MyDescriptions
                            descriptered={orderGenerate.order}
                            title={"订单信息"}
                            bordered={true}
                            layout={"horizontal"}
                        />
                        <br />
                        <MyDescriptions
                            descriptered={orderGenerate.product}
                            title={"景点信息"}
                            bordered={true}
                            layout={"horizontal"}
                        />
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
                                <Link to={`/orderDetail/${orderGenerate.order.orderId}`} >
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
        let {status, productNum, product, orderGenerate} = this.state;
        return (
            <Card>
                <Steps>
                    <Step status={status.GenericOrderStatus}
                          title="预约参数"
                          icon={status.GenericOrderStatus == "process" ? <LoadingOutlined /> :<SolutionOutlined />}
                    />
                    <Step status={status.ConfirmStatus}
                          title="订单确认"
                          icon={status.ConfirmStatus == "process" ? <LoadingOutlined /> :<UserOutlined />}
                    />
                    <Step status={status.Done}
                          title="预约完成"
                          icon={<SmileOutlined />}
                    />
                </Steps>
                {/*1.订单生成卡片*/}
                {/*2.支付卡片*/}
                {/*3.订单完成卡片*/}
                {
                    this.returnOrderCard(productNum, product, status, orderGenerate)
                }
                {
                    status.Done === "finish" ? null: (
                        <div>
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
                        </div>
                    )
                }
            </Card>
        );
    }
}
export const OrderStepsW = withRouter(OrderSteps)
OrderSteps.defaultProps = {
    status: {
        GenericOrderStatus: "process",
        ConfirmStatus: "wait",
        Done: "wait"
    }
}
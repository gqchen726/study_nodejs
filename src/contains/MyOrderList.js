import React from 'react';
import Table from "antd/es/table";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {Button} from "antd";
import {Link} from "react-router-dom";
import {Anchor, Box, Tip} from "grommet";
import {Close, Send, User} from "grommet-icons";
import {MyTip} from "../component/MyTip";
import {util} from "../common/Util";
import {MyTooltip} from "../component/MyTooltip";
export default class MyOrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderActions = (status,orderId) => {
        let actions = [];
        //订单状态为 generated 时，可以取消订单、订单支付|取消和提交
        switch (status) {
            case "generated": {
                actions.push(<Button icon={<Close/>} onClick={() => {
                    axios.get(`${urlsUtil.order.updateOrderStatus}?orderId=${orderId}&status=deleted`).then(() => {this.getOrderList()})
                }} primary={true}/>)
                actions.push(<Button icon={<Send/>} onClick={() => {
                    axios.get(`${urlsUtil.order.updateOrderStatus}?orderId=${orderId}&status=paid`).then(() => {this.getOrderList()})
                }}/>)
                break;
            }
            case "paid": {
                actions.push(<Button icon={<Close/>} onClick={() => {
                    axios.get(`${urlsUtil.order.updateOrderStatus}?orderId=${orderId}&status=deleted`).then(() => {this.getOrderList()})
                }} primary={true}/>)
                break;
            }
        }

        //订单状态为 generated 时，可以取消
        //订单状态为 cancel 时，可以删除
        //订单状态为 approval 时，仅可支付操作
        //订单状态为 reject 时，仅可删除操作
        switch (status) {
            case "generated": {
                actions.push(<MyTooltip title={"删除该订单"} component={<Button icon={<Close/>} onClick={() => {
                    axios.get(`${urlsUtil.order.updateOrderStatus}?orderId=${orderId}&status=cancel`).then((res) => {this.getOrderList();util.tipMessage("订单状态提示",res.data.message)})
                }} primary={true}/>} />)
                actions.push(<MyTooltip title={"提交审核"} component={<Button icon={<Send/>} onClick={() => {
                    axios.get(`${urlsUtil.order.updateOrderStatus}?orderId=${orderId}&status=submission`).then((res) => {this.getOrderList();util.tipMessage("订单状态提示",res.data.message)})
                }}/>} />)
                break;
            }
            case "cancel": {
                actions.push(<MyTooltip title={"删除该订单"} component={<Button icon={<Close/>} onClick={() => {
                    axios.get(`${urlsUtil.order.updateOrderStatus}?orderId=${orderId}&status=deleted`).then((res) => {this.getOrderList();util.tipMessage("订单状态提示",res.data.message)})
                }} primary={true}/>} />)
                break;
            }

        }

        return actions;
    }

    componentWillMount() {
        // 获取订单列表
        this.getOrderList();
    }

    getOrderList = () => {
        axios.get(`${urlsUtil.order.searchOrderUrl}?mobileNumber=${this.props.user.mobileNumber}`).then((response) => {
            let body = response.data.body;
            let orders;
            if (Array.isArray(body)) {
                orders = body.map((sumOrder) => {
                    let {order} = sumOrder;
                    let {orderId} = order;
                    let orderIdLink = <Anchor label={<span style={{fontSize:"18px",fontWeight:600}}>{orderId}</span>} href={`/#/orderDetail/${orderId}`} />;
                    // let orderIdLink = <Anchor label={<span style={{fontSize:"18px",fontWeight:600}}>{orderId}</span>} href={`/#/orderInfo/${orderId}`} />;
                    order.orderId = orderIdLink;
                    // order.actions = <Link to={`/orderDetail/TL000000${i}`}>view</Link>;
                    order.actions = (
                        <Box direction="row" key={orderId}>
                            {/*{MyTip("移除该订单",<Button icon={<Close />} onClick={() => {axios.get(`${urlsUtil.order.updateOrderStatus}?orderId=${orderId}&status=deleted`)}} primary={true} />)}*/}
                            {this.renderActions(order.status,orderId)}
                        </Box>
                    );
                    return order

                })
            }
            let filterOrders = orders.filter((order) => {
                return order.status != "deleted"
            })
            setTimeout(() => {
                this.setState({
                    orders:filterOrders
                })
            },0)
        }).catch((error) => {
            // 获取订单失败

        })
    }

    getColumns = () => {
        return util.getTableColumns();
    }

    render() {
        // let {data} = this.state;
        let data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                key: `order${i}`,
                id: `TL000000${i}`,
                name: `Edward King ${i}`,
                price: 32,
                address: `London, Park Lane no. ${i}`,
                status: `${(i%2 == 0)?'已支付':'未支付'}`,
                action: <Link to={`/orderDetail/TL000000${i}`}>view</Link>
            });
        }

        let {orders} = this.state;

        return (
            // <Table
            //     columns={this.getColumns(data)}
            //     dataSource={data}
            //     pagination={{ pageSize: 25 }}
            //     // scroll={{ y: 240 }}
            // />
            <Table
                columns={this.getColumns()}
                dataSource={orders}
                pagination={{ pageSize: 25 }}
                // scroll={{ y: 240 }}
            />
        );
    }

}
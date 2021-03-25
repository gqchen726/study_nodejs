import React from 'react';
import Table from "antd/es/table";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {Button} from "antd";
import {Link} from "react-router-dom";
export default class MyOrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        // 获取订单列表
        axios.get(`${urlsUtil.order.searchOrderUrl}?mobileNumber=${this.props.user.mobileNumber}`).then((response) => {
            let body = response.data.body;
            let orders;
            if (Array.isArray(body)) {
                orders = body.map((order) => {
                    // order.action = <Link to={`/orderDetail/TL000000${i}`}>view</Link>;
                    return order.order
                })
            }
            console.log(orders)
            this.setState({
                orders:orders
            })
        }).catch((error) => {
            // 获取订单失败

        })
    }

    getColumns = (datas) => {
        let columns = [];
        let data;
        if (Array.isArray(datas) && datas.length > 0) {
            data = datas[0];
        } else {
            return ;
        }
        // console.log(data)
        data.id? columns.push({
            title: '订单号',
            dataIndex: 'id',
            key: 'id',
        }):null;
        data.orderId? columns.push({
            title: '订单号',
            dataIndex: 'orderId',
            key: 'orderId',
        }):null;
        data.name? columns.push({
            title: '名字',
            dataIndex: 'name',
            key: 'name',
        }):null;
        data.age? columns.push({
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        }):null;
        data.price? columns.push({
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        }):null;
        data.totalPrice? columns.push({
            title: '总价',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        }):null;
        data.address? columns.push({
            title: '住址',
            dataIndex: 'address',
            key: 'address',
        }):null;
        data.status? columns.push({
            title: '订单状态',
            dataIndex: 'status',
            key: 'status',
        }):null;
        data.action? columns.push({
            title: '操作',
            dataIndex: 'action',
            key: 'action',
        }):null;
        data.generationDate? columns.push({
            title: '订单生成日期',
            dataIndex: 'generationDate',
            key: 'generationDate',
        }):null;

        console.log(columns)
        return columns;
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
                columns={this.getColumns(orders)}
                dataSource={orders}
                pagination={{ pageSize: 25 }}
                // scroll={{ y: 240 }}
            />
        );
    }

}
import React from 'react';
import Table from "antd/es/table";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {Button} from "antd";
import {Link} from "react-router-dom";
export default class MyCollections extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let {user} = this.state;
        // 获取收藏列表
        axios.get(`${urlsUtil.user.getCollections}?userId=${user}`).then((response) => {
            let collections = response.data.body.collections;
            this.setState({
                collections:collections
            })
        }).catch((error) => {
            // 获取收藏失败

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
        console.log(data)
        data.id? columns.push({
            title: '订单号',
            dataIndex: 'id',
            key: 'id',
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

        return columns;
    }

    render() {
        // let {data} = this.state;
        let data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                key: `order${i}`,
                name: `Edward King ${i}`,
                price: 32,
                address: `London, Park Lane no. ${i}`,
                action: <Link to={`/orderDetail/TL000000${i}`}>view</Link>
            });
        }

        return (
            <Table
                columns={this.getColumns(data)}
                dataSource={data}
                pagination={{ pageSize: 25 }}
                // scroll={{ y: 240 }}
            />
        );
    }

}
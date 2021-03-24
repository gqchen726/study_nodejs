import React from 'react'
import Descriptions from "antd/es/descriptions";
import PropTypes from 'prop-types'
import {Input} from "antd";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {MyDescriptions} from "./MyDescriptions";
import {Link} from "react-router-dom";
import Space from "antd/es/space";
import Button from "antd/es/button";

export class OrderDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // 以订单号向后端获取订单
        let {id} = this.props;

        axios.get(`${urlsUtil.order.searchOrderUrl}?id=${id}`).then((response) => {
            let order = response.data.body.order;
            this.setState({
                order:order,
            })
        }).catch(() => {

        })

        // 模拟数据
        let i = 2;
        let order = {
            key: `order${i}`,
            id: `TL000000${i}`,
            name: `Edward King ${i}`,
            price: 32,
            address: `London, Park Lane no. ${i}`,
            status: `${i%2 == 0?'已支付':'未支付'}`,
            action: <Link to={`/orderDetail/TL000000${i}`}>view</Link>
        };
        this.setState({
            order:order,
        })
    }

    renderActions = (status) => {
        if (status == "已支付") {
            return (
                <Space>
                    <Button>打印电子发票</Button>
                </Space>
            )
        } else {
            return (
                <Space>
                    <Button>去支付</Button>
                    <Button>删除该订单</Button>
                </Space>
            )
        }
    }

    render() {
        let {order} = this.state;
        let {status} = order;
        return (
            <div>
                {/*// 订单详情*/}
                {/*// 以Description展示基本信息*/}
                <MyDescriptions
                    bordered={false}
                    isAdminSpecific={true}
                    title={"订单详情"}
                    descriptered={order}
                />
                {/*// 订单操作*/}
                {/*// 判断订单的支付状态，*/}
                {/*//  如果订单处于未支付状态，显示支付和删除订单按钮；*/}
                {/*//  如果订单处于已支付状态，显示打印电子发票按钮；*/}
                {this.renderActions(status)}
            </div>
        );
    }
}
OrderDetail.propTypes = {

}
OrderDetail.defaultProps = {

}
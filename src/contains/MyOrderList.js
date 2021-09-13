import React from 'react';
import Table from "antd/es/table";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {Button} from "antd";
import {Link} from "react-router-dom";
import {Anchor, Box} from "grommet";
import {Close, Send} from "grommet-icons";
import {util} from "../common/Util";
import {MyTooltip} from "../component/MyTooltip";
import Input from "antd/es/input";
import Space from "antd/es/space";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
export default class MyOrderList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            filters: {
                orderId: [],
                productName: [],
                price: [],
                productNum: [],
                totalPrice: [],
                status: [],
                generationDate: [],
                startDate: []
            },
            searchText: '',
            searchedColumn: '',
            orders:null,
        }
    }

    renderActions = (status,orderId) => {
        let actions = [];
        //订单状态为 generated 时，可以取消订单、订单支付|取消和提交
        /*switch (status) {
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
        }*/

        //订单状态为 generated 时，可以取消
        //订单状态为 cancel 时，可以删除
        //订单状态为 approval 时，仅可支付操作
        //订单状态为 reject 时，仅可删除操作
        switch (status) {
            case "generated": {
                actions.push(<MyTooltip title={"取消预约"} component={<Button icon={<Close/>} onClick={() => {
                    axios.get(`${urlsUtil.order.updateOrderStatus}?orderId=${orderId}&status=cancel`).then((res) => {this.getOrderList();util.tipMessage("订单状态提示",res.data.message)})
                }} />} />)
                actions.push(<MyTooltip title={"确认预约信息"} component={<Button icon={<Send/>} onClick={() => {
                    axios.get(`${urlsUtil.order.updateOrderStatus}?orderId=${orderId}&status=confirmed`).then((res) => {this.getOrderList();util.tipMessage("订单状态提示",res.data.message)})
                }}/>} />)
                break;
            }
            case "cancel": {
                actions.push(<MyTooltip title={"删除该订单记录"} component={<Button icon={<Close/>} onClick={() => {
                    axios.get(`${urlsUtil.order.updateOrderStatus}?orderId=${orderId}&status=deleted`).then((res) => {this.getOrderList();util.tipMessage("订单状态提示",res.data.message)})
                }} primary={true}/>} />)
                break;
            }
            case "confirmed": {
                actions.push(<MyTooltip title={"取消预约"} component={<Button icon={<Close/>} onClick={() => {
                    axios.get(`${urlsUtil.order.updateOrderStatus}?orderId=${orderId}&status=cancel`).then((res) => {this.getOrderList();util.tipMessage("订单状态提示",res.data.message)})
                }} />} />)
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
        let url = !this.props.user.admin?
            `${urlsUtil.order.getMyOrders}?mobileNumber=${this.props.user.mobileNumber}`
                :urlsUtil.order.allOrderList;
        axios.get(url).then((response) => {
            let body = response.data.body;
            let {filters} = this.state;
            let orders;
            if (Array.isArray(body)) {
                orders = body.map((sumOrder) => {
                    let {order} = sumOrder;
                    let {orderId} = order;
                    let orderIdLink = <Anchor label={<span style={{fontSize:"18px",fontWeight:600}}>{orderId}</span>} href={`/#/orderDetail/${orderId}`} />;
                    // let orderIdLink = <Anchor label={<span style={{fontSize:"18px",fontWeight:600}}>{orderId}</span>} href={`/#/orderInfo/${orderId}`} />;
                    order.key = orderId;
                    order.orderId = orderIdLink;
                    // order.actions = <Link to={`/orderDetail/TL000000${i}`}>view</Link>;
                    let productNameLink = <Anchor label={<span style={{fontSize:"18px",fontWeight:600}}>{sumOrder.product.productName}</span>} href={`/#/searchResult/${sumOrder.product.productCode}`} />;
                    // order.productNameLink = productNameLink;
                    // order.productName = sumOrder.product.productName;
                    order.productName = productNameLink;
                    // order.productName = sumOrder.product.productName;
                    order.price = sumOrder.product.price;
                    if (!this.props.user.admin) {
                        order.actions = (
                            <Box direction="row" key={orderId}>
                                {/*{MyTip("移除该订单",<Button icon={<Close />} onClick={() => {axios.get(`${urlsUtil.order.updateOrderStatus}?orderId=${orderId}&status=deleted`)}} primary={true} />)}*/}
                                {this.renderActions(order.status,orderId)}
                            </Box>
                        );
                    }
                    order.status = util.codeTable(order.status)
                    if (!filters.orderId.includes({text:order.orderId,value:order.orderId})) {
                        filters.orderId.push(
                            {text:order.orderId,value:order.orderId}
                        );
                    }
                    if (!filters.productName.includes({text:order.productName,value:order.productName})) {
                        filters.productName.push(
                            {text:order.productName,value:order.productName}
                        );
                    }
                    if (!filters.price.includes({text:order.price,value:order.price})) {
                        filters.price.push(
                            {text:order.price,value:order.price}
                        );
                    }
                    if (!filters.productNum.includes({text:order.productNum,value:order.productNum})) {
                        filters.productNum.push(
                            {text:order.productNum,value:order.productNum}
                        );
                    }
                    if (!filters.totalPrice.includes({text:order.totalPrice,value:order.totalPrice})) {
                        filters.totalPrice.push(
                            {text:order.totalPrice,value:order.totalPrice}
                        );
                    }
                    if (!filters.status.includes({text:order.status,value:order.status})) {
                        filters.status.push(
                            {text:order.status,value:order.status}
                        );
                    }
                    if (!filters.generationDate.includes({text:order.generationDate,value:order.generationDate})) {
                        filters.generationDate.push(
                            {text:order.generationDate,value:order.generationDate}
                        );
                    }
                    if (!filters.startDate.includes({text:order.startDate,value:order.startDate})) {
                        filters.startDate.push(
                            {text:order.startDate,value:order.startDate}
                        );
                    }

                    return order

                })
            }
            let filterOrders = orders.filter((order) => {
                return order.status != "deleted"
            })
            this.setState({
                orders:filterOrders,
                filters:filters
            })
        })
    }

    clearFilters = () => {
        this.setState({ filteredInfo: null });
    };
    clearSort = () => {
        this.setState({ sortedInfo: null });
    };

    clearAll = () => {
        this.setState({
            filteredInfo: null,
            sortedInfo: null,
        });
    };


    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };


    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: text =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    getColumns = (filteredInfo,sortedInfo,filters,getColumnSearchProps) => {
        // return util.getTableColumns();
        let columns = util.getTableColumns1(filteredInfo,sortedInfo,filters)

        columns.actions = {
            title: util.codeTable("orderId"),
            dataIndex: "orderId",
            key: "orderId",
        }
        columns.actions = {
            title: util.codeTable("productName"),
            dataIndex: "productName",
            key: "productName",
        }
        columns.actions = {
            title: util.codeTable("actions"),
            dataIndex: "actions",
            key: "actions",
        }
        return columns;
    }

    getColumns1 = (filteredInfo,sortedInfo,filters) => {
        const columns = [
            {
                title: util.codeTable("orderId"),
                dataIndex: 'orderId',
                key: 'orderId'
            },{
                title: util.codeTable("productName"),
                dataIndex: 'productName',
                key: 'productName'
            },
            {
                title: util.codeTable("generationDate"),
                dataIndex: 'generationDate',
                key: 'generationDate',
                filters: !filters.generationDate?
                    [
                        { text: 'PT1000001', value: 'PT1000001' },
                        { text: 'PT1000007', value: 'PT1000007' },
                    ]:filters.generationDate
                ,
                filteredValue: filteredInfo.generationDate || null,
                onFilter: (value, record) => {
                    return record.generationDate.includes(value);
                },
                sorter: (a, b) => {
                    let ap = a.generationDate;
                    let bp = b.generationDate;
                    if (ap.length !== bp.length){
                        return ap.length-bp.length;
                    }
                    let as = ap.split("");
                    let bs = bp.split("");
                    for (let i = 0;i < as.length;i++) {
                        if (as[i] === bs[i]) {
                            continue;
                        } else {
                            return as[i] - bs[i];
                        }
                    }
                    return 0;
                },
                sortOrder: sortedInfo.columnKey === 'generationDate' && sortedInfo.order,
                ellipsis: true,
                // width: '30%',
                // ...this.getColumnSearchProps('generationDate'),
            },
            {
                title: util.codeTable("startDate"),
                dataIndex: 'startDate',
                key: 'startDate',
                filters: !filters.startDate?
                    [
                        { text: 'PT1000001', value: 'PT1000001' },
                        { text: 'PT1000007', value: 'PT1000007' },
                    ]:filters.startDate
                ,
                filteredValue: filteredInfo.startDate || null,
                onFilter: (value, record) => {
                    return record.startDate.includes(value);
                },
                sorter: (a, b) => {
                    let ap = a.startDate;
                    let bp = b.startDate;
                    if (ap.length !== bp.length){
                        return ap.length-bp.length;
                    }
                    let as = ap.split("");
                    let bs = bp.split("");
                    for (let i = 0;i < as.length;i++) {
                        if (as[i] === bs[i]) {
                            continue;
                        } else {
                            return as[i] - bs[i];
                        }
                    }
                    return 0;
                },
                sortOrder: sortedInfo.columnKey === 'startDate' && sortedInfo.order,
                ellipsis: true,
                // width: '30%',
                // ...this.getColumnSearchProps('startDate'),
            },
            {
                title: util.codeTable("price"),
                dataIndex: 'price',
                key: 'price',
                filters: !filters.price?
                    [
                        { text: 'PT1000001', value: 'PT1000001' },
                        { text: 'PT1000007', value: 'PT1000007' },
                    ]:filters.price
                ,
                filteredValue: filteredInfo.price || null,
                onFilter: (value, record) => {
                    return record.price.includes(value);
                },
                sorter: (a, b) => {
                    let ap = a.price;
                    let bp = b.price;
                    if (ap.length !== bp.length){
                        return ap.length-bp.length;
                    }
                    let as = ap.split("");
                    let bs = bp.split("");
                    for (let i = 0;i < as.length;i++) {
                        if (as[i] === bs[i]) {
                            continue;
                        } else {
                            return as[i] - bs[i];
                        }
                    }
                    return 0;
                },
                sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
                ellipsis: true,
                // width: '30%',
                // ...this.getColumnSearchProps('price'),
            },
            {
                title: util.codeTable("status"),
                dataIndex: 'status',
                key: 'status',
                filters: !filters.status?
                    [
                        { text: 'PT1000001', value: 'PT1000001' },
                        { text: 'PT1000007', value: 'PT1000007' },
                    ]:filters.status
                ,
                filteredValue: filteredInfo.status || null,
                onFilter: (value, record) => {
                    return record.status.includes(value);
                },
                sorter: (a, b) => {
                    let ap = a.status;
                    let bp = b.status;
                    if (ap.length !== bp.length){
                        return ap.length-bp.length;
                    }
                    let as = ap.split("");
                    let bs = bp.split("");
                    for (let i = 0;i < as.length;i++) {
                        if (as[i] === bs[i]) {
                            continue;
                        } else {
                            return as[i] - bs[i];
                        }
                    }
                    return 0;
                },
                sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
                ellipsis: true,
                // width: '30%',
                // ...this.getColumnSearchProps('status'),
            },
            {
                title: util.codeTable("actions"),
                dataIndex: 'actions',
                key: 'actions'
            }
        ]
        // return util.getTableColumnsOfCollection();
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

        let {orders, filters, sortedInfo, filteredInfo} = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        return (
            <div>
                <Space style={{ marginBottom: 16 }}>
                    <Button onClick={this.clearSort}>清除所有排序</Button>
                    <Button onClick={this.clearFilters}>清除所有过滤器</Button>
                    <Button onClick={this.clearAll}>清除所有排序与过滤器</Button>
                </Space>
                <Table
                    // columns={this.getColumns()}
                    // columns={this.getColumns(filteredInfo, sortedInfo, filters, this.getColumnSearchProps)}
                    columns={this.getColumns1(filteredInfo, sortedInfo, filters)}
                    dataSource={orders}
                    pagination={{ pageSize: 25 }}
                    onChange={this.handleChange}
                    // scroll={{ y: 240 }}
                />
            </div>
        );
    }

}
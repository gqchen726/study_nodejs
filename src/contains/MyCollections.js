import React from 'react';
import Table from "antd/es/table";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {Button} from "antd";
import {Anchor, Box} from "grommet";
import {Send} from "grommet-icons";
import {util} from "../common/Util";
import {MyTooltip} from "../component/MyTooltip";
import Space from "antd/es/space";
import {Trash} from "grommet-icons/es6";
import {SearchOutlined} from "@ant-design/icons";
import Input from "antd/es/input";
import Highlighter from 'react-highlight-words';

export default class MyCollections extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filteredInfo: null,
            sortedInfo: null,
            collections:null,
            filters: {},
            searchText: '',
            searchedColumn: '',
        };
    }


    //List
    renderActions = (productCode) => {
        let actions = [];
        actions.push(<MyTooltip title={"查看详情"} component={<Anchor href={`/#/dataInfo/${productCode}`} ><Send/></Anchor>} />)
        actions.push(<MyTooltip title={"取消收藏"} component={<Button icon={<Trash/>} onClick={() => {
            axios.get(`${urlsUtil.collection.deleteCollection}?productCode=${productCode}&mobileNumber=${this.props.user.mobileNumber}`).then((res) => {this.getCollections();util.tipMessage("收藏夹提示",res.data.message)})
        }} />} />)

        return actions;
    }

    componentWillMount() {
        // 获取收藏列表
        this.getCollections();
    }

    getCollections = () => {
        axios.get(`${urlsUtil.collection.getAllCollection}?mobileNumber=${this.props.user.mobileNumber}`).then((response) => {
            let body = response.data.body;
            let collections;
            let {filters} = this.state;
            if (Array.isArray(body)) {
                collections = body.map((collection) => {
                    if (!filters.productCode) filters.productCode = [];
                    filters.productCode.push({text:collection.productCode,value:collection.productCode});
                    collection.key = collection.productCode;
                    // collection.productCode = <Anchor label={<span style={{fontSize:"18px",fontWeight:600}}>{collection.productCode}</span>} href={`/#/searchResult/${collection.productCode}`} />;
                    collection.actions = (
                        <Box direction="row" key={collection.productCode}>
                            {/*{MyTip("移除该订单",<Button icon={<Close />} onClick={() => {axios.get(`${urlsUtil.order.updateOrderStatus}?orderId=${orderId}&status=deleted`)}} primary={true} />)}*/}
                            {this.renderActions(collection.productCode)}
                        </Box>
                    );
                    return collection

                })
            }
            setTimeout(() => {
                this.setState({
                    collections:collections,
                    filters:filters
                })
            },0)
        })
    }

    getColumns = (filteredInfo,sortedInfo,filters) => {
        const columns = [
            {
                title: util.codeTable("productCode"),
                dataIndex: 'productCode',
                key: 'productCode',
                filters: !filters.productCode?
                    [
                    { text: 'PT1000001', value: 'PT1000001' },
                    { text: 'PT1000007', value: 'PT1000007' },
                ]:filters.productCode
                ,
                filteredValue: filteredInfo.productCode || null,
                onFilter: (value, record) => {
                    return record.productCode.includes(value);
                },
                sorter: (a, b) => {
                    let ap = a.productCode;
                    let bp = b.productCode;
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
                sortOrder: sortedInfo.columnKey === 'productCode' && sortedInfo.order,
                ellipsis: true,
                width: '30%',
                ...this.getColumnSearchProps('name'),
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




    render() {
        let {collections, filters} = this.state;
        let { sortedInfo, filteredInfo } = this.state;
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
                    columns={this.getColumns(filteredInfo, sortedInfo, filters)}
                    dataSource={collections}
                    pagination={{ pageSize: 25 }}
                    onChange={this.handleChange}
                    // scroll={{ y: 240 }}
                />
            </div>
        );
    }



    //Card
    /*componentWillMount() {
        // 获取收藏列表
        this.getCollections();
    }

    getCollections = () => {
        axios.get(`${urlsUtil.collection.getAllCollection}?mobileNumber=${this.props.user.mobileNumber}`).then((response) => {
            let body = response.data.body;
            let collections;
            if (Array.isArray(body)) {
                collections = body.map((collection) => {

                    collection.actions = (
                        <Box direction="row" key={collection.productCode}>

                            {this.renderActions(collection.productCode)}
                        </Box>
                    );
                    return collection

                })
            }
            setTimeout(() => {
                this.setState({
                    collections:collections
                })
            },0)
        })
    }

    renderAllCardGirds = (datas,currentPage) => {
        if (!datas) return;
        let cardGirds = datas.map((data,index) => {
            return (
                <Card.Grid key={index} className={"GirdOfCard"} >
                    <Link to={{
                        pathname: `/dataInfo/${index}`,
                        // search: `/${index}`,
                    }}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title={data.productName} description={data.description} />
                        </Card>
                    </Link>
                </Card.Grid>
            );
        })
        let cardGirdOfSplitPage = [];
        for (let i = 0; i <cardGirds.size(); i++) {
            let page = i / 8;
            cardGirdOfSplitPage[page] = cardGirds[i];
        }

        return cardGirdOfSplitPage[currentPage];
    }

    renderCurrentCardGirds = (datas) => {
        // let datasSplitPage = this.getDatasSplitPage(datas);
        if (!datas) return;
        let cardGirds = datas.map((data,index) => {
            let imgs = arrayUtils.split(data.resources,";");
            let {productCode} = data;
            return (
                /!*<Card.Grid key={index} className={"GirdOfCard"} >
                    <Link to={{
                        pathname: `/dataInfo/${productCode}`,
                        // search: `/${index}`,
                    }}>
                        <Card
                            hoverable
                            cover={
                                <img
                                    width={261}
                                    height={327}
                                    alt="example"
                                    src={(!!imgs && imgs.length>0) ? `${urlsUtil.image.get}${imgs[0]}` : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
                                />
                            }
                        >
                            <Meta title={data.productName} description={data.productCode} />
                        </Card>
                        {/!*<RichFooter product={data} />*!/}
                    </Link>
                </Card.Grid>*!/
                <Card.Grid key={index} className={"GirdOfCard"} >
                    <RichFooter product={data} />
                </Card.Grid>
            );
        })

        return cardGirds;
    }


    render() {
        let {collections} = this.state;
        let {currentPage} = this.props;

        return (
            <Card className={'resultShow'} title={"result"} >
                {
                    this.renderCurrentCardGirds(collections)
                    // this.getCardGirds(datas,currentPage)
                }
                <br /><br /><br /><br />
            </Card>
            // <Switch>
            //     <Card className={'resultShow'} title={"result"} >
            //         {this.renderCardGirds(datas)}
            //     </Card>
            //     {/!*<Route exact path="/dataInfo/:key" >*!/}
            //     {/!*    <DataInfoW data={this.state.datas} user={this.props.user} />*!/}
            //     {/!*</Route>*!/}
            // </Switch>
        );
    }*/

}
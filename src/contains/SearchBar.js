import React from 'react'
import Input from "antd/es/input";
import Button from "antd/es/button";
import {Link, withRouter} from "react-router-dom";
import axios from "axios";
// import {useRouteMatch} from "react-router";
// import '../public/css/App.css'
import {urlsUtil} from "./../public/ApiUrls/UrlsUtil"
import "./../public/css/SearchBar.css"
import Cascader from "antd/es/cascader";
import { AutoComplete } from 'antd';



const localContext = require('../cache/LocalContext');
export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: props.keywords ? props.keywords:null,
            searchIng: false,
            optionValue: null,
            options: null
        }
    }
    // componentWillMount() {
    //     if (!this.props.keywords) {
    //         this.state.keywords = null;
    //         axios.get(`${urlsUtil.product.searchUrl}?keywords=${this.state.keywords}`).then(
    //             (response) => {
    //
    //                 let datas = response.data.body;
    //
    //                 this.props.saveAny('datas',datas);
    //             }
    //         )
    //     }
    // }

    componentWillUpdate(nextProps, nextState, nextContext) {
        this.state.optionValue = nextProps.keywords;
    }


    autoSave = (event) => {
        // let keywords = event.target.value;
        // this.setState({
        //     keywords: keywords
        // })


        this.setState({
            optionValue: event
        })

    }


    search = () => {
        // let {keywords} = this.state;
        // let url = 'http://avatars1.githubusercontent.com/u/8186664?s=460&v=4';
        // json模拟数据
        // let datas = [
        //     {
        //         name: {
        //             value: "模拟数据1",
        //             isAllowEdit:true,
        //             chineseName: "名称"
        //         },code: {
        //             value: "S00001",
        //             isAllowEdit:true,
        //             chineseName: "编号"
        //         },description: {
        //             value: "这是一条模拟数据的描述信息",
        //             isAllowEdit:true,
        //             chineseName: "描述"
        //         },price: {
        //             value: "$20",
        //             isAllowEdit:true,
        //             chineseName: "单价"
        //         },
        //     }
        // ];

        // let datas = [];
        // for (let i = 0; i < 35; i++) {
        //     datas.push({
        //         name: `模拟数据${i}`,
        //         code: `S0000${i}`,
        //         description: "这是一条模拟数据的描述信息",
        //         price: "$20",
        //     })
        // }
        // this.props.saveAny('datas',datas);
        // this.setState({
        //     datas: datas
        // })


        let {optionValue} = this.state;
        // 发送axios请求
        this.setState({
            searchIng: true
        })
        axios.get(`${urlsUtil.product.searchUrl}?keywords=${optionValue}`).then(
            (response) => {

                let datas = response.data.body;

                this.props.saveAny('datas',datas);
                // 本地缓存
                // localContext.put("datas",datas);
                this.setState({
                    searchIng: false,
                })
            }
        )



    }

    /**
     * 选择自动完成选项时调用
     * @param selectValue
     */
    onSelect = (selectValue) => {
        this.setState({
            selectValue: selectValue
        })
    }
    /**
     * 在输入框内容改变时被调用
     *  包括键盘输入以及选择自动完成选项 时都会调用
     * @param key
     */
    onSearch = (optionValue) => {
        // let {optionValue} = this.state;
        if (!optionValue) return ;
        axios.get(`${urlsUtil.product.searchProductNameList}?keywords=${optionValue}`).then(
            (response) => {
                let datas = response.data.body;
                let newDatas;
                if (!!datas) {
                    console.log(datas)
                    // datas = datas.forEach((value,index,arr) => {
                    //     arr[index] = {"value":value.productName}
                    // })
                    // console.log(datas)
                    this.setState({
                        options: datas,
                    })
                }
            }
        )
        //模拟数据
        // let datas = [
        //     { value: 'Burns Bay Road' },
        //     { value: 'Downing Street' },
        //     { value: 'Wall Street' },
        // ];
        // this.setState({
        //     options: datas,
        // })
    }
    /**
     * 输入框内容改变时调用
     */
    onChange = (optionValue) => {
        this.setState({
            optionValue: optionValue
        })
    }



    render() {
        // let {url} = useRouteMatch()
        let {searchIng, optionValue, options} = this.state;

        return (
            <div className='searchBar' style={{ width: '90%' }}>
                {/*<Input*/}
                {/*    id='search'*/}
                {/*    style={{ width: '80%' }}*/}
                {/*    placeholder={'请输入关键词'}*/}
                {/*    maxLength={128}*/}
                {/*    onChangeCapture={this.autoSave}*/}
                {/*    value={this.state.keywords?this.state.keywords:null}*/}
                {/*    onPressEnter={this.props.search}*/}
                {/*/>*/}

                {/*<Button*/}
                {/*    style={{width:'10%'}}*/}
                {/*    type={"primary"}*/}
                {/*    onClick={this.search}*/}
                {/*    loading={searchIng}*/}
                {/*>*/}
                {/*    <span*/}
                {/*        style={{font:{size:'11px'}}}*/}
                {/*    >*/}
                {/*        <Link to={`/searchResult`} >*/}
                {/*            <span*/}
                {/*                className='SearchBar'*/}
                {/*            >*/}
                {/*                搜索*/}
                {/*            </span>*/}
                {/*        </Link>*/}
                {/*        /!*<Link to={`${url}/searchResultShow`} >搜索</Link>*!/*/}
                {/*    </span>*/}
                {/*</Button>*/}
                {/*<br />*/}
                <AutoComplete
                    value={optionValue}
                    options={options}
                    style={{ width: '80%' }}
                    // onSelect={this.onSelect}
                    onSelect={this.autoSave}
                    onSearch={this.onSearch}
                    // onChange={this.onChange}
                    onChange={this.autoSave}
                    placeholder="control mode"
                />
                <Button
                    style={{width:'10%'}}
                    type={"primary"}
                    onClick={this.search}
                    loading={searchIng}
                >
                    <span
                        style={{font:{size:'11px'}}}
                    >
                        <Link to={`/searchResult`} >
                            <span
                                className='SearchBar'
                            >
                                搜索
                            </span>
                        </Link>
                        {/*<Link to={`${url}/searchResultShow`} >搜索</Link>*/}
                    </span>
                </Button>
            </div>
        );
    }
}
SearchBar.defaultProps = {
    optionValue: null,
}
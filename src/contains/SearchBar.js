import React from 'react'
import Input from "antd/es/input";
import Button from "antd/es/button";
import {Link, withRouter} from "react-router-dom";
import axios from "axios";
// import {useRouteMatch} from "react-router";
// import '../public/css/App.css'
import {urlsUtil} from "./../public/ApiUrls/UrlsUtil"

const localContext = require('../cache/LocalContext');
export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: props.keywords ? props.keywords:null,
            searchIng: false
        }
    }

    // autoSave = (event) => {
    //     let keywords = event.target.value;
    //
    //     this.setState({
    //         keywords: keywords
    //     })
    //     if (keywords) {
    //         // this.props.saveSearchKeyWords(keywords);
    //         this.props.saveAny('keywords',keywords);
    //     }
    // }


    search = () => {
        let {keywords} = this.state;
        if (!keywords) {
            this.props.saveAny('keywords',keywords);
        }
        let url = 'http://avatars1.githubusercontent.com/u/8186664?s=460&v=4';


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


        // 发送axios请求
        this.setState({
            searchIng: true
        })
        axios.get(`${urlsUtil.product.searchUrl}?keywords=${this.state.keywords}`).then(
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


    render() {
        // let {url} = useRouteMatch()
        let {searchIng} = this.state;
        return (
            <div className='searchBar' style={{ width: '90%' }}>
                <Input
                    id='search'
                    style={{ width: '80%' }}
                    placeholder={'请输入关键词'}
                    maxLength={128}
                    // onChangeCapture={this.autoSave}
                    value={this.state.keywords?this.state.keywords:null}
                    onPressEnter={this.props.search}
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
                        <Link to={`/searchResult`} >搜索</Link>
                        {/*<Link to={`${url}/searchResultShow`} >搜索</Link>*/}
                    </span>
                </Button>
            </div>
        );
    }
}
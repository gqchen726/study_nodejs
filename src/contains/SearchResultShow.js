import React from 'react';

import {DataShowGrid} from "./DataShowGrid";
import {SearchBar} from "../component/SearchBar";

export class SearchResultShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keywords:null,
            datas:[]
        }
    }

    saveSearchKeyWords = (keywords) => {
        this.setState(keywords)
    }

    search = () => {
        let {keywords} = this.state;
        let {datas} = this.state;
        let url = 'http://avatars1.githubusercontent.com/u/8186664?s=460&v=4';
        // 发送axios请求
        for (let i = 0;i < 5;i++) {
            datas.push(
                {
                    id:i,
                    name:`data${i}`,
                    imageSrc:url,
                    //    ...
                }
            );
        }
        this.setState({datas: datas})
    }

    render() {
        return (
            <div>
                <SearchBar keywords={this.props.keywords} /><br />
                <DataShowGrid datas={this.state.datas} />
            </div>
        );
    }

}
import React from 'react';

import {DataShowGrid} from "./DataShowGrid";
import {SearchBar} from "../component/SearchBar";

export class SearchResultShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }



    search = () => {
        let {keywords} = this.state;
        let url = 'http://avatars1.githubusercontent.com/u/8186664?s=460&v=4';
        // 发送axios请求

        // json模拟数据
        let datas = [];
        for (let i = 0;i < 4;i++) {
            datas.push(
                {
                    id:i,
                    name:`data${i}`,
                    imageSrc:url,
                    //    ...
                }
            );
        }

        return datas;
    }

    render() {
        return (
            <div>
                <SearchBar keywords={this.props.keywords} saveSearchKeyWords={this.props.saveSearchKeyWords} /><br />
                <DataShowGrid datas={this.search()} />
            </div>
        );
    }

}
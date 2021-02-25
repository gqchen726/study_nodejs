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
        // 发送axios请求
        let datas = [
            {
                id:1,
                name:"xx1",
                imageURL:"",
            //    ...
            },{
                id:2,
                name:"xx2",
                imageURL:"",
            //    ...
            },{
                id:3,
                name:"xx3",
                imageURL:"",
            //    ...
            },{
                id:4,
                name:"xx4",
                imageURL:"",
            //    ...
            },{
                id:5,
                name:"xx5",
                imageURL:"",
            //    ...
            },
        ]
        this.setState(datas)
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
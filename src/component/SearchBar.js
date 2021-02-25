import React from 'react'
import Input from "antd/es/input";
import Button from "antd/es/button";
import {Link} from "react-router-dom";
// import '../public/css/App.css'


const localContext = require('../cache/LocalContext');
export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keywords: props.keywords
        }
    }

    autoSave = (event) => {
        let keywords = event.target.value;

        this.setState({
            keywords: keywords
        })
    }
    search = () => {
        let {keywords} = this.state; 
        // 发送请求
        // 保存关键词
        if (keywords) {
            this.props.saveSearchKeyWords(keywords);
        }
    }

    render() {
        return (
            <div className='searchBar' style={{ width: '90%' }}>
                <Input
                    id='search'
                    style={{ width: '80%' }}
                    placeholder={'请输入关键词'}
                    maxLength={128}
                    onChangeCapture={this.autoSave}
                    value={this.state.keywords?this.state.keywords:null}
                    onPressEnter={this.search}
                />
                <Button
                    style={{width:'10%'}}
                    type={"primary"}
                    onClick={this.search}
                >
                    <span
                        style={{font:{size:'11px'}}}
                    >
                        <Link to={'/dataInfo'} >搜索</Link>
                    </span>
                </Button>
            </div>
        );
    }
}
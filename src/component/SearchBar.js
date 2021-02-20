import React from 'react'
import Input from "antd/es/input";
import Button from "antd/es/button";
// import '../public/css/App.css'


const localContext = require('../cache/LocalContext');
export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }

    autoSave = (event) => {
        let keyWords = event.target.value;




        this.setState({
        })
    }
    search = () => {

    }

    render() {
        return (
            <div className='searchBar'>
                <Input
                    id='search'
                    style={{ width: '80%' }}
                    placeholder={'请输入关键词'}
                    maxLength={128}
                    onChangeCapture={this.autoSave}
                />
                <Button
                    style={{width:'5%'}}
                    type={"primary"}
                    onClick={this.search}
                >
                    <span
                        style={{font:{size:'11px'}}}
                    >
                        搜索
                    </span>
                </Button>
            </div>
        );
    }
}
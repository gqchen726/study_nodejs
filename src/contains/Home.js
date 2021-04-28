import React from 'react'
// import '../public/css/App.css'
import {CarouselMap} from "./CarouselMap";
import {SearchBar} from "./SearchBar";
import {Link} from "react-router-dom";
import {AutoComplete} from "antd";
import Button from "antd/es/button";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
// import Route from "react-router/modules/Route";
// import {useRouteMatch} from "react-router";


const localContext = require('../cache/LocalContext');
export class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            optionValue: null
        }
    }




    getUser = (here,user) => {
        this.props.getUser(here,user)
        this.setState({
            user: user
        })
    }

    autoSave = (event) => {
        this.setState({
            optionValue: event
        })

    }

    /**
     * 在输入框内容改变时被调用
     *  包括键盘输入以及选择自动完成选项 时都会调用
     * @param key
     */
    onSearch = (optionValue) => {
        if (!optionValue) return ;
        axios.get(`${urlsUtil.product.searchProductNameList}?keywords=${optionValue}`).then(
            (response) => {
                let datas = response.data.body;
                let newDatas;
                if (!!datas) {
                    this.setState({
                        options: datas,
                    })
                }
            }
        )
    }

    render() {
        const style = { background: '#0092ff', padding: '8px 0' };
        // let {path,url} = useRouteMatch();

        let {searchIng, optionValue, options} = this.state;
        let sources = '1.jpg;2.jpg';
        return (
            <div id='root' className="App">
                {/*<header className="App-header">*/}
                {/*    <StateBar user={this.state.user} getUser={this.getUser}/>*/}
                {/*</header>*/}

                <div style={{width:'100%'}} >
                    {/*<SearchBar keywords={this.props.keywords} saveAny={this.props.saveAny} />*/}
                    {/*<Link to={'/searchResult'} >数据检索</Link>*/}
                    {/*
                        利用路由跳转实现主页keywords的传递,
                        重写input框，实现输入提示
                    */}
                    <div>
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
                                <Link to={`/searchResult/${optionValue}`} >
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
                    <br /><br />
                    <CarouselMap autoPlay={true} user={this.props.user} sources={sources} />
                    <br /><br />

                    {/*<Link to={'/login'}>*/}
                    {/*    登录*/}
                    {/*</Link>*/}

                    {/*<Switch>*/}
                    {/*    <Route path={`${path}/searchResultShow`} component={SearchResultShow} children={datas} />*/}
                    {/*</Switch>*/}
                </div>




            </div>
        );
    }
}
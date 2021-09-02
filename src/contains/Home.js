import React from 'react'
// import '../public/css/App.css'
import {SearchBar} from "./SearchBar";
import {Link} from "react-router-dom";
import {AutoComplete} from "antd";
import Button from "antd/es/button";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {CarouselMap} from "../component/CarouselMap";
import {FormSearch, Trash} from "grommet-icons/es6";
import {util} from "../common/Util";
import {MyTooltip} from "../component/MyTooltip";
// import {CarouselMap} from "./CarouselMap";
// import Route from "react-router/modules/Route";
// import {useRouteMatch} from "react-router";
import {
    SearchOutlined
} from '@ant-design/icons';
import Tooltip from "antd/es/tooltip";

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
        let sources = 'licensed-image (2)1621080176069.jpg;licensed-image (6)1620378109693.jpg';
        return (
            <div id='root' className="App">
                {/*<header className="App-header">*/}
                {/*    <StateBar user={this.state.user} getUser={this.getUser}/>*/}
                {/*</header>*/}

                <div><h1>欢迎访问山西旅游景点门票预定系统</h1></div>

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

                        <Link to={`/searchResult/${optionValue}`} >
                            <Button type="primary" icon={<SearchOutlined />}>
                                Search
                            </Button>
                        </Link>
                        {/*<MyTooltip title={"搜索"} component={<Button icon={<FormSearch />} primary={true}/>} />*/}
                    </div>
                    <br /><br />
                    {/*<CarouselMap autoPlay={true} user={this.props.user} sources={sources} />*/}
                    <CarouselMap
                        getFileList={this.getFileList}
                        isEditMode={false}
                        sources={sources}
                        user={this.props.user}
                        autoPlay={true}
                        imageSize={{width:"960px",height:"480px"}}
                    />
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
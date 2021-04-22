import React from 'react';

import {SearchBar, SearchBarW} from "./SearchBar";
import {GirdOfCard, GirdOfCardW} from "./GirdOfCard";
import Pagination from "antd/es/pagination";
import {withRouter} from "react-router";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";

export class SearchResultShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        }
    }

    componentWillMount() {

        // let {match} = this.props;
        // let keywords;
        // if (!!match) keywords = match.params.keywords;
        // if (keywords) {
        //     axios.get(`${urlsUtil.product.searchUrl}?keywords=${keywords}`).then(
        //         (response) => {
        //
        //             let datas = response.data.body;
        //
        //             this.props.saveAny('datas',datas);
        //         }
        //     )
        // }
        this.getDatas(this.props);
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        let {match} = this.props;
        if (match) {
            if (this.props.match.params.keywords != nextProps.match.params.keywords) {
                this.getDatas(nextProps);
            }
        }
    }

    saveAny = (dataName,data) => {
        switch (dataName) {
            case 'datas':
                this.setState({
                    datas: data
                })
                return;
            case 'keywords':
                this.setState({
                    keywords: data
                })
                return;
        }
    }

    getDatas = (props) => {
        let {match} = props;
        let keywords;
        if (!!match) {
            keywords = match.params.keywords;
        }
        if (keywords) {
            axios.get(`${urlsUtil.product.searchUrl}?keywords=${keywords}`).then(
                (response) => {

                    let datas = response.data.body;

                    this.props.saveAny('datas',datas);
                }
            )
        }
    }


    renderSearchBar = () => {
        let {match} = this.props;
        let keywords;
        if (!!match) keywords = match.params.keywords;
        // return <SearchBar keywords={this.props.keywords} saveSearchKeyWords={this.props.saveSearchKeyWords} />;
        return <SearchBarW keywords={keywords ? keywords:this.props.keywords} saveAny={this.props.saveAny} />
    }
    renderGirdOfCard = (datas,currentPage) => {
        let datasSplitPage = this.getDatasSplitPage(datas);
        console.log(datas)
        console.log(datasSplitPage[currentPage-1])
        return <GirdOfCard datas={datasSplitPage[currentPage-1]} />;
    }
    renderOldGirdOfCard = (datas,currentPage) => {
        let datasSplitPage = this.getDatasSplitPage(datas);
        return <GirdOfCard datas={datasSplitPage[currentPage-1]} />;
    }
    onChange = (currentPage) => {
        this.setState({
            currentPage:currentPage
        })
    }

    /**
     * 将所有的数据按照每页8个数据分割放入二维数组
     **/
    getDatasSplitPage = (datas) => {
        let datasSplitPage = [];
        let tempArr = [];
        let counter = 1;
        for (let i = 0; i <datas.length; i++) {

            tempArr.push(datas[i]);
            counter++;
            if (i == 0) {
                if (datas.length == 1) {
                    datasSplitPage.push(tempArr);
                }
                continue;
            } else if (counter == 9 || i == datas.length-1) {
                datasSplitPage.push(tempArr);
                tempArr = [];
                counter = 1;
            }
            // else if (i == datas.length-1) {
            //     datasSplitPage.push(tempArr);
            // }
        }

        return datasSplitPage;
    }




    render() {
        // let datas = this.props.children.datas? this.props.children:this.props;
        let {currentPage} = this.state;
        let {datas} = this.props;
        if (!datas) {
            return <div>data is null</div>;
        }
        // let total = datas.length;
        return (
            <div>
                {this.renderSearchBar()}
                <br />
                {this.renderGirdOfCard(datas,currentPage)}
                {/*<GirdOfCardW datas={this.props.datas} />*/}
                <Pagination
                    current={currentPage}
                    onChange={this.onChange}
                    // total={total}
                    total={datas.length}
                    pageSize={8}
                    showQuickJumper={true}
                />
            </div>
        );
    }

}
export const SearchResultShowW = withRouter(SearchResultShow)
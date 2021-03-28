import React from 'react';

import {SearchBar} from "./SearchBar";
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


    renderSearchBar = () => {
        // return <SearchBar keywords={this.props.keywords} saveSearchKeyWords={this.props.saveSearchKeyWords} />;
        return <SearchBar keywords={this.props.keywords} saveAny={this.props.saveAny} />
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
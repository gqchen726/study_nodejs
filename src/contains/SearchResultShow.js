import React from 'react';

import {SearchBar} from "./SearchBar";
import {GirdOfCard, GirdOfCardW} from "./GirdOfCard";
import Pagination from "antd/es/pagination";

export class SearchResultShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        }
    }

    renderSearchBar = () => {
        return <SearchBar keywords={this.props.keywords} saveSearchKeyWords={this.props.saveSearchKeyWords} />;
    }
    renderGirdOfCard = (datas,currentPage) => {
        let datasSplitPage = this.getDatasSplitPage(datas);
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
        console.log(datasSplitPage);
        return datasSplitPage;
    }




    render() {
        console.log(this)
        // let datas = this.props.children.datas? this.props.children:this.props;
        let {currentPage} = this.state;
        let {datas} = this.props;
        let total = datas.length;
        return (
            <div>
                {this.renderSearchBar()}
                <br />
                {this.renderGirdOfCard(datas,currentPage)}
                {/*<GirdOfCardW datas={this.props.datas} />*/}
                <Pagination
                    current={currentPage}
                    onChange={this.onChange}
                    total={total}
                    pageSize={8}
                    showQuickJumper={true}
                />
            </div>
        );
    }

}
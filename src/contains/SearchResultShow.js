import React from 'react';

import {DataShowGrid} from "./DataShowGrid";
import {SearchBar} from "./SearchBar";
import {GirdOfCard} from "./GirdOfCard";

export class SearchResultShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }




    render() {
        return (
            <div>
                <SearchBar keywords={this.props.keywords} saveSearchKeyWords={this.props.saveSearchKeyWords} /><br />
                {/*<DataShowGrid datas={this.state.datas} />*/}
                <GirdOfCard datas={this.props.datas} />
            </div>
        );
    }

}
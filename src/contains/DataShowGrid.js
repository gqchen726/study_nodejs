import React from 'react'
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import {DataShowCard} from "./DataShowCard";
// import '../public/css/App.css'
import '../public/css/DataShowGrid.css'
import {Clock} from "../component/Clock";
import {Input} from "antd";
import {GirdOfCard} from "./GirdOfCard";


const localContext = require('../cache/LocalContext');
export class DataShowGrid extends React.Component {
    constructor(props) {
        super(props);
    }


    renderDataShowCards = () => {
        let {datas} = this.props;
        if (!datas) {
            return null;
        }
        let dataShowCards = [];
        dataShowCards = datas.map((data) => {
            return <DataShowCard key={data.id} data={data} />
        })

        return dataShowCards;
    }
    renderCols = () => {
        let dataShowCards = this.renderDataShowCards();
        if (!dataShowCards) return null;
        return (
            dataShowCards.map( (dataShowCard) => {
                return <Col sm={10} md={6} lg={4} xl={4}>
                            {dataShowCard}
                        </Col>;
            })
        );
    }

    render() {
        return (
            <div className='dataShowGrid'>
                {/*<Row gutter={{ xs:4,sm:4,md:12 }}>*/}
                {/*    {this.renderCols()}*/}
                {/*</Row>*/}
                <GirdOfCard />
            </div>
        );
    }
}
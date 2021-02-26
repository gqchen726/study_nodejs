import React from 'react'
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import {DataShowCard} from "./DataShowCard";
// import '../public/css/App.css'
import '../public/css/DataShowGrid.css'
import {Clock} from "../component/Clock";
import {Input} from "antd";


const localContext = require('../cache/LocalContext');
export class DataShowGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    con = () => {
        setTimeout(() => {
            console.log(`x:${document.body.clientWidth},y:${document.body.clientHeight}`)
        },1000)
    }

    renderDataShowCards = () => {
        let {datas} = this.props;
        if (!datas) {
            return null;
        }
        let dataShowCards = [];
        dataShowCards = datas.map((data) => {
            return <DataShowCard data={data} />
        })
        console.log(dataShowCards)
        return dataShowCards;
    }
    renderCols = () => {
        let dataShowCards = this.renderDataShowCards();
        if (!dataShowCards) return null;
        return (
            <Col sm={10} md={6} lg={4} xl={4}>
                {dataShowCards}
            </Col>
        );
    }

    render() {
        return (
            <div className='dataShowGrid'>
                <Row gutter={{ xs:4,sm:4,md:12 }}>
                    {this.renderCols()}
                </Row>

            </div>
        );
    }
}
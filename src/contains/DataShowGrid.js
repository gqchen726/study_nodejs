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

    }

    render() {
        return (
            <div className='dataShowGrid'>
                <Row gutter={{ xs:4,sm:4,md:12 }}>
                    <Col sm={10} md={6} lg={4} xl={4}>
                        <DataShowCard
                            imageSrc='http://avatars1.githubusercontent.com/u/8186664?s=460&v=4'
                        />
                    </Col>
                    <Col sm={10} md={6} lg={4} xl={4}>
                        <DataShowCard
                            imageSrc='http://avatars1.githubusercontent.com/u/8186664?s=460&v=4'
                        />
                    </Col>
                    <Col sm={10} md={6} lg={4} xl={4}>
                        <DataShowCard
                            imageSrc='http://avatars1.githubusercontent.com/u/8186664?s=460&v=4'
                        />
                    </Col>
                    <Col sm={10} md={6} lg={4} xl={4}>
                        <DataShowCard
                            imageSrc='http://avatars1.githubusercontent.com/u/8186664?s=460&v=4'
                        />
                    </Col>


                </Row>

            </div>
        );
    }
}
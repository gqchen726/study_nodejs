import React from 'react'
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import {DataShowCard} from "./DataShowCard";
// import '../public/css/App.css'

export class SearchResult extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div>
                <Row>
                    <Col span={1}><DataShowCard />1</Col>
                    <Col span={2}><DataShowCard />2</Col>
                    <Col span={3}><DataShowCard />3</Col>
                    <Col span={6}><DataShowCard />4</Col>
                </Row>
            </div>
        );
    }
}
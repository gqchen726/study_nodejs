import React from 'react'
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import {DataShowCard} from "./DataShowCard";
// import '../public/css/App.css'


const localContext = require('../cache/LocalContext');
export class DataShowGrid extends React.Component {
    constructor(props) {
        super(props);
    }


    search = () => {

    }

    render() {
        return (
            <div className='dataShowGrid'>
                <Row>
                    <Col span={24}><DataShowCard imageSrc='http://avatars1.githubusercontent.com/u/8186664?s=460&v=4' /></Col>
                    <Col span={24}><DataShowCard imageSrc='http://avatars1.githubusercontent.com/u/8186664?s=460&v=4' /></Col>
                    <Col span={24}><DataShowCard imageSrc='http://avatars1.githubusercontent.com/u/8186664?s=460&v=4' /></Col>
                </Row><Row>
                    <Col span={24}><DataShowCard imageSrc='http://avatars1.githubusercontent.com/u/8186664?s=460&v=4' /></Col>
                    <Col span={24}><DataShowCard imageSrc='http://avatars1.githubusercontent.com/u/8186664?s=460&v=4' /></Col>
                    <Col span={24}><DataShowCard imageSrc='http://avatars1.githubusercontent.com/u/8186664?s=460&v=4' /></Col>
                </Row><Row>
                    <Col span={24}><DataShowCard imageSrc='http://avatars1.githubusercontent.com/u/8186664?s=460&v=4' /></Col>
                    <Col span={24}><DataShowCard imageSrc='http://avatars1.githubusercontent.com/u/8186664?s=460&v=4' /></Col>
                    <Col span={24}><DataShowCard imageSrc='http://avatars1.githubusercontent.com/u/8186664?s=460&v=4' /></Col>
                </Row>
            </div>
        );
    }
}
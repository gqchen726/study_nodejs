import React from 'react'
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
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
                    <Col span={24}>col</Col>
                </Row>
            </div>
        );
    }
}
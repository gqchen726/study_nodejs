import React from 'react'
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import {DataShowCard} from "./DataShowCard";
// import '../public/css/App.css'
import '../public/css/DataShowGrid.css'
import {Clock} from "../component/Clock";
import {Input} from "antd";
import {CarouselMap} from "./CarouselMap";


const localContext = require('../cache/LocalContext');
export class DataInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='dataInfo'>
                <CarouselMap autoPlay={true} />
            </div>
        );
    }
}
import React from 'react'
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import {DataShowCard} from "./DataShowCard";
// import '../public/css/App.css'
import '../public/css/DataShowGrid.css'
import {Clock} from "../component/Clock";
import {Input} from "antd";
import {GirdOfCard} from "./GirdOfCard";
import {RichFooter} from "../component/RichFooter";


export class DataShowGrid extends React.Component {
    constructor(props) {
        super(props);
    }




    render() {
        const product = {
            productName: "王家大院",
            productCode: "PT1000001",
            description: "王家大院位于山西省灵石县城东12公里处的静升镇（2003年被命名为首批“中国历史文化名镇”）。距世界文化遗产平遥古城35公里、介休绵山4公里、十八罗汉头像海外回归故里资寿寺2公里，是山西省近年来以“名城、名山、名院、名寺”为优势，推出的一条精品旅游线路。同蒲铁路、108国道纵贯县境，大运高速公路灵石出口处距王家大院2公里，交通十分便利。",
            price: "25",
            ex: "额外描述",
            category: "晋中",
            resources: null
        };
        return (
            <div className='dataShowGrid'>
                {/*<Row gutter={{ xs:4,sm:4,md:12 }}>*/}
                {/*    {this.renderCols()}*/}
                {/*</Row>*/}
                {/*<GirdOfCard />*/}
                <RichFooter product={product} />

            </div>
        );
    }
}
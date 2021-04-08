import { Result, Button } from 'antd';
import {Link} from 'react-router-dom'
import React from "react";
import PropTypes from 'prop-types'
import {Carousel} from "antd/es";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import Image from "antd/es/image";

export const CarouselMap = (props) => {
    const lunboSetting = {
        dots: true,
        lazyLoad: true,
        autoplay:true,
    };
    const renderImages = data => {
        let {resources} = data;
        if (!resources) return null;
        let resourceArr = resources.split(";");
        let ImageArr = resourceArr.map((value,index) => {
            console.log(`${urlsUtil.image.get}?file=${value}`)
            return (
                <div key={index}>
                    <Image
                        key={index}
                        src={`${urlsUtil.image.get}?file=${value}`}
                    />
                </div>
            );


        })
        return ImageArr;
    }
    return (
        <div className="home-lunbo">
            <Carousel {...lunboSetting} >
                {this.renderImages(props.data)}
            </Carousel>
        </div>
    );
}
CarouselMap.propTypes = {
    data: PropTypes.object
}
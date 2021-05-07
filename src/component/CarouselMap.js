import React from 'react'
// import '../public/css/App.css'
import Carousel from "antd/es/carousel";
import '../public/css/Home.css'
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {Card} from "antd";
import {util} from "../common/Util";
import PropTypes from "prop-types";
import Image from "antd/es/image";
import {UpLoadFile} from "./UpLoadFile";

const localContext = require('../cache/LocalContext');
export class CarouselMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentStyle:{
                height: '40%',
                color: '#fff',
                lineHeight: '160px',
                textAlign: 'center',
                background: '#364d79',
            },
        }
    }

    renderSources = (sources,contentStyle) => {
        let resourceArr = sources.split(";");
        if (resourceArr.length < 1) return (
            <Image
                key={sources}
                // src={`https://192.168.1.7:3039/${resourceArr}`}
                src={`${urlsUtil.image.get}?file=${sources}`}
                width={480}
                height={240}
                alt={sources}
                //style={contentStyle}
            />
        );
        return resourceArr.map( (source,index,sources) => {
            return (
                <Image
                    key={index}
                    // src={`https://192.168.1.7:3039/${source}`}
                    src={`${urlsUtil.image.get}?file=${source}`}
                    width={480}
                    height={240}
                    alt={source}
                    //style={contentStyle}
                />
            );
        });
    }

    /*renderSources = (sources,contentStyle) => {
        if (!sources) return null;
        let resourceArr = sources.split(";");
        console.log(sources)
        console.log(resourceArr)
        if (resourceArr.length < 1) return (
            <div key={resourceArr}>
                <Image
                    key={resourceArr}
                    src={`${urlsUtil.image.get}?file=${resourceArr}`}
                />
            </div>
        );
        console.log(resourceArr)
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
    }*/




    render() {
        const {contentStyle} = this.state;
        const {sources, user, isEditMode} = this.props;
        return (
            <div className='carouselMap' style={{width:'60%',height:'40%'}}>
                {
                    isEditMode ?
                        (
                            <UpLoadFile
                                action={urlsUtil.image.upload}
                                getFileList={this.props.getFileList}
                                isEditMode={this.state.isEditMode}
                                maxLength={8}
                            />
                        ) :
                        (
                            <Carousel autoplay={this.props.autoPlay}>
                                {this.renderSources(sources,contentStyle)}
                            </Carousel>
                        )
                }
            </div>
        );
    }
}
CarouselMap.propTypes = {
    sources: PropTypes.array,
    user: PropTypes.object,
    isEditMode: PropTypes.bool,
    getFileList: PropTypes.func,
    autoPlay: PropTypes.bool
}
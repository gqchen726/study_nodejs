import React from 'react'
// import '../public/css/App.css'
import Carousel from "antd/es/carousel";
import '../public/css/Home.css'
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import PropTypes from "prop-types";
import Image from "antd/es/image";
import {UpLoadFile} from "./UpLoadFile";
import { Resources } from 'grommet-icons';
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

    renderSources = (sources,imageSize) => {
        if(Resources === null) {
            return null;
        }
        let resourceArr = sources.split(";");
        if (resourceArr.length < 1) return (
            <Image
                key={sources}
                // src={`https://192.168.1.7:3039/${resourceArr}`}
                src={`${urlsUtil.image.get}${sources}`}
                width={imageSize.width}
                height={imageSize.height}
                alt={sources}
                //style={contentStyle}
            />
        );
        return resourceArr.map( (source,index,sources) => {
            return (
                <Image
                    key={index}
                    // src={`https://192.168.1.7:3039/${source}`}
                    src={`${urlsUtil.image.get}${source}`}
                    width={imageSize.width}
                    height={imageSize.height}
                    alt={source}
                    //style={contentStyle}
                />
            );
        });
    }

    sourcesToFileList = (sources) => {
        if(sources === null) {
            return null;
        }
        sources = sources.split(";");
        sources = sources.map( (value, index) => {
            return ({
                uid: index,
                name: value,
                status: 'done',
                url: `${urlsUtil.image.get}${value}`
              })
        })
        return sources;
    }




    render() {
        const {sources, imageSize, isEditMode} = this.props;
        const fileList = this.sourcesToFileList(sources);
        return (
            <div className='carouselMap' style={{width:'60%',height:'40%'}}>
                {
                    isEditMode ?
                        (
                            <UpLoadFile
                                fileList={fileList}
                                action={urlsUtil.image.upload}
                                getFileList={this.props.getFileList}
                                isEditMode={this.state.isEditMode}
                                maxLength={8}
                            />
                        ) :
                        (
                            <Carousel autoplay={this.props.autoPlay}>
                                {this.renderSources(sources,imageSize)}
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
    autoPlay: PropTypes.bool,
    imageSize: PropTypes.object
}
import React from 'react'
// import '../public/css/App.css'
import '../public/css/Home.css'
import {Image} from "grommet";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import '../public/css/Home.css'
import {UpLoadFile} from "../component/UpLoadFile";
import PropTypes from "prop-types";
import {Box} from "grommet/es6";
import Carousel from "antd/es/carousel";

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
        let resourceArr = sources.split(";");
        if (resourceArr.length < 1) return (
            <Box height={imageSize.height} width={imageSize.width}>
                <Image
                    key={sources}
                    // src={`https://192.168.1.7:3039/${source}`}
                    src={`${urlsUtil.image.get}${sources}`}
                    alt={sources}
                />
            </Box>
        );
        return resourceArr.map( (source,index,sources) => {
            return (
                <Box height={imageSize.height} width={imageSize.width}>
                    <Image
                        key={index}
                        // src={`https://192.168.1.7:3039/${source}`}
                        src={`${urlsUtil.image.get}${source}`}
                        alt={source}
                    />
                </Box>
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
                    src={`${urlsUtil.image.get}${resourceArr}`}
                />
            </div>
        );
        console.log(resourceArr)
        let ImageArr = resourceArr.map((value,index) => {
            console.log(`${urlsUtil.image.get}${value}`)
            return (
                <div key={index}>
                    <Image
                        key={index}
                        src={`${urlsUtil.image.get}${value}`}
                    />
                </div>
            );


        })
        return ImageArr;
    }*/




    render() {
        const {contentStyle} = this.state;
        const {sources, imageSize, isEditMode} = this.props;
        return (
            <div className='carouselMap' style={{alignItems: "center"}}>
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
    imageSize: PropTypes.object
}
import React from 'react'
// import '../public/css/App.css'
import '../public/css/Home.css'
import {Image} from "grommet";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {Card} from "antd";
import {util} from "../common/Util";
import {UpLoadFile} from "../component/UpLoadFile";
import PropTypes from "prop-types";
import {MyResult} from "../component/MyResult";
import {Box, Carousel} from "grommet/es6";

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
                key={resourceArr}
                // src={`https://192.168.1.7:3039/${resourceArr}`}
                src={`${urlsUtil.image.get}?file=${resourceArr}`}
                width={60}
                height={120}
                alt={resourceArr}
                //style={contentStyle}
            />
        );
        return resourceArr.map( (source,index,sources) => {
            return (
                <Image
                    key={index}
                    // src={`https://192.168.1.7:3039/${source}`}
                    src={`${urlsUtil.image.get}?file=${source}`}
                    width={60}
                    height={60}
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
            <Box height="small" width="medium" overflow="hidden">
                <Carousel fill>
                    <Image fit="cover" src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg" />
                    <Image fit="cover" src="//v2.grommet.io/assets/IMG_4245.jpg" />
                    <Image fit="cover" src="//v2.grommet.io/assets/IMG_4210.jpg" />
                </Carousel>
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
                            <Carousel fill>
                                {this.renderSources(sources,contentStyle)}
                            </Carousel>
                        )
                }
            </Box>
        );
    }
}
CarouselMap.propTypes = {
    sources: PropTypes.array,
    user: PropTypes.object,
    isEditMode: PropTypes.bool,
    getFileList: PropTypes.func
}
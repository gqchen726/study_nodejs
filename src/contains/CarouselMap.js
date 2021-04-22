import React from 'react'
// import '../public/css/App.css'
import Carousel from "antd/es/carousel";
import '../public/css/Home.css'
import {Image} from "grommet";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {Card} from "antd";
import {util} from "../common/Util";
import {UpLoadFile} from "../component/UpLoadFile";

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
            isEditMode: false
        }
    }

    renderSources = (sources,contentStyle) => {
        return sources.map( (source,index,sources) => {
            return (
                <Image
                    key={index}
                    src={`${urlsUtil.image.get}?file=${source.src}`}
                    width={60}
                    height={60}
                    alt={source.description}
                    //style={contentStyle}
                />
            );
        });
    }

    getFileList = (fileList) => {
        this.setState({
            fileList:fileList
        })
    }

    changeEditMode = () => {
        this.setState({
            isEditMode:!this.state.isEditMode,
        })
    }

    render() {
        const {contentStyle, isEditMode} = this.state;
        const {sources, user} = this.props;
        return (
            <div className='carouselMap' style={{width:'60%',height:'40%'}}>

                <Card
                    extra={
                        util.returnMode(user, true, isEditMode,this.changeEditMode)
                    }
                >
                    {
                        isEditMode ?
                            (
                                <UpLoadFile
                                    action={urlsUtil.image.upload}
                                    getFileList={this.getFileList}
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
                </Card>
            </div>
        );
    }
}
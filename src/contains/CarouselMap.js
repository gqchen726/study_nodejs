import React from 'react'
// import '../public/css/App.css'
import Carousel from "antd/es/carousel";
import '../public/css/Home.css'

const localContext = require('../cache/LocalContext');
export class CarouselMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentStyle:{
                height: '160px',
                color: '#fff',
                lineHeight: '160px',
                textAlign: 'center',
                background: '#364d79',
            }
        }
    }


    render() {
        const {contentStyle} = this.state;
        return (
            <div className='carouselMap' style={{width:'60%'}}>
                <Carousel autoplay={this.props.autoPlay}>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </div>
        );
    }
}
import React from 'react'
// import '../public/css/App.css'
import {Link} from "react-router-dom";
import Image from "antd/es/image";
import Meta from "antd";
import Card from "antd";


const localContext = require('./../cache/localContext');
export class DataShowCard extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        let {data} = this.props;
        return (
            <div className='dataShowCard' >

                <Image
                    style={this.props.style}
                    src={data.imageSrc}
                />
                <Link to={'/dataInfo'}>
                    {/*{this.props.dataName}*/}
                    {data.name}
                </Link>
            </div>
        );
    }
}
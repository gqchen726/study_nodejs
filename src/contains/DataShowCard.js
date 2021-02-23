import React from 'react'
// import '../public/css/App.css'
import {Link} from "react-router-dom";
import Image from "antd/es/image";


const localContext = require('../cache/LocalContext');
export class DataShowCard extends React.Component {
    constructor(props) {
        super(props);
    }




    render() {
        return (
            <div className='dataShowCard' >

                <Image
                    style={this.props.style}
                    src={this.props.imageSrc}
                />
                <Link to={'/dataInfo'}>
                    {/*{this.props.dataName}*/}
                    大同古城墙
                </Link>
            </div>
        );
    }
}
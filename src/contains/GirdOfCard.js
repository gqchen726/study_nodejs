import React from 'react'
import '../public/css/DataShowGrid.css'
import {Input} from "antd";
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

import '../public/css/DataShowGrid.css'

export class GirdOfCard extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCardGirds = (datas) => {
        let cardGirds = datas.map((data,index) => {
            return (
                <Card.Grid key={index} className={"GirdOfCard"} >
                    <Link to={`/dataInfo?key=${index}`}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title={data.name.value} description={data.description.value} />
                        </Card>
                    </Link>
                </Card.Grid>
            );
        })
        return cardGirds;
    }

    render() {
        let datas = this.props;
        return (
            <Card className={'resultShow'} title={"result"} >
                {this.renderCardGirds(datas.datas)}
            </Card>
        );
    }
}
GirdOfCard.propTypes = {
    datas:PropTypes.array
}
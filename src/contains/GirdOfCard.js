import React from 'react'
import '../public/css/DataShowGrid.css'
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

import '../public/css/DataShowGrid.css'
import {withRouter} from "react-router";
import {arrayUtils} from "../common/ArrayUtils";
import {RichFooter} from "../component/RichFooter";

export class GirdOfCard extends React.Component {
    constructor(props) {
        super(props);
    }

    renderAllCardGirds = (datas,currentPage) => {
        if (!datas) return;
        let cardGirds = datas.map((data,index) => {
            return (
                <Card.Grid key={index} className={"GirdOfCard"} >
                    <Link to={{
                        pathname: `/dataInfo/${index}`,
                        // search: `/${index}`,
                    }}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title={data.productName} description={data.description} />
                        </Card>
                    </Link>
                </Card.Grid>
            );
        })
        let cardGirdOfSplitPage = [];
        for (let i = 0; i <cardGirds.size(); i++) {
                let page = i / 8;
                cardGirdOfSplitPage[page] = cardGirds[i];
        }

        return cardGirdOfSplitPage[currentPage];
    }

    renderCurrentCardGirds = (datas) => {
        if (!datas) return;
        let cardGirds = datas.map((data,index) => {
            let imgs = arrayUtils.split(data.resources,";");
            let {productCode} = data;
            return (
                
            <Card.Grid key={index} className={"GirdOfCard"} >
                <RichFooter product={data} user={this.props.user} />
            </Card.Grid>
            );
        })

        return cardGirds;
    }


    render() {
        let {datas} = this.props;
        let {currentPage} = this.props;

        return (
            <Card className={'resultShow'} title={"检索结果"} >
                {
                    this.renderCurrentCardGirds(datas)
                    // this.getCardGirds(datas,currentPage)
                }
                <br /><br /><br /><br />
            </Card>
        );
    }
}
export const GirdOfCardW =  withRouter(GirdOfCard);
GirdOfCard.propTypes = {
    datas:PropTypes.array
}
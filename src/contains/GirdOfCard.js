import React from 'react'
import '../public/css/DataShowGrid.css'
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

import '../public/css/DataShowGrid.css'
import {withRouter} from "react-router";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {arrayUtils} from "../common/ArrayUtils";

export class GirdOfCard extends React.Component {
    constructor(props) {
        super(props);
    }

    renderAllCardGirds = (datas,currentPage) => {
        if (!datas) return;
        console.log(datas)
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
        // let datasSplitPage = this.getDatasSplitPage(datas);
        if (!datas) return;
        let cardGirds = datas.map((data,index) => {
            let imgs = arrayUtils.split(data.resources,";");
            console.log(imgs)
            return (
                <Card.Grid key={index} className={"GirdOfCard"} >
                    <Link to={{
                        pathname: `/dataInfo/${index}`,
                        // search: `/${index}`,
                    }}>
                        <Card
                            hoverable
                            cover={<img width={261} height={327} alt="example" src={(!!imgs && imgs.length>0) ? `${urlsUtil.image.get}?file=${imgs[0]}` : "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"} />}
                        >
                            <Meta title={data.productName} description={data.productCode} />
                        </Card>
                    </Link>
                </Card.Grid>
            );
        })

        return cardGirds;
    }


    render() {
        let {datas} = this.props;
        let {currentPage} = this.props;

        return (
            <Card className={'resultShow'} title={"result"} >
                {
                    this.renderCurrentCardGirds(datas)
                    // this.getCardGirds(datas,currentPage)
                }
                <br /><br /><br /><br />
            </Card>
            // <Switch>
            //     <Card className={'resultShow'} title={"result"} >
            //         {this.renderCardGirds(datas)}
            //     </Card>
            //     {/*<Route exact path="/dataInfo/:key" >*/}
            //     {/*    <DataInfoW data={this.state.datas} user={this.props.user} />*/}
            //     {/*</Route>*/}
            // </Switch>
        );
    }
}
export const GirdOfCardW =  withRouter(GirdOfCard);
GirdOfCard.propTypes = {
    datas:PropTypes.array
}
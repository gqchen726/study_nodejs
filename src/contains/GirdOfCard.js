import React from 'react'
import '../public/css/DataShowGrid.css'
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

import '../public/css/DataShowGrid.css'
import {withRouter} from "react-router";

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
                            <Meta title={data.name} description={data.description} />
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
        console.log(cardGirdOfSplitPage);
        return cardGirdOfSplitPage[currentPage];
    }

    renderCurrentCardGirds = (datas) => {
        // let datasSplitPage = this.getDatasSplitPage(datas);
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
                            <Meta title={data.name} description={data.description} />
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
        console.log(this)
        return (
            <Card className={'resultShow'} title={"result"} >
                {
                    this.renderCurrentCardGirds(datas)
                    // this.getCardGirds(datas,currentPage)
                }
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
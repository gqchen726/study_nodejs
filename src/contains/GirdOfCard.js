import React from 'react'
import '../public/css/DataShowGrid.css'
import {Input} from "antd";
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";

export class GirdOfCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card title={"result"} >
                <Card.Grid className={"GirdOfCard"} >
                    <Card
                        hoverable
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Card.Grid>
                <Card.Grid className={"GirdOfCard"} >
                    <Card
                        hoverable
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Card.Grid>
                <Card.Grid className={"GirdOfCard"} >
                    <Card
                        hoverable
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Card.Grid>
                <Card.Grid className={"GirdOfCard"} >
                    <Card
                        hoverable
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </Card.Grid>
            </Card>
        );
    }
}
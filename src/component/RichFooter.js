import React from 'react';

import {
    Anchor,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Collapsible,
    Grommet,
    Paragraph,
} from 'grommet';

import { FormDown, FormUp, Favorite, ShareOption } from 'grommet-icons';
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {Image} from "grommet/es6";
import axios from "axios";
import {util} from "../common/Util";

const theme = {
    global: {
        font: {
            family: `Comic Sans MS, -apple-system,
         BlinkMacSystemFont, 
         "Segoe UI", 
         Roboto`,
        },
    },
    card: {
        elevation: 'none',
        background: 'light-2',
        footer: {
            pad: 'medium',
        },
    },
};

export class RichFooter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            favorite: false,
        }
    }

    setOpen = (open) => {
        this.setState({
            open: open
        })
    }

    componentWillMount() {
        if(!this.props.user) return ;
        axios.get(`${urlsUtil.collection.getAllCollection}?mobileNumber=${this.props.user.mobileNumber}`).then((response) => {
            let body = response.data.body;
            body.map((collection) => {
                if (collection.productCode === this.props.product.productCode) {
                    setTimeout(() => {
                        this.setState({
                            favorite:true
                        })
                    },0)
                }
            })
        })
    }

    setFavorite = (favorite,productCode) => {
        if (!this.props.user) util.tipMessage("收藏提示","您未登录，请先登陆后重试")
        let url = favorite ? urlsUtil.collection.addCollection:urlsUtil.collection.deleteCollection;
        axios.post(url,{productCode:productCode,mobileNumber:this.props.user.mobileNumber}).then(res => {
            if (res.data.code) {
                setTimeout(() => {
                    this.setState({
                        favorite: favorite
                    })
                },0)
            }
            util.tipMessage("收藏提示",res.data.message)
        }).catch( err => {
            util.tipMessage("收藏提示",err)
        })
    }


    render() {
        let {favorite, open} = this.state;
        let {product} = this.props;
        const Icon = open ? FormUp : FormDown;
        const rows = 5;
        const expandable = false;
        const ellipsis = true;
        return (
            <Grommet theme={theme}>
                <Box pad="medium" align="start">
                    <Card elevation="large" width="medium">
                        <CardBody height={{"min": "0px", "max": "183px"}}>
                            {/*<Image
                                fit="cover"
                                src={product.resources ? `${urlsUtil.image.get}?file=${product.resources.split(";")[0]}`:null}
                                a11yTitle={product.productName}
                            />*/}
                            {/*<Image
                                key={product.resources}
                                src={product.resources ? `${urlsUtil.image.get}?file=${product.resources.split(";")[0]}`:null}
                                width={249}
                                height={183}
                                alt={product.resources}
                                //style={contentStyle}
                            />*/}
                            <Image
                                key={product.resources}
                                src={product.resources ? `${urlsUtil.image.get}?file=${product.resources.split(";")[0]}`:null}
                                fill={true}
                                fit="cover"
                                alignSelf='center'
                            />
                        </CardBody>
                        <Box pad={{ horizontal: 'medium' }} responsive={false}>

                            {/*<Anchor
                                href={`/#/dataInfo/${product.productCode}`}
                                label={product.productName}
                            >
                                <Heading level="3" margin={{ vertical: 'medium' }}>
                                    {product.productName}
                                </Heading>
                            </Anchor>*/}
                            <br />
                            <Paragraph margin={{ top: 'none' }}>
                                {product.productName}
                            </Paragraph>
                        </Box>
                        <CardFooter>
                            <Box direction="row" align="center" gap="small">
                                <Button
                                    icon={<Favorite color={favorite ? 'red' : undefined} />}
                                    hoverIndicator
                                    onClick={() => this.setFavorite(!favorite,product.productCode)}
                                />
                                {/*<Button icon={<ShareOption color="plain" />} hoverIndicator />*/}
                                <Anchor
                                    href={`/#/dataInfo/${product.productCode}`}
                                    label="See More"
                                />
                            </Box>
                            {/*<Button
                                hoverIndicator="light-4"
                                icon={<Icon color="brand" />}
                                onClick={() => this.setOpen(!open)}
                            />*/}
                        </CardFooter>
                        <Collapsible open={open}>
                            {/*<Paragraph margin="medium" color="dark-3">
                                {product.description}
                            </Paragraph>*/}
                            {/*<Paragraph
                                margin="medium"
                                color="dark-3"
                                ellipsis={{ rows, expandable }}
                                copyable={true}
                                editable={false}
                            >
                                {product.description}
                            </Paragraph>*/}
                            <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                                {product.description}
                            </Paragraph>
                        </Collapsible>
                    </Card>
                </Box>
            </Grommet>
        );
    }

}
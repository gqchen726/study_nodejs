import React from 'react'
import {CarouselMap} from "../contains/CarouselMap";
import {Card} from "antd";
import {Button, Carousel, notification} from "antd/es";
import PropTypes from 'prop-types'
import {MyDescriptions} from "./MyDescriptions";
import {
    Link,
    withRouter
} from "react-router-dom";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import Image from "antd/es/image";


const localContext = require('../cache/LocalContext');
export class DataInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
        }
    }

    componentWillMount() {
        let {datas} = this.props;
        let {key} = this.props.match.params
        let data = datas[key];
        this.state.product = data;
    }

    onClickHandler = () => {
        let {isEditMode} = this.state;
        let {product} = this.state;

        if (isEditMode) {
            if (!product) {
                return ;
            }
            this.setState({
                isLoading: true
            })
            axios.post(urlsUtil.product.updateUrl,product).then((response) => {
                let responseBody = response.data;
                console.log(response)

                this.changeEditMode();
                if (!responseBody.code) {
                    this.setState({
                        product : responseBody.body,
                    })
                } else {
                    notification.open({
                        message: 'save info tips',
                        description: responseBody.message
                    });
                }
            }).catch((error) => {
                console.log(error)
                notification.open({
                    message: 'save info tips',
                    description: error.toString()
                });
            })
            this.setState({
                isLoading: false
            })
        } else {
            this.changeEditMode();
        }
    }

    onRemove = () => {
        let {productCode} = this.state.product;
        console.log(productCode)
        axios.get(`${urlsUtil.product.removeUrl}?productCode=${productCode}`).then((response) => {
            let responseBody = response.data;
            console.log(response)

            this.changeEditMode();
            notification.open({
                message: 'remove info tips',
                description: responseBody.message
            });
        }).catch((error) => {
            console.log(error)
            notification.open({
                message: 'remove info tips',
                description: error.toString()
            });
        })
    }

    changeEditMode = () => {
        this.setState({
            isEditMode:!this.state.isEditMode,
        })
    }

    saveNewDescriptered = (newDescriptered) => {
        this.setState({
            newDescriptered : newDescriptered
        })
    }

    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    returnMode = (user,isAdminSpecific,isEditMode) => {
        if (!isAdminSpecific) {
            return (!user)?
                null:(<div>
                    <Button type={"primary"} onClick={this.onClickHandler} >{isEditMode ? "保存":"编辑 "}</Button>
                    {/*<br />{isEditMode ? <Button type={"primary"} onClick={this.onRemove} >删除</Button> : null}*/}
                </div>)
        } else if (isAdminSpecific) {
            return (!!user && user.admin)?
                (<div>
                    <Button type={"primary"} onClick={this.onClickHandler} >{isEditMode ? "保存":"编辑 "}</Button>
                    {/*<br />{isEditMode ? <Button type={"primary"} onClick={this.onRemove} >删除</Button> : null}*/}
                </div>):null
        }
    }

    renderImages = (data) => {
        let {resources} = data;
        //模拟数据
        // if (!resources) resources = "todoApi.png;todoApi3.png;todoApi2.png;todoApi1.png"
        if (!resources) return null;
        let resourceArr = resources.split(";");
        let ImageArr = resourceArr.map((value,index) => {
            console.log(`${urlsUtil.image.get}?file=${value}`)
            return (
                <div key={index}>
                    <Image
                        key={index}
                        src={`${urlsUtil.image.get}?file=${value}`}
                        //width={}
                    />
                </div>
            );


        })
        return ImageArr;
    }


    render() {

        let {datas} = this.props;
        let {key} = this.props.match.params
        let data = datas[key];
        let {user} = this.props;
        let isAdminSpecific = true;
        let {isEditMode} = this.state;

        if (!data) {
            return null;
        }
        const lunboSetting = {
            dots: true,
            lazyLoad: true,
            autoplay:true,
        };
        // let columns = ["name","age","gender","birth","mobileNumber","email","address","registerCode"];
        return (
            <div className='dataInfo'>
                {/*数据详情信息展示面板*/}
                <Card
                    title={data.name}
                    extra={
                        this.returnMode(user,isAdminSpecific,isEditMode)
                    }
                >
                    {/*跑马灯*/}
                    <div className="home-lunbo">
                        <Carousel {...lunboSetting} >
                            {this.renderImages(data)}
                        </Carousel>
                    </div>

                    <MyDescriptions
                        title={"产品信息"}
                        layout={"horizontal"}
                        bordered={true}
                        descriptered={data}
                        isAdminSpecific={true}
                        isEditMode={this.state.isEditMode}
                        saveNewDescriptered={this.saveNewDescriptered}
                    />
                </Card>
                {/*用户操作面板*/}
                <Card>
                    <Button
                        style={{width:'10%'}}
                        onClick={this.search}
                    >
                        <span
                            style={{font:{size:'11px'}}}
                        >
                            <Link to={`/result${404}`} >收藏</Link>
                        </span>
                    </Button>
                    <Button
                        style={{width:'10%'}}
                        onClick={this.search}
                    >
                        <span
                            style={{font:{size:'11px'}}}
                        >
                            <Link to={`/orderGenerate/${key}`} >购买</Link>
                        </span>
                    </Button>
                </Card>
            </div>
        );
    }
}
export const DataInfoW =  withRouter(DataInfo);

DataInfo.propTypes = {
    user:PropTypes.object,
    data:PropTypes.any,
}

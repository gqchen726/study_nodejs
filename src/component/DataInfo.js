import React from 'react'
import {CarouselMap} from "./CarouselMap";
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
import {selectOneProduct} from "../utils/SelectAnProductFromCode";
import {util} from "../common/Util";
import Space from "antd/es/space";
import {DeleteTwoTone, EditOutlined, SaveOutlined} from "@ant-design/icons"
import {Resources} from "grommet-icons";

export class DataInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: false,
        }
    }

    componentWillMount() {
        // try {
        //     let {datas} = this.props;
        //     let {key} = this.props.match.params
        //     let data = datas[key];
        //     this.state.product = data;
        // } catch (error) {
        //     // let productCode = this.props.match.params.key
        //     // axios.get(`${urlsUtil.product.searchFromCode}?id=${productCode}`).then(
        //     //     (response) => {
        //     //         let product = response.data.body;
        //     //         this.setState({
        //     //             product: product
        //     //         })
        //     //     }
        //     // )
        //
        // }
        let productCode = this.props.match.params.key
        selectOneProduct(productCode).then(
            (response) => {
                let product = response.data.body;
                this.setState({
                    product: product,
                    oldResources: product.resources
                })
            }
        );
    }

    onClickHandler = () => {
        let {isEditMode} = this.state;
        let {product} = this.state;

        let {fileList} = this.state;

        if (isEditMode) {
            this.setFileResources(fileList);
            if (!product) {
                return ;
            }
            this.setState({
                isLoading: true
            })
            axios.post(urlsUtil.product.updateUrl,product).then((response) => {
                let responseBody = response.data;
                if (responseBody.code === 0) {
                    this.changeEditMode();
                    this.setState({
                        product : responseBody.body,
                    })
                } else {
                    util.tipMessage('save info tips',responseBody.message)
                }
            }).catch((error) => {
                util.tipMessage('save info tips',error.toString())
            })
            this.setState({
                isLoading: false
            })
        } else {
            this.changeEditMode();
        }
    }

    setFileResources = (fileList) => {
        let {resources} = this.state.product;
        if (Array.isArray(fileList)) {
            fileList.forEach((value, index) => {
                let reSource = value.response.body;
                console.log(value)
                if (resources == null && index === 0) {
                    resources = reSource;
                } else {
                    resources += `;${reSource}`
                }
            })
        }
        let {product} = this.state;
        product.resources = resources;
        this.setState({
            product:product
        })
    }

    getFileList = (fileList) => {
        this.setState({
            fileList:fileList
        })
    }

    onRemove = () => {
        let {productCode} = this.state.product;
        console.log(productCode)
        axios.get(`${urlsUtil.product.removeUrl}?productCode=${productCode}`).then((response) => {
            let responseBody = response.data;
            console.log(response)

            this.props.refreshMenuItems();
            this.changeEditMode();
            util.tipMessage('remove info tips',responseBody.message)
        }).catch((error) => {
            util.tipMessage('remove info tips',error.toString())
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
                    <Button icon={isEditMode? <SaveOutlined />:<EditOutlined />} type={"primary"} onClick={this.onClickHandler} >{isEditMode ? "保存":"编辑 "}</Button>
                    <br />{isEditMode ? <Button icon={<DeleteTwoTone />} type={"primary"} onClick={this.onRemove} >删除</Button> : null}
                </div>)
        } else if (isAdminSpecific) {
            return (!!user && user.admin)?
                (<div>
                    <Button icon={isEditMode? <SaveOutlined />:<EditOutlined />} type={"primary"} onClick={this.onClickHandler} >{isEditMode ? "保存":"编辑 "}</Button>
                    <br />{isEditMode ? <Button icon={<DeleteTwoTone />} type={"primary"} onClick={this.onRemove} >删除</Button> : null}
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

    deleteImage = (val) => {
        console.log(val)
        let sources = this.state.product.resources;
        console.log(sources)
        if (!sources) {
            return ;
        }
        let newSources = sources.split(";");
        let {product} = this.state;
        let newResources;
        for (let i = 0;i< newSources.length;i++) {
            let reSource = newSources[i];
            if (reSource === val) {
                continue;
            }
            if (i === 0) {
                newResources = reSource;
            } else {
                newResources += `;${reSource}`
            }
        }
        product.resources = newResources;
        setTimeout(() => {
            this.setState({
                product:product
            })
        },0)
    }

    renderDeleteImageAble = (sources) => {
        let deleteButtons = sources.split(";").map((val,i) => {
            return (
                <span>
                    <Button key={i} type="link" block icon={<DeleteTwoTone />} onClick={this.deleteImage}>
                        {val}
                    </Button>
                    {(i+1)%3 === 0 ? <br />:null}
                </span>
            );
        });
        return (
            <Space style={{ marginBottom: 8 }}>
                {deleteButtons}
            </Space>
        );
    }

    renderCarouselMap = (isEditMode,sources) => {

        if (!sources && !isEditMode) return null
        return (
            <div>
                <span>
                    {
                        isEditMode ?
                            this.renderDeleteImageAble(sources):null
                    }
                </span>
                <CarouselMap
                    getFileList={this.getFileList}
                    isEditMode={isEditMode}
                    sources={sources}
                    user={this.props.user}
                    autoPlay={true}
                    imageSize={{width:480,height:240}}
                />
            </div>
        );
    }

    addCollection = () => {
        axios.post(urlsUtil.collection.addCollection,{productCode:this.state.product.productCode,mobileNumber:this.props.user.mobileNumber}).then(res => {
            util.tipMessage("收藏提示",res.data.message)
        }).catch( err => {
            util.tipMessage("收藏提示",err)
        })
    }



    render() {

        let {user} = this.props;
        let isAdminSpecific = true;
        let {isEditMode, product} = this.state;




        if (!product) {
            return <div>
                data is null;
            </div>
        }
        console.log(product)
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
                    title={product.name ? product.name:product.productName}
                    extra={
                        this.returnMode(user,isAdminSpecific,isEditMode)
                    }
                >
                    {/*跑马灯*/}
                    {/*{product.resources|isEditMode?this.renderCarouselMap(isEditMode,product.resources):null}*/}
                    {
                        this.renderCarouselMap(isEditMode,product.resources)
                    }
                    {/*<div className="home-lunbo">
                        <Carousel {...lunboSetting} >
                            {this.renderImages(data)}
                        </Carousel>
                    </div>*/}

                    <MyDescriptions
                        title={"景点信息"}
                        layout={"horizontal"}
                        bordered={true}
                        descriptered={product}
                        isAdminSpecific={true}
                        isEditMode={this.state.isEditMode}
                        saveNewDescriptered={this.saveNewDescriptered}
                        getFileList={this.getFileList}
                    />
                </Card>
                {/*用户操作面板*/}
                <Card>
                    {/*<Button
                        style={{width:'10%'}}
                        onClick={this.addCollection}
                    >
                        收藏
                    </Button>*/}
                    <Button
                        style={{width:'10%'}}
                        onClick={this.search}
                    >
                        {
                            user && !user.admin ?
                                (
                                    <span
                                        style={{font:{size:'11px'}}}
                                    >
                                        <Link to={`/orderGenerate/${product.productCode}`} >门票预定</Link>
                                    </span>
                                ):null

                        }
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

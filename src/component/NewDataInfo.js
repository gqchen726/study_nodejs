import React from 'react'
import {Card} from "antd";
import {Button, Carousel, notification} from "antd/es";
import PropTypes from 'prop-types'
import {MyDescriptions} from "./MyDescriptions";
import {
    withRouter
} from "react-router-dom";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {UpLoadFile} from "./UpLoadFile";
import Image from "antd/es/image";
import {util} from "../common/Util";
import {CarouselMap} from "./CarouselMap";
import {SaveOutlined,EditOutlined} from "@ant-design/icons";

export class NewDataInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditMode: true,
            isLoading: false,
            newData: {
                category: "",
                description: "",
                ex: "",
                price: "",
                productCode: "",
                productName: "",
            },
            isInitStatus: true
        }
    }


    onClickHandler = () => {
        let {fileList} = this.state;
        let {isEditMode} = this.state;
        let {newData} = this.state;

        if (isEditMode) {
            this.setFileResources(fileList);
            newData = this.state.newData;
            if (!newData) {
                return ;
            }
            this.setState({
                isLoading: true
            })
            axios.post(this.state.isInitStatus ?urlsUtil.product.addUrl:urlsUtil.product.updateUrl,newData).then((response) => {
                let responseBody = response.data;
                if (responseBody.code === 0) {
                    setTimeout(() => {
                        this.changeEditMode();
                        this.setState({
                            newData : responseBody.body,
                            isInitStatus: false,
                        })
                    },0)
                    // this.changeEditMode();
                }
                this.props.refreshMenuItems();
                util.tipMessage('save info tips',responseBody.message)
            }).catch((error) => {
                util.tipMessage("save info tips",error.toString())
            })
            this.setState({
                isLoading: false
            })
        } else {
            this.changeEditMode();
        }
    }

    getFileList = (fileList) => {
        this.setState({
            fileList:fileList
        })
    }
    setFileResources = (fileList) => {
        let resources;
        if (Array.isArray(fileList)) {
            fileList.forEach((value, index) => {
                let reSource = value.response.body;
                console.log(value)
                if (index === 0) {
                    resources = reSource;
                } else {
                    resources += `;${reSource}`
                }
            })
        }
        let {newData} = this.state;
        newData.resources = resources;
        this.setState({
            newData:newData
        })
    }

    changeEditMode = () => {
        this.setState({
            isEditMode:!this.state.isEditMode,
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
                null:<Button icon={isEditMode? <SaveOutlined />:<EditOutlined />} type={"primary"} onClick={this.onClickHandler} >{isEditMode ? "保存":"编辑 "}</Button>
        } else if (isAdminSpecific) {
            return (!user || !user.admin === "admin")?
                null:<Button icon={isEditMode? <SaveOutlined />:<EditOutlined />} type={"primary"} onClick={this.onClickHandler} >{isEditMode ? "保存":"编辑 "}</Button>
        }
    }

    saveNewDescriptered = (newDescriptered) => {
        this.setState({
            newDescriptered : newDescriptered
        })
    }

    renderImages = (data) => {
        let {resources} = data;
        let resourceArr = resources.split(";");
        if (resourceArr.length <= 1) return;
        let ImageArr = resourceArr.map((value,index) => {
            return <Image key={index} src={value} />;
        })
        return ImageArr;
    }

    renderCarouselMap = (isEditMode,sources) => {
        if (isEditMode) {
            return null;
        } else {
            return (
                // <CarouselMap autoPlay={true}>
                //     {this.renderImages(newData)}
                // </CarouselMap>
                // <CarouselMap sources={newData} />
                <CarouselMap
                    getFileList={this.getFileList}
                    isEditMode={isEditMode}
                    sources={sources}
                    user={this.props.user}
                    autoPlay={true}
                    imageSize={{width:480,height:240}}
                />
            );
        }
    }

    renderUpLoadFile = (isEditMode) => {
        if (isEditMode) {
            return (
                <div>
                    <br />
                    <br />
                    <span>
                        上传景区风景图片
                    </span>
                    <UpLoadFile
                        action={urlsUtil.image.upload}
                        getFileList={this.getFileList}
                        isEditMode={this.state.isEditMode}
                        maxLength={8}
                    />
                </div>
            );
        } else {
            return null;
        }

    }


    render() {

        let {newData} = this.state;
        let {user} = this.props;
        let {isAdminSpecific} = this.props;
        let {isEditMode} = this.state;

        if (!newData) {
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
                    title={newData.name}
                    extra={
                        this.returnMode(user,isAdminSpecific,isEditMode)
                    }
                >
                    {/*跑马灯*/}
                    {newData.resources?this.renderCarouselMap(isEditMode,newData.resources):null}

                    {/*跑马灯*/}
                    {/*<div className="home-lunbo">
                        <Carousel {...lunboSetting} >
                            {this.renderImages(data)}
                        </Carousel>
                    </div>*/}

                    <MyDescriptions
                        title={"景点信息"}
                        layout={"horizontal"}
                        bordered={true}
                        descriptered={newData}
                        isAdminSpecific={true}
                        isEditMode={this.state.isEditMode}
                        saveNewDescriptered={this.saveNewDescriptered}
                        getFileList={this.getFileList}
                    />
                    {
                        this.renderUpLoadFile(isEditMode)
                    }
                </Card>
                {/*用户操作面板*/}
                {/*<Card>*/}
                {/*    <Button*/}
                {/*        style={{width:'10%'}}*/}
                {/*        onClick={this.search}*/}
                {/*    >*/}
                {/*        <span*/}
                {/*            style={{font:{size:'11px'}}}*/}
                {/*        >*/}
                {/*            <Link to={`/result${404}`} >收藏</Link>*/}
                {/*        </span>*/}
                {/*    </Button>*/}
                {/*    <Button*/}
                {/*        style={{width:'10%'}}*/}
                {/*        onClick={this.search}*/}
                {/*    >*/}
                {/*        <span*/}
                {/*            style={{font:{size:'11px'}}}*/}
                {/*        >*/}
                {/*            <Link to={`/orderGenerate/${key}`} >购买</Link>*/}
                {/*        </span>*/}
                {/*    </Button>*/}
                {/*</Card>*/}
            </div>
        );
    }
}
export const NewDataInfoW =  withRouter(NewDataInfo);

NewDataInfoW.propTypes = {
    data:PropTypes.any,
    isAdminSpecific: PropTypes.bool,
    user: PropTypes.object
}

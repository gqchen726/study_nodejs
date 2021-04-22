import React from 'react'
import Descriptions from "antd/es/descriptions";
import PropTypes from 'prop-types'
import Image, {Input} from "antd";
import {MyDatePicker} from "./MyDatePicker";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {UpLoadFile} from "./UpLoadFile";

export class MyDescriptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            descriptered: props.descriptered
        }
    }

    /**
     * 自动收集表单信息并注入到user对象中
     * @param event
     */
    autoSave = (event) => {
        let value = event.target.value;
        let id = event.target.id;
        let {descriptered} = this.state;

        if(id === "name") {
            descriptered.name = value;
        } else if(id === "mobileNumber") {
            descriptered.mobileNumber = value;
        } else if(id === "checkCode") {
            descriptered.checkCode = value;
        } else if(id === "age") {
            descriptered.age = value;
        } else if(id === "birth") {
            descriptered.birth = value;
        } else if(id === "email") {
            descriptered.email = value;
        } else if(id === "sex") {
            descriptered.sex = value;
        } else if(id === "address") {
            descriptered.address = value;
        } else if(id === "password") {
            descriptered.password = value;
        } else if(id === "rePassword") {
            descriptered.rePassword = value;
        }else if(id === "price") {
            descriptered.price = value;
        } else if(id === "description") {
            descriptered.description = value;
        } else if(id === "category") {
            descriptered.category = value;
        } else if(id === "ex") {
            descriptered.ex = value;
        } else if(id === "productCode") {
            descriptered.productCode = value;
        } else if(id === "productName") {
            descriptered.productName = value;
        }


        setTimeout(() => {
            this.setState({
                descriptered: descriptered,
            })
        },0)

        this.props.saveNewDescriptered(this.state.descriptered);

    }

    saveBirth = (data,dataString) => {
        let {descriptered} = this.state;
        descriptered.birth = dataString;
        setTimeout(() => {
            this.setState({
                descriptered: descriptered,
            })
        },0)

        this.props.saveNewDescriptered(this.state.descriptered);
    }

    renderDescItemList = (descriptered) => {
        // if (!descriptered) {
        //     return <div>please to login</div>;
        // }


        let infos = [];
        Object.getOwnPropertyNames(descriptered).forEach((col,key) => {
        if (col == "orders" || col == "souseNames" || col == "resources") {
        } else if (col == "admin" || col == "password") {
        } else if (col == "avatar") {
            infos.push(
                <Descriptions.Item
                    key={key}
                    label={col}
                >
                    <Image
                        key={key}
                        src={`${urlsUtil.image.get}?file=${descriptered[col]}`}
                        width={60}
                        height={60}
                        alt={descriptered[col]}
                    />
                </Descriptions.Item>
            );
        } else {
            infos.push(
                <Descriptions.Item
                    key={key}
                    label={col}
                >
                    {descriptered[col]}
                </Descriptions.Item>
            );
        }

        })
        return infos;
    }

    getFileList = (fileList) => {
        this.setState({
            fileList:fileList
        })
    }

    renderSpecificDescItemList = (descriptered) => {
        if (!descriptered) {
            return null;
        }


        let infos = [];
        Object.getOwnPropertyNames(descriptered).forEach((col,key) => {
            // console.log(col)
            if (col == "password" || col == "mobileNumber" || col == "admin" || col == "registerCode" || col == "admin") {
                infos.push(
                    <Descriptions.Item key={key} label={col}>
                        <Input
                            id={col}
                            value={descriptered[col]}
                            disabled={true}
                            bordered={false}
                            allowClear={true}
                            maxLength={30}
                            onChangeCapture={this.autoSave}
                        />
                    </Descriptions.Item>
                );
            } else if (col == "orders" || col == "souseNames" || col == "resources" || col == "password") {
            } else if (col == "birth") {
                infos.push(
                    <Descriptions.Item key={key} label={col}>
                        <MyDatePicker title={""} onClickHandler={this.saveBirth} fromToday={false} />
                    </Descriptions.Item>
                );
            } else if (col == "avatar") {
                infos.push(
                    <Descriptions.Item
                        key={key}
                        label={col}
                    >
                        {/*<Image
                            key={key}
                            src={`${urlsUtil.image.get}?file=${descriptered[col]}`}
                            width={60}
                            height={60}
                            alt={descriptered[col]}
                        />*/}
                        <UpLoadFile
                            maxLength={1}
                            isEditMode={true}
                            action={`${urlsUtil.image.upload}`}
                            getFileList={this.getFileList}
                        />
                    </Descriptions.Item>
                );
            } else if (col == "description") {
                //待改善，此处的描述应为文本域
                infos.push(
                    <Descriptions.Item key={key} label={col}>
                        <Input.TextArea
                            id={col}
                            value={descriptered[col]}
                            // disabled={fieldObj.isAllowEdit}
                            bordered={false}
                            maxLength={5000}
                            autoSize={true}
                            showCount={true}
                            onChangeCapture={this.autoSave}
                        />
                    </Descriptions.Item>
                );
            } else {
                infos.push(
                    <Descriptions.Item key={key} label={col}>
                        <Input
                            id={col}
                            value={descriptered[col]}
                            // disabled={fieldObj.isAllowEdit}
                            bordered={false}
                            maxLength={30}
                            onChangeCapture={this.autoSave}
                        />
                    </Descriptions.Item>
                );
            }
        })
        return infos;
    }



    render() {
        let {descriptered} = this.state;
        let {title} = this.props;
        let {bordered} = this.props;
        let {layout} = this.props;
        let {isEditMode} = this.props;
        return (
            <Descriptions
                title={title}
                layout={layout}
                bordered={bordered}
                size={"default"}
                column={1}
            >
                {
                    !isEditMode?
                        this.renderDescItemList(descriptered):
                        this.renderSpecificDescItemList(descriptered)
                }
                <Descriptions.Item key={"test"} label={"test"}>test</Descriptions.Item>
            </Descriptions>
        )
    }
}
MyDescriptions.propTypes = {
    isAdminSpecific: PropTypes.bool,
    title: PropTypes.string,
    bordered: PropTypes.bool,
    descriptered: PropTypes.object,
    //horizontal | vertical
    layout: PropTypes.string,
    saveNewDescriptered: PropTypes.func
}
MyDescriptions.defaultProps = {
    title: "template",
    bordered: false,
    isAdminSpecific: true,
    isEditMode: false
}
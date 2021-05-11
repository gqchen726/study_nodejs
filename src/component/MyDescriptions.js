import React from 'react'
import Descriptions from "antd/es/descriptions";
import PropTypes from 'prop-types'
import {Input, Select} from "antd";
import {MyDatePicker} from "./MyDatePicker";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {UpLoadFile} from "./UpLoadFile";
import Image from "antd/es/image";
import {util} from "../common/Util";
import {MyCascader} from "./MyCascader";
import Radio from "antd/es/radio";
import Text from "antd/es/typography/Text";
import Paragraph from "antd/es/typography/Paragraph";
import ellipsis from "polished";

const { Option } = Select;

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
        let name = event.target.name;
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
        } else if(name === "sex") {
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

    saveAddress = (value) => {
        let {descriptered} = this.state;
        descriptered.address = value;
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

    saveOptions = (value) => {
        let {descriptered} = this.state;
        descriptered.category = value;
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
            if (util.hasDescriptionIgnoreList(col)) {
            } else if (col == "avatar") {
                infos.push(
                    <Descriptions.Item
                        key={key}
                        label={util.codeTable(col)}
                        labelStyle={{width:"40%"}}
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
                        label={util.codeTable(col)}
                        labelStyle={{width:"40%"}}
                    >
                        <Paragraph>
                            <Text
                                style={ellipsis ? { width: 100 } : undefined}
                                ellipsis={ellipsis ? { tooltip: 'I am ellipsis now!' } : false}
                            >
                                {util.codeTable(descriptered[col])}
                            </Text>
                        </Paragraph>
                    </Descriptions.Item>
                );
            }

        })
        return infos;
    }



    renderSpecificDescItemList = (descriptered) => {
        console.log(descriptered)
        if (!descriptered) {
            return <div>data is null</div>;
        }


        let infos = [];
        Object.getOwnPropertyNames(descriptered).forEach((col,key) => {
            // console.log(col)
            if (util.hasDescriptionIgnoreList(col)) {
            } else if (col == "mobileNumber") {
                infos.push(
                    <Descriptions.Item
                        key={key}
                        label={util.codeTable(col)}
                        labelStyle={{width:"40%"}}
                    >
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
            } else if (col == "sex") {
                infos.push(
                    <Descriptions.Item
                        key={key}
                        label={util.codeTable(col)}
                        labelStyle={{width:"40%"}}
                    >
                        <Radio.Group name="sex" defaultValue={"male"} value={descriptered[col]} onChange={this.autoSave}>
                            <Radio value='male'>男</Radio>
                            <Radio value='female'>女</Radio>
                        </Radio.Group>
                    </Descriptions.Item>
                );
            } else if (col == "birth") {
                infos.push(
                    <Descriptions.Item
                        key={key}
                        label={util.codeTable(col)}
                        labelStyle={{width:"40%"}}
                    >
                        <MyDatePicker title={""} onClickHandler={this.saveBirth} fromToday={false} />
                    </Descriptions.Item>
                );
            } else if (col == "address") {
                infos.push(
                    <Descriptions.Item
                        key={key}
                        label={util.codeTable(col)}
                        labelStyle={{width:"40%"}}
                    >
                        <MyCascader saveAddress={this.saveAddress} area={descriptered[col]} />
                    </Descriptions.Item>
                );
            } else if (col == "avatar") {
                infos.push(
                    <Descriptions.Item
                        key={key}
                        label={util.codeTable(col)}
                        labelStyle={{width:"40%"}}
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
                            getFileList={this.props.getFileList}
                        />
                    </Descriptions.Item>
                );
            } else if (col == "description") {
                infos.push(
                    <Descriptions.Item
                        key={key}
                        label={util.codeTable(col)}
                        labelStyle={{width:"40%"}}
                    >
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
                    <Descriptions.Item
                        key={key}
                        label={util.codeTable(col)}
                        labelStyle={{width:"40%"}}
                    >
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
    saveNewDescriptered: PropTypes.func,
    getFileList: PropTypes.func,
    isEditMode: PropTypes.bool
}
MyDescriptions.defaultProps = {
    title: "template",
    bordered: false,
    isAdminSpecific: true,
    isEditMode: false,
}
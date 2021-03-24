import React from 'react'
import Descriptions from "antd/es/descriptions";
import PropTypes from 'prop-types'
import {Input} from "antd";

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

        console.log(descriptered)
        console.log(id)
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
        }


        setTimeout(() => {
            this.setState({
                descriptered: descriptered,
            })
        },0)

    }

    renderDescItemList = (descriptered) => {
        if (!descriptered) {
            return null;
        }


        let infos = [];
        Object.getOwnPropertyNames(descriptered).forEach((col,key) => {
            infos.push(
                <Descriptions.Item
                    key={key}
                    label={col}
                >
                    {descriptered[col]}
                </Descriptions.Item>
            );
        })
        return infos;
    }
    renderSpecificDescItemList = (descriptered) => {
        if (!descriptered) {
            return null;
        }


        let infos = [];
        Object.getOwnPropertyNames(descriptered).forEach((col,key) => {
            console.log(col)
            if (col == "password" || col == "mobileNumber" || col == "admin" || col == "registerCode") {
                infos.push(
                    <Descriptions.Item key={key} label={col}>
                        <Input
                            id={col}
                            value={descriptered[col]}
                            disabled={true}
                            bordered={false}
                            allowClear={true}
                            maxLength={20}
                            onChangeCapture={this.autoSave}
                        />
                    </Descriptions.Item>
                );
            } else if (col == "orders" || col == "souseNames") {
            } else {
                infos.push(
                    <Descriptions.Item key={key} label={col}>
                        <Input
                            id={col}
                            value={descriptered[col]}
                            // disabled={fieldObj.isAllowEdit}
                            bordered={false}
                            allowClear={true}
                            maxLength={20}
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
}
MyDescriptions.defaultProps = {
    title: "template",
    bordered: false,
    isAdminSpecific: true,
    isEditMode: false
}
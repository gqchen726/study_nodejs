import React from 'react'
import Descriptions from "antd/es/descriptions";
import PropTypes from 'prop-types'
import {Input} from "antd";

export class MyDescriptions extends React.Component {
    constructor(props) {
        super(props);
    }

    renderDescItemList = (descriptered,columns) => {
        if (!descriptered) {
            return null;
        }
        return columns.map( (column,index) => {
            let fieldObj = descriptered[column];
            return fieldObj ?
                <Descriptions.Item key={index} label={fieldObj.chineseName}>{fieldObj.value}</Descriptions.Item>:null;
        })
    }
    renderSpecificDescItemList = (descriptered,columns) => {
        if (!descriptered) {
            return null;
        }
        return columns.map( (column,index) => {
            let fieldObj = descriptered[column];
            return fieldObj ?
                <Descriptions.Item key={index} label={fieldObj.chineseName}>
                    <Input
                        id={column}
                        value={fieldObj.value}
                        disabled={fieldObj.isAllowEdit}
                        bordered={false}
                        allowClear={true}
                        maxLength={20}
                        onChangeCapture={this.autoSave}
                    />
                </Descriptions.Item>:null;
        })
    }



    render() {
        let {descriptered} = this.props;
        let {columns} = this.props;
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
                        this.renderDescItemList(descriptered,columns):
                        this.renderSpecificDescItemList(descriptered,columns)
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
    columns: PropTypes.array,
    //horizontal | vertical
    layout: PropTypes.string,
}
MyDescriptions.defaultProps = {
    title: "template"
}
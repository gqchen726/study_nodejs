import React from 'react'
import Descriptions from "antd/es/descriptions";
import PropTypes from 'prop-types'
import {Input} from "antd";

export class MyDescriptions extends React.Component {
    constructor(props) {
        super(props);
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
            infos.push(
                <Descriptions.Item key={key} label={col}>
                     <Input
                        id={key}
                        value={descriptered[col]}
                        // disabled={fieldObj.isAllowEdit}
                        bordered={false}
                        allowClear={true}
                        maxLength={20}
                        onChangeCapture={this.autoSave}
                     />
                </Descriptions.Item>
                // <Descriptions.Item
                //     key={key}
                //     label={col}
                // >
                //     {descriptered[col].value}
                // </Descriptions.Item>
            );
        })
        return infos;
    }



    render() {
        let {descriptered} = this.props;
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
    title: "template"
}
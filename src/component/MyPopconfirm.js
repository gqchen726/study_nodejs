import {notification} from "antd/es";
import PropTypes from 'prop-types'
import Popconfirm from "antd/es/popconfirm";
import React from "react";
export const MyPopconfirm = (props) => {

}


export class MyPopconfirm extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        let {title, onConfirm, onCancel, okText, cancelText, component} = this.props;
        return (
            <Popconfirm
                title={title}
                onConfirm={onConfirm}
                onCancel={onCancel}
                okText={okText}
                cancelText={cancelText}
            >
                {component}
            </Popconfirm>
        );
    }
}
MyPopconfirm.propTypes = {
    title: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    component: PropTypes.any,
}
MyPopconfirm.defaultProps = {
    title:"警告提示",
    onConfirm: () => {},
    onCancel: () => {},
    okText: "确认",
    cancelText: "取消",
}

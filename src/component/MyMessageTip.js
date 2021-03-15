import {
    RadiusBottomleftOutlined,
} from '@ant-design/icons';
import React from "react";
import PropTypes from 'prop-types'
import {notification} from "antd";
import {IconType, NotificationPlacement} from "antd/lib/notification";

export const MyMessageTip = (props) => {

    const openNotificationWithIcon = type => {
        notification[type]({
            message: props.message,
            description: props.description,
            type: props.type ? props.type:null,
            onClick: props.onClick ? props.onClick:null,
            onClose: props.onClose ? props.onClose:null,
        });
    };

    return (
        openNotificationWithIcon(props.type)
    );
}
MyMessageTip.propTypes = {
    // message: React.ReactNode;
    // description?: React.ReactNode;
    // btn?: React.ReactNode;
    // key?: string;
    // onClose?: () => void;
    // duration?: number | null;
    // icon?: React.ReactNode;
    // placement?: NotificationPlacement;
    // style?: React.CSSProperties;
    // prefixCls?: string;
    // className?: string;
    // readonly type?: IconType;
    // onClick?: () => void;
    // top?: number;
    // bottom?: number;
    // getContainer?: () => HTMLElement;
    // closeIcon?: React.ReactNode;
    description: PropTypes.string,
    message: PropTypes.string,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    // Success info warning error open close config destroy
    type: PropTypes.string
}
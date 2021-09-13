import { Result } from 'antd';
import React from "react";
import PropTypes from 'prop-types';

export const MyResult = (props) => {
    return (
        <Result
            status={props.status}
            title={props.title}
            subTitle={props.subTitle}
            extra={props.extra}
        />
    );
}
MyResult.propTypes = {
    //success | error | info | warning | 404 | 403 | 500
    status: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    extra: PropTypes.any
}
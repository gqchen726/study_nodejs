
import React from "react";
import PropTypes from 'prop-types';
import {Tooltip} from "antd/es";

export class MyTooltip extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        let {title, component} = this.props;
        return (
            <Tooltip key={title} title={title}>
                {component}
            </Tooltip>
        );
    }
}
MyTooltip.propTypes = {
    title: PropTypes.string,
    component: PropTypes.any,
}
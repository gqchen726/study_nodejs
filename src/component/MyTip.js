import PropTypes from 'prop-types'
import {Box, Text, Tip} from "grommet";
import React from "react";

const TipContent = ({ message }) => (
    <Box direction="row" align="center">
        <svg viewBox="0 0 22 22" version="1.1" width="22px" height="22px">
            <polygon
                fill="grey"
                points="6 2 18 12 6 22"
                transform="matrix(-1 0 0 1 30 0)"
            />
        </svg>
        <Box background="grey" direction="row" pad="small" round="xsmall">
            <Text color="accent-1">{message}</Text>
        </Box>
    </Box>
);
export const  MyTip= (tipMessage,component) => {
    return (
        <Tip
            dropProps={{ align: { left: 'bottom' } }}
            content={<TipContent message={tipMessage} />}
            plain
        >
            {
                component
            }
        </Tip>
    );
}
MyTip.propTypes = {
    tipMessage: PropTypes.string,
    component: PropTypes.any
}
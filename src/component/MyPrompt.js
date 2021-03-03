import {Prompt} from "react-router";
import React from "react";
import PropTypes from 'prop-types';

export class MyPrompt extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        let loginMessage = "您还未登陆，请先去登陆!";
        let {user} = this.props;
        return (
            // <Prompt
            //     message={ location => {
            //         return !location.pathname.startsWith(path)
            //             ? true: (this.props.user ? true : message)
            //     }}
            // />
            <Prompt
                message={ location => {
                    switch (true) {
                        case location.pathname.startsWith('/personalCenter'):
                        case location.pathname.startsWith('/myCollections'):


                            return user? true : loginMessage;
                    }
                    return true;
                }}
            />
        );
    }
}
MyPrompt.propTypes = {
    message: PropTypes.string,
    path: PropTypes.string,
    isLogined: PropTypes.func,
}
MyPrompt.defaultProps = {
    message: "您还未登陆，请先去登陆!"
}
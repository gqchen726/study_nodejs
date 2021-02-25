import React, { Component } from 'react';

module.exports = (importComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            }
        }
        componentDidMount() {
            importComponent().then(cmp => {
                    this.setState({ component: cmp.default });
                });
        }
        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
};
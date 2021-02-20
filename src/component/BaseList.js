import React from 'react';

export class BaseList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let list = this.props.list;
        let lis = list.map(
            (str) => <li key={str.toString()}>{str}</li>
        );
        return (
            <div>
                {
                    list ? <ul>{lis}</ul> : null
                }
            </div>
        );
    }


}
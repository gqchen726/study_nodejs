import React from 'react';


export class BaseSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            options: this.props.options,
            name: this.props.name,
            id: this.props.id,
            defaultValue: this.props.defaultValue
        });
    }

    componentWillMount() {
        const options = this.state.options;
        this.optionsMap = options.map( (optionValue) =>
            <option key={optionValue.toString()} defaultValue={optionValue} >{optionValue}</option> );
    }

    render() {

        return (
            <div>
                <select name={this.state.name} id={this.state.id}  defaultValue={this.state.defaultValue}>
                    {this.optionsMap}
                </select>
            </div>
        );
    }

}
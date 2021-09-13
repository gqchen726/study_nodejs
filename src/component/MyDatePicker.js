import React from "react";
import PropTypes from "prop-types";
import DatePicker from "antd/es/date-picker";
import moment from "moment";

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export class MyDatePicker extends React.Component {
    constructor(props) {
        super(props);

    }

    range = (start, end) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    disabledDateTime = () => {
        return {
            disabledHours: () => this.range(0, 24).splice(4, 20),
            disabledMinutes: () => this.range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }

    disabledRangeTime = (_, type) => {
        if (type === 'start') {
            return {
                disabledHours: () => this.range(0, 60).splice(4, 20),
                disabledMinutes: () => this.range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        }
        return {
            disabledHours: () => this.range(0, 60).splice(20, 4),
            disabledMinutes: () => this.range(0, 31),
            disabledSeconds: () => [55, 56],
        };
    }


    render() {
        const dateFormat = 'YYYY/MM/DD';
        const {title, fromToday, onClickHandler} = this.props;
        return (
            <div>
                <span>{title}</span>
                <DatePicker
                    format={dateFormat}
                    disabledDate={fromToday ?this.disabledDate:false}
                    //disabledTime={this.disabledDateTime}
                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                    onChange={onClickHandler}
                />
            </div>
        );
    }
}
MyDatePicker.propTypes = {
    title: PropTypes.string,
    fromToday: PropTypes.bool,
    onClickHandler: PropTypes.func
}
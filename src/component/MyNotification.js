import {notification} from "antd/es";
import PropTypes from 'prop-types'
export const myNotification = (message,description) => {
    notification.open({
        message: message,
        description: description
    });
}
myNotification.propTypes = {
    message: PropTypes.string,
    description: PropTypes.string,
}
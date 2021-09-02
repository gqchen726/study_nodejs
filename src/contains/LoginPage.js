import {Button, Card, Input, Select, Tooltip, Switch, Alert, Modal, Space} from "antd/es";
// import {CheckOutlined} from '@ant-design/icons';
import React from "react";
import "../public/css/Login.css";
import axios from "axios";
const localContext = require('./../cache/localContext');
import {Page} from "./Page";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {SimpleLogin} from "./SimpleLogin";
import './../public/css/LoginPage.css'
export class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }



    render() {


        return (
            <div className={'LoginPage'}>
                <SimpleLogin getUser={this.props.getUser} />
            </div>
        );
    }
}

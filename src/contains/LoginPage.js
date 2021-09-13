// import {CheckOutlined} from '@ant-design/icons';
import React from "react";
import "../public/css/Login.css";
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

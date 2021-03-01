import React from 'react'
// import '../public/css/DataShowGrid.css'
import {Input} from "antd";
import Card from "antd/es/card";
import Meta from "antd/es/card/Meta";
import Descriptions from "antd/es/descriptions";
import Badge from "antd/es/badge";

export class PersonalCenter extends React.Component {
    constructor(props) {
        super(props);
    }

    renderDescs = () => {
        if (!this.props.user) {
            return null;
        }
        let {user} = this.props;
        return (
            <Descriptions title="User Info" layout="vertical" bordered={true}>
                <Descriptions.Item label="昵称">{user.name}</Descriptions.Item>
                <Descriptions.Item label="年龄">{user.age}</Descriptions.Item>
                <Descriptions.Item label="性别">{user.gender}</Descriptions.Item>

                <Descriptions.Item label="出生日期">{user.birth}</Descriptions.Item>
                <Descriptions.Item label="手机号码">{user.mobileNumber}</Descriptions.Item>
                <Descriptions.Item label="电子邮箱">{user.email}</Descriptions.Item>

                <Descriptions.Item label="地址">{user.address}</Descriptions.Item>
                <Descriptions.Item label="注册码">{user.registerCode}</Descriptions.Item>
                <Descriptions.Item label="权限">
                    Data disk type: MongoDB
                    <br />
                    Database version: 3.4
                    <br />
                    Package: dds.mongo.mid
                    <br />
                    Storage space: 10 GB
                    <br />
                    Replication factor: 3
                    <br />
                    Region: East China 1<br />
                </Descriptions.Item>
            </Descriptions>
        );
    }

    render() {
        return (
            this.renderDescs()
        )
    }
}
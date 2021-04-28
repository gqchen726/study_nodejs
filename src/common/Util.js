import {Button, notification} from "antd/es";
import React from "react";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";

const base = {
    tipMessage: (tipLabel,message) => {
        notification.open({
            message: tipLabel,
            description: message
        });
    },
    descriptionIgnoreList: () => {
        let common = [];
        common.push("admin");
        common.push("password");
        common.push("orders");
        common.push("souseNames");
        common.push("resources");
        common.push("ex");
        return common;
    },
    codeTable: (property) => {
        let result = property;
        if (property == "name") {
            result = "昵称";
        } else if (property == "address") {
            result = "地址";
        } else if (property == "admin") {
            result = "权限";
        } else if (property == "age") {
            result = "年龄";
        } else if (property == "approval") {
            result = "审核权限";
        } else if (property == "avatar") {
            result = "头像";
        } else if (property == "birth") {
            result = "出生日期";
        } else if (property == "email") {
            result = "邮箱地址";
        } else if (property == "mobileNumber") {
            result = "手机号码";
        } else if (property == "name") {
            result = "用户名";
        } else if (property == "password") {
            result = "密码";
        } else if (property == "registerCode") {
            result = "注册码";
        } else if (property == "sex") {
            result = "性别";
        } else if (property == "productName") {
            result = "产品名称";
        } else if (property == "productCode") {
            result = "产品代码";
        } else if (property == "description") {
            result = "产品描述";
        } else if (property == "price") {
            result = "产品价格";
        } else if (property == "category") {
            result = "产品分类";
        } else if (property == "owner") {
            result = "产品拥有者";
        } else if (property == "ex") {
            result = "扩展";
        } else if (property == "detailDate") {
            result = "预约时段";
        } else if (property == "enddate") {
            result = "订单有效期止期";
        } else if (property == "generationDate") {
            result = "订单生成时间";
        } else if (property == "orderId") {
            result = "订单编号";
        } else if (property == "productNum") {
            result = "订购数量";
        } else if (property == "startDate") {
            result = "订单有效期起期";
        } else if (property == "status") {
            result = "订单状态";
        } else if (property == "totalPrice") {
            result = "订单总价";
        } else if (property == "actions") {
            result = "操作";
        } else if (property == "male") {
            result = "男";
        } else if (property == "female") {
            result = "女";
        }

        return result;
    },
    normalUserTableColumns: [
        'orderId',
        'productName',
        'price',
        'status',
        'actions'
    ]

}

export const util = {
    autoSave: (obj,id) => {


        if(id === "name") {
            obj.name = value;
        } else if(id === "mobileNumber") {
            obj.mobileNumber = value;
        } else if(id === "checkCode") {
            obj.checkCode = value;
        } else if(id === "password") {
            obj.password = value;
        } else if(id === "rePassword") {
            obj.rePassword = value;
        }

        return obj;
    },
    returnMode: (user,isAdminSpecific,isEditMode,onClickHandler) => {
        if (!isAdminSpecific) {
            return (!user)?
                null:<Button type={"primary"} onClick={onClickHandler} >{isEditMode ? "保存":"编辑 "}</Button>
        } else if (isAdminSpecific) {
            return (user && user.admin)?
                <Button type={"primary"} onClick={onClickHandler} >{isEditMode ? "保存":"编辑 "}</Button>:null
        }
    },
    tipMessage: (tipLabel,message) => {
       base.tipMessage(tipLabel,message)
    },
    codeTable: (property) => {
        return base.codeTable(property);
    },
    sendCheckCode: (mobileNumber) => {
        axios.get(
            `${urlsUtil.user.getCheckCode}?mobileNumber=${mobileNumber}`
        ).then(
            response => {
                base.tipMessage("验证码提示",response.data.message)
            }
        );
    },
    hasDescriptionIgnoreList: (col) => {
        let ignoreList = base.descriptionIgnoreList();
        return ignoreList.includes(col);
    },
    getTableColumns: () => {
        let requestColumns;
        requestColumns = base.normalUserTableColumns;
        let resultColumns = requestColumns.map((value) => {
            return {
                title: base.codeTable(value),
                dataIndex: value,
                key: value,
            }
        })
        return resultColumns;
    }
}
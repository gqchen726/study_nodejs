import {Button, notification} from "antd/es";
import React from "react";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";

export const util = {
    autoSaveOfUser: (obj,id) => {


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
            return (!user || !user.admin === "admin")?
                null:<Button type={"primary"} onClick={onClickHandler} >{isEditMode ? "保存":"编辑 "}</Button>
        }
    },
    tipMessage: (tipLabel,message) => {
        notification.open({
            message: tipLabel,
            description: message
        });
    },
    codeTable: (property) => {
        let result;
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
        }

        //     address: null
        // admin: "true"
        // age: null
        // approval: null
        // avatar: null
        // birth: null
        // email: "cgq786153492@gmail.com"
        // mobileNumber: "15383642823"
        // name: "yong"
        // orders: []
        // password: "@WSX3edc4r"
        // registerCode: "PBfzCj"
        // sex: null

        return result;
    },
    sendCheckCode: (mobileNumber) => {
        axios.get(
            `${urlsUtil.user.getCheckCode}?mobileNumber=${mobileNumber}`
        ).then(
            response => {
                this.tipMessage("验证码提示",response.data.message)
            }
        );
    }
}
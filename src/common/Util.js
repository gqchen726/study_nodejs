import {Button, notification} from "antd/es";
import React from "react";

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
    }
}
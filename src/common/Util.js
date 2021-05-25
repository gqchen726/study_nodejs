import {Button, notification} from "antd/es";
import React from "react";
import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";
import {DeleteOutlined, EditOutlined, SaveOutlined} from "@ant-design/icons";

const base = {
    tipMessage: (tipLabel,message) => {
        notification.open({
            message: tipLabel,
            description: message,
            style: {backgroundColor:"#d4c146"}
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
            result = "景点名称";
        } else if (property == "productCode") {
            result = "景点代码";
        } else if (property == "description") {
            result = "景点描述";
        } else if (property == "price") {
            result = "门票价格";
        } else if (property == "category") {
            result = "景点分类";
        } else if (property == "owner") {
            result = "景点拥有者";
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
            result = "预约日期";
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
        } else if (property == "generated") {
            result = "预约成功，确认后订单生效";
        } else if (property == "confirmed") {
            result = "预约生效";
        } else if (property == "cancel") {
            result = "预约已被取消";
        }

        return result;
    },
    normalUserTableColumns: [
        'orderId',
        'productName',
        'price',
        'productNum',
        'totalPrice',
        'status',
        'actions'
    ],
    collectionTableColumns: [
            'productCode',
            'actions'
        ],

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
                null:<Button icon={isEditMode? <SaveOutlined />:<EditOutlined />} type={"primary"} onClick={onClickHandler} >{isEditMode ? "保存":"编辑 "}</Button>
        } else if (isAdminSpecific) {
            return (user && user.admin)?
                <Button icon={isEditMode? <SaveOutlined />:<EditOutlined />} type={"primary"} onClick={onClickHandler} >{isEditMode ? "保存":"编辑 "}</Button>:null
        }
    },
    tipMessage: (tipLabel,message) => {
       base.tipMessage(tipLabel,message)
    },
    codeTable: (property) => {
        return base.codeTable(property);
    },
    sendCheckCode: (mobileNumber,email) => {
        let url = !!email?
            `${urlsUtil.user.getCheckCode}?mobileNumber=${mobileNumber}&email=${email}`:
            `${urlsUtil.user.getCheckCode}?mobileNumber=${mobileNumber}`;
        axios.get(url).then(
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
    },
    getTableColumns1: (filteredInfo,sortedInfo,filters,getColumnSearchProps) => {
        console.log(filters)
        let requestColumns;
        requestColumns = base.normalUserTableColumns;
        let resultColumns = requestColumns.map((property) => {
            if (property == "actions") return ;
            return {
                title: base.codeTable(property),
                dataIndex: property,
                key: property,
                filters: !filters[property]?
                    [{ text: 'All', value: 'All' }]:
                        filters[property],
                filteredValue: filteredInfo[property] || null,
                onFilter: (val, record) => {
                    return record[property].includes(val);
                },
                sorter: (a, b) => {
                    let ap = a[property];
                    let bp = b[property];
                    if (ap.length !== bp.length){
                        return ap.length-bp.length;
                    }
                    let as = ap.split("");
                    let bs = bp.split("");
                    for (let i = 0;i < as.length;i++) {
                        if (as[i] === bs[i]) {
                            continue;
                        } else {
                            return as[i] - bs[i];
                        }
                    }
                    return 0;
                },
                sortOrder: sortedInfo.columnKey === property && sortedInfo.order,
                ellipsis: true,
                width: '30%',
                ...getColumnSearchProps(property),
            }

            /*{
                title: base.codeTable(value),
                dataIndex: value,
                key: value,
            }*/
        })
        return resultColumns;
    },
    getTableColumnsOfCollection: () => {
        let requestColumns;
        requestColumns = base.collectionTableColumns;
        let resultColumns = requestColumns.map((value) => {
            return {
                title: base.codeTable(value),
                dataIndex: value,
                key: value,
            }
        })
        return resultColumns;
    },

}
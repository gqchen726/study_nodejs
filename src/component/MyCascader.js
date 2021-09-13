import React from 'react';


import {Cascader, Input} from 'antd';
import newArea from "../common/Area";
import localContext from "../cache/localContext";


export class MyCascader extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            areas: null,
            currentArea: {
                firstArea: ['北京市', '北京市', '东城区'],
                lastArea: null
            },
            fillArea: props.area
        }
    }

    componentWillMount() {
        let areas;
        if(localContext.has("Areas")) {
            areas = localContext.get("Areas")
        } else {
            areas = newArea.getAreas;
            localContext.put(areas);
        }
        let {fillArea} = this.state;
        if (fillArea) this.areaFormat(fillArea);
        this.state.areas = areas;
    }

    areaFormat = (fillArea) => {
        let area = fillArea.split(":");
        if (area.length < 2) return ;
        let {currentArea} = this.state;
        currentArea.firstArea = area[0].split("-");
        currentArea.lastArea = area[1];
        this.state.currentArea = currentArea;
    }

    areaToString = () => {
        let {currentArea, fillArea} = this.state;
        let {firstArea} = currentArea;
        firstArea.forEach((value,index) => {
            if (index == 0) fillArea = value;
            else {
                fillArea+= `-${value}`
            }
        })
        let {lastArea} = currentArea;
        fillArea += `:${lastArea}`;
        this.setState({
            fillArea: fillArea
        })
        this.props.saveAddress(fillArea)
    }


    saveFirstArea = (area) => {
        let {currentArea} = this.state;
        currentArea.firstArea = area;
        this.setState({
            currentArea: currentArea
        })
        if (currentArea.lastArea) {
            this.areaToString()
        }
    }

    saveLastArea = (event) => {
        let value = event.target.value;
        let {currentArea} = this.state;
        currentArea.lastArea = value;
        this.setState({
            currentArea: currentArea
        })
        if (currentArea.firstArea) {
            this.areaToString()
        }
    }




    render() {
        const options = this.state.areas;
        let {currentArea} = this.state;
        return (
            <div>
                <Cascader
                    defaultValue={currentArea.firstArea}
                    options={options}
                    onChange={this.saveFirstArea}
                />
                <Input.TextArea
                    id={currentArea}
                    value={currentArea.lastArea}
                    // disabled={fieldObj.isAllowEdit}
                    bordered={false}
                    maxLength={5000}
                    autoSize={true}
                    showCount={true}
                    onChangeCapture={this.saveLastArea}
                    placeholder={'请输入详细地址'}
                />
            </div>
        );
    }

}
import React from 'react';
import {Button} from "antd/es";

/**
 * Button
 *      type:
 *          primary 主按钮
 *          dashed 虚线按钮
 *          link 链接按钮
 *          text 文本按钮
 *          default 默认按钮
 *      ghost: 幽灵按钮，使按钮背景色变透明
 *
 * 完全受控组件
 *
 */
export class ButtonList extends React.Component {
    constructor(props) {
        super(props);
        this.returnButtons = this.returnButtons.bind(this);
    }

    returnButtons(buttons) {
        if(buttons && buttons.length > 0) {
            return buttons.map((obj) => {
                return <Button key={obj.content} ghost={obj.ghost} type={obj.type} onClick={obj.handleClick}>{obj.content}</Button>;
            })
        }
        return null;
    }

    render() {
        return (
            <div>
                {this.returnButtons(this.props.buttons)}
            </div>
        );
    }
}
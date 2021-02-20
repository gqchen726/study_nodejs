// document.getElementById('app').innerHTML = "Webpack works"
/*使用es6的箭头函数*/
/*
 * 测试babel-preset-es2015是否生效
 */
// const func = str => {
//     document.getElementById('app').innerHTML = str;
// };
// func('我现在在使用Babel!');
/*
 * 测试babel-preset-react是否生效
 */
import React from 'react';
import ReactDom from 'react-dom';
import App from "./App";

// ReactDom.render(
//     <div>Hello React!</div>, document.getElementById('app')
// );
ReactDom.render(
    <App />,
    document.getElementById('app')
);
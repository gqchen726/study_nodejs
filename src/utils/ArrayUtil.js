// export const ArrayUtil = {
//
// }

// ArrayPractice
let array1 = new Array(1,'lisa',2,'jennie',3,'rose',4,'jisoo');
let array2 = [array1,new function (){},null,new Error()];
let object = {
    name: "tom",
    age: 18,
    gender: "male"
}
// console.log(typeof array1);
// console.log(Array.isArray(array1));
// console.log(array1 instanceof Array);
// // es3
// console.log(`pop()[删除最后一位并返回被删除的数据,原数组改变]:\n\tfrom[${array1}]\n\tchange[${array1.pop()}]\n\tto[${array1}]`);
// console.log(`push()[在最后一位新增一或多个数据并返回长度,原数组改变]:\n\tfrom[${array1}]\n\tchange[${array1.push("twice")}]\n\tto[${array1}]`);
// console.log(`shift()[删除第一位并返回被删除的数据,原数组改变]:\n\tfrom[${array1}]\n\tchange[${array1.shift()}]\n\tto[${array1}]`);
// console.log(`unshift()[在第一位新增一或多个数据并返回长度,原数组改变]:\n\tfrom[${array1}]\n\tchange[${array1.unshift(1)}]\n\tto[${array1}]`);
// console.log(`reverse()[反转数组并返回结果,原数组改变]:\n\tfrom[${array1}]\n\tchange[${array1.reverse()}]\n\tto[${array1}]`);
// console.log(`sort()[按字符规则排序并返回结果,原数组改变]:\n\tfrom[${array1}]\n\tchange[${array1.sort()}]\n\tto[${array1}]`);
// console.log(`splice()[删除指定位置后替换并返回删除的数据,原数组改变]:\n\tfrom[${array1}]\n\tchange[${array1.splice(array1.length-1,1,"jisoo",5,"twice")}]\n\tto[${array1}]`);
// // es6
// console.log(`copyWithin()[从target的位置复制[start,end)并返回结果,原数组改变]:\n\tfrom[${array1}]\n\tchange[${array1.copyWithin(1,2,5)}]\n\tto[${array1}]`);
// console.log(`fill()[使用给定的值填充到数组中，类似于替换,如果不传start&end将全部替换,原数组改变]:\n\tfrom[${array1}]\n\tchange[${array1.fill('jennie',0,3)}]\n\tto[${array1}]`);
// console.log(`concat()[合并数组并返回合并之后的结果,原数组不改变]:\n\tfrom[${array1}]\n\tchange[${array1.concat(array2)}]\n\tto[${array1}]`);
// console.log(`join()[返回使用分隔符隔开的string类型的数组,原数组不改变]:\n\tfrom[${array2}]\n\tchange[${array2.join("*")}]\n\tto[${array2}]`);
// console.log(`join()[返回使用分隔符隔开的string类型的数组,原数组不改变]:\n\tfrom[${array1}]\n\tchange[${array1.join("*")}]\n\tto[${array1}]`);
// console.log(`slice()[截取指定长度的数组[start,end)并返回,原数组不改变]:\n\tfrom[${array1}]\n\tchange[${array1.slice(4,8)}]\n\tto[${array1}]`);
// console.log(`toString()[返回转为字符串的结果,原数组不改变]:\n\tfrom[${array1}]\n\tchange[${array1.toString()}]\n\tto[${array1}]`);
// console.log(`valueOf()[返回数组对象的原始值,与toString效果等同,原数组不改变]:\n\tfrom[${array1}]\n\tchange[${array1.valueOf()}]\n\tto[${array1}]`);
// console.log(`indexOf()[正向查找并返回索引,原数组不改变]:\n\tfrom[${array1}]\n\tchange[${array1.indexOf("rose")}]\n\tto[${array1}]`);
// console.log(`lastIndexOf()[反向查找并返回索引,原数组不改变]:\n\tfrom[${array1}]\n\tchange[${array1.lastIndexOf("rose")}]\n\tto[${array1}]`);
// console.log(`forEach()[遍历数组执行作为参数的回调函数，无返回值,原数组不改变]:\n\tfrom[${array1}]\n\tchange[${array1.forEach((value) => console.log("\t\t"+value+"√"))}]\n\tto[${array1}]`);
// console.log(`map()[遍历数组执行作为参数的回调函数并返回新数组,原数组不改变]:\n\tfrom[${array1}]\n\tchange[${array1.map((value) => (value+"√"))}]\n\tto[${array1}]`);
// console.log(`filter()[筛选遍历数组执行作为参数的回调函数并返回新数组,原数组不改变]:\n\tfrom[${array1}]\n\tchange[${array1.filter( (value,index,self) => (self.indexOf(value) === index) )}]\n\tto[${array1}]`);
// console.log(`every()[遍历数组执行作为参数的回调函数并返回Boolean,在返回值为false时停止遍历，否则等同于forEach，原数组不改变]:\n\tfrom[${array1}]\n\tchange[${array1.every( (value,index,self) => { console.log(value);return value !== 5;} )}]\n\tto[${array1}]`);
// console.log(`some()[遍历数组执行作为参数的回调函数并返回Boolean,在返回值为true时停止遍历，否则等同于forEach，原数组不改变]:\n\tfrom[${array1}]\n\tchange[${array1.some( (value,index,self) => { console.log(value);return value == 5;} )}]\n\tto[${array1}]`);
// console.log(Array.from(object));
// 将数组按照首字母分组
let arr = ["zhang san","zhang si","li si","li q","a s","l s","h d","j d"];


console.log((/^.*(?=.{11})[1-9].*$/).test("111111111"));

/**
 * 根据参数名获取value值  （仅限当前Url上的
 * @param variable
 * @returns {string|boolean}
 */
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}

/*!
 * 项目自定义的公共JavaScript，可覆盖框架js里的方法
 */
/**
 * 将金额数字乘100进行格式化为单位:分
 * @param selected    jq选择器
 */
function costMultiplyFormatBySelected(selected) {
    let cost = $(selected);
    for (let i = 0; i < cost.size(); i++) {
        if (cost[i].value !== '') {
            cost[i].value = floatObj.multiply(parseFloat(cost[i].value), 100);
        }
    }
}

/**
 * 将金额数字除100进行格式化为单位:元
 * @param selected    jq选择器
 */
function costDivideFormatBySelected(selected) {
    let cost = $(selected);
    for (let i = 0; i < cost.size(); i++) {
        if (cost[i].value !== '') {
            cost[i].value = floatObj.divide(parseFloat(cost[i].value), 100).toFixed(2);
        }
    }
}

function formatDivideByVal(val, obj, row, act) {
    if(act === 'edit'){
        return val;
    }
    let cost = parseFloat(val);
    return isNaN(cost) ? 0 : floatObj.divide(cost, 100);
}

// function formatDivideByVal(val) {
//     let cost = parseFloat(val);
//     return isNaN(cost) ? 0 : floatObj.divide(cost, 100);
// }


/**
 * 返回所有入参之和
 * @param nums
 * @returns {number}
 */
function add(...nums) {
    let result = 0;
    for (let num of nums) {
        result = floatObj.add(result, isNaN(num) ? 0 : num);
    }
    return result;
}

/**
 * 第一个参数 【减】 后面所有的参数
 * @param a
 * @param nums
 * @returns {number|*}
 */
function subtract(a, ...nums) {
    let result = isNaN(a) ? 0 : a;
    for (let num of nums) {
        result = floatObj.subtract(result, isNaN(num) ? 0 : num);
    }
    return result;
}


// 获得本月的开始日期
function getMonthStartDate(date){
    date = new Date(date);
    let nowMonth = date.getMonth();    // 当前月
    let nowYear = date.getFullYear();      // 当前年
    let monthStartDate = new Date(nowYear, nowMonth, 1);
    return formatDate(monthStartDate);
}

// 获得本月的结束日期
function getMonthEndDate(date){
    date = new Date(date);
    let nowMonth = date.getMonth();    // 当前月
    let nowYear = date.getFullYear();      // 当前年
    let monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowYear, nowMonth));
    return formatDate(monthEndDate);
}

// 获得某月的天数
function getMonthDays(nowYear, month){
    let monthStartDate = new Date(nowYear, month, 1);
    let monthEndDate = new Date(nowYear, month + 1, 1);
    let days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
    return days;
}

// 格式化日期：yyyy-MM-dd
function formatDate(date) {
    if(isNaN(date.getTime())){
        return '';
    }
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let weekday = date.getDate();

    if(month < 10){
        month = "0" + month;
    }
    if(weekday < 10){
        weekday = "0" + weekday;
    }
    return (year + "-" + month + "-" + weekday);
}

/**
 * 加减乘除不丢失精度实现 (只保留两位精度)
 * @type {{add: (function(*=, *=): *|number), subtract: (function(*=, *=): *|number), divide: (function(*=, *=): *|number), multiply: (function(*=, *=): *|number)}}
 */
var floatObj = function () {

    /*
     * 判断obj是否为一个整数 整数取整后还是等于自己。利用这个特性来判断是否是整数
     */
    function isInteger(obj) {
        // 或者使用 Number.isInteger()
        return Math.floor(obj) === obj
    }

    /*
     * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
     * @param floatNum {number} 小数
     * @return {object}
     *   {times:100, num: 314}
     */
    function toInteger(floatNum) {
        // 初始化数字与精度 times精度倍数  num转化后的整数
        var ret = {times: 1, num: 0}
        var isNegative = floatNum < 0  //是否是小数
        if (isInteger(floatNum)) {  // 是否是整数
            ret.num = floatNum
            return ret  //是整数直接返回
        }
        var strfi = floatNum + ''  // 转换为字符串
        var dotPos = strfi.indexOf('.')
        var len = strfi.substr(dotPos + 1).length // 拿到小数点之后的位数
        var times = Math.pow(10, len)  // 精度倍数   times为精度倍数,固定写死2位
        /* 为什么加0.5?
            前面讲过乘法也会出现精度问题
            假设传入0.16344556此时倍数为100000000
            Math.abs(0.16344556) * 100000000=0.16344556*10000000=1634455.5999999999
            少了0.0000000001
            加上0.5 0.16344556*10000000+0.5=1634456.0999999999 parseInt之后乘法的精度问题得以矫正
        */
        var intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10)
        ret.times = times
        if (isNegative) {
            intNum = -intNum
        }
        ret.num = intNum
        return ret
    }

    /*
     * 核心方法，实现加减乘除运算，确保不丢失精度
     * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
     * @param a {number} 运算数1
     * @param b {number} 运算数2
     */
    function operation(a, b, op) {
        var o1 = toInteger(a)
        var o2 = toInteger(b)
        var n1 = o1.num  // 3.25+3.153
        var n2 = o2.num
        var t1 = o1.times
        var t2 = o2.times
        var max = t1 > t2 ? t1 : t2
        var result = null
        switch (op) {
            // 加减需要根据倍数关系来处理
            case 'add':
                if (t1 === t2) { // 两个小数倍数相同
                    result = n1 + n2
                } else if (t1 > t2) {
                    // o1 小数位 大于 o2
                    result = n1 + n2 * (t1 / t2)
                } else {  // o1小数位小于 o2
                    result = n1 * (t2 / t1) + n2
                }
                return result / max
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2
                } else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2)
                } else {
                    result = n1 * (t2 / t1) - n2
                }
                return result / max
            case 'multiply':
                // 325*3153/(100*1000) 扩大100倍 ==>缩小100倍
                result = (n1 * n2) / (t1 * t2)
                return result
            case 'divide':
                // (325/3153)*(1000/100)  缩小100倍 ==>扩大100倍
                result = (n1 / n2) * (t2 / t1)
                return result
        }
    }

    // 加减乘除的四个接口
    function add(a, b) {
        return operation(a, b, 'add')
    }

    function subtract(a, b) {
        return operation(a, b, 'subtract')
    }

    function multiply(a, b) {
        return operation(a, b, 'multiply')
    }

    function divide(a, b) {
        return operation(a, b, 'divide')
    }

    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide,
        toInteger: toInteger
    }
}();
/*
 Export Method1=>
    function add(num1, num2) {
 Export Method1=>
        return num1 + num2;
    }
    function sub(num1, num2) {
        return num1 - num2;
    }
    function div(num1, num2) {
        return num1 / num2;
    }
    function mul(num1, num2) {
        return num1 * num2;
    }
    function per(num1, num2) {
        return num1 % num2;
    }
    module.exports = { add, sub, mul, div, per };
*/
//  Export Method2=>
exports.add = (a, b) => a + b;
exports.sub = (a, b) => a - b;
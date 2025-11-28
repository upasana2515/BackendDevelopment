function sum(a,b){
    if(!a || !b){
        return "Invalid argument";
    }
    return a + b;
}
function multiply(a,b){
    if(!a || !b){
        return "Invalid argument";
    }
    return a * b;
}
module.exports = sum;
module.exports.multiply = multiply;
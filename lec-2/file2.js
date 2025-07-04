let file3 = require("./file3");

let result = file3.add(2,3);
let res = file3.mul(2,3);
console.log(result);
console.log(res);

function divide(a,b){
    return a/b ;
}

module.exports.divide=divide
const current = require('./currency')

console.log('50 加币 等于的美元：');
console.log(current.canadianToUS(50));
console.log('30 美元 等于的加币：');
console.log(current.USToCanadian(30));
const casual = require('casual');

const city = casual.city;
const number = casual.integer(from = 1, to = 10);
const person = casual.name_prefix + ' ' + casual.first_name + ' ' + casual.last_name;

console.log(city);
console.log(number);
console.log(person);
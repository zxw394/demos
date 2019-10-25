#!/usr/bin/env node
let program = require("commander");
program
    .version('0.1.0')
    .option('-n, --yourname [yourname]', 'Your name')
    .option('-a, --age [age]', 'Your age')
    .parse(process.argv);

if (program.yourname) {
    console.log(`Hello, your name is ${program.yourname}`);
}
if (program.age) {
    console.log(`Hello, your age is ${program.age}`);
}

"use strict";

var a = 1;
var b = 2;
var ll = [];
ll.push(a);
ll.push(b);
ll.forEach(function (a, b) {
  return a - b < 0;
});
console.log(ll);

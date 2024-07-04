console.log("ahmed gouda")

// How to use
var today = new Date().toLocaleDateString('AR-GB', { 
 day : 'numeric',
 month : 'short',
 year : 'numeric'
});

console.log(today);


var otherDate = new Date();

var dat=otherDate.getTime()
 var time=dat/360/60/60
 console.log(time);
console.log(otherDate);
console.log(dat);
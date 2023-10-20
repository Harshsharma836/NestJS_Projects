var add = function(a){
    return function(b){
        return function(c){
            return function(d){
                return a+b+c+d;
            }
        }
    }
}

// // console.log(add(4)(2)(1)(3));

// var obj = {
//     num : 5
// }
// let arr = [2,5,3];

// function sum(num1 , num2){
//     function printArr(num3){
//         console.log(this.arr)
//     }
//     return this.num + num1 + num2;
// }

// console.log(sum.printArr)
// // console.log(sum.printArr.call(arr , 4));
// console.log(sum.call(obj , 2 , 3));


// function greeting(name){
//     console.log('Hello' + name);
// }

// function processUserInput(callback){
//     name = "raja";
//     callback(name);
// }

// processUserInput(greeting);


// let x = 10;

// {
//     console.log(x)
//     x = 14;
// }
a = 2
console.log(a);
let a ;



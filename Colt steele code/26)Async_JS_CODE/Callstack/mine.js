const multiply=function(x,y){
    return x*y;
}
const square=function(a){
    return multiply(a,a);
}
const isRightTriangle=function(a,b,c){
    return square(a)+square(b)===square(c);
}
console.log("BEFORE")
console.log(isRightTriangle(3, 4, 5))

console.log("DONEEEE!")
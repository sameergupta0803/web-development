const btn1=document.querySelector('#v2');
btn1.onclick=()=>{
    console.log("You clicked me")
    console.log("Now go away")
}
btn1.onmouseenter=()=>{
    console.log("STOP TOUCHING ME");
    console.log("AHHHHH")
}
const btn2=document.querySelector('#v3');
function alerted(){
    alert("Clicked")
}
btn2.onclick=alerted;

const tasBtn=document.querySelector('#tas');
function shout(){
    console.log("SHOUT!!")
}
function twist(){
    console.log("TWIST")
}
tasBtn.addEventListener('click',twist);
tasBtn.addEventListener('click',shout);

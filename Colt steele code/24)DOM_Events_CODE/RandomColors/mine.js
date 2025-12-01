const heading=document.querySelector('h1');
const btn=document.querySelector('button')
btn.addEventListener('click',()=>{
    const red=Math.floor(Math.random()*255);
    const green=Math.floor(Math.random()*255);
    const blue=Math.floor(Math.random()*255);
    const total=red+green+blue;
    const color= `rgb(${red},${green},${blue})`;
    heading.innerText=color;
    document.body.style.backgroundColor=color;
    if(total<60)heading.style.color='white'
})
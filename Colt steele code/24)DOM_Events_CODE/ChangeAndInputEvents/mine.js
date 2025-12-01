const input=document.querySelector('input');
const heading=document.querySelector('h1');
input.addEventListener('input',(e)=>{
    const text=input.value;
    heading.innerText=text;
})
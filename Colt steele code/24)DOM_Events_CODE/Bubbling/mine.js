const container=document.querySelector('#container')
const button=document.querySelector('#changeColor')
container.addEventListener('click',(e)=>{
    container.classList.toggle('hide');
})
button.addEventListener('click',(e)=>{
    e.stopPropagation();
    const color=makeRandColor();
    container.style.backgroundColor=color;
})
const makeRandColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}
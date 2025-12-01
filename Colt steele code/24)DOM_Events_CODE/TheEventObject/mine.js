const button=document.querySelector('button');
const input=document.querySelector('input');
button.addEventListener('click',(e)=>{
    console.log(e);
})
// input.addEventListener('keydown',(e)=>{
//     // console.log(e)
//     console.log(e.key)
//     console.log(e.code);
// })
// input.addEventListener('keyup',(e)=>{
//     console.log(e);
// })
window.addEventListener('keydown',(e)=>{
    switch(e.code){
        case 'ArrowUp':
            console.log('Up!');
            break;
        case 'ArrowDown':
            console.log('Down!');
            break;
        case 'ArrowLeft':
            console.log('Left!');
            break;
        case 'ArrowRight':
            console.log('Right!');
            break;
        default:
            console.log('Ignored!');
    }
})
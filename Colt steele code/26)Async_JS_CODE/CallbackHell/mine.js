// setTimeout(()=>{
//     document.body.style.backgroundColor="red";
//     setTimeout(()=>{
//         document.body.style.backgroundColor="orange";
//         setTimeout(()=>{
//             document.body.style.backgroundColor="yellow";
//             setTimeout(()=>{
//                 document.body.style.backgroundColor="green";
//                 setTimeout(()=>{
//                     document.body.style.backgroundColor="blue";
//                     setTimeout(()=>{
//                         document.body.style.backgroundColor="indigo";
//                         setTimeout(()=>{
//                             document.body.style.backgroundColor="violet";
//                         },1000)
//                     },1000)
//                 },1000)
//             },1000)
//         },1000)
//     },1000)
// },1000)
//vibgyor
function delayedColorChange(color,delay,nextFunction){
    setTimeout(()=>{
        document.body.style.backgroundColor=color;
        nextFunction && nextFunction();
    },1000)
}
delayedColorChange("red",1000,()=>{
    delayedColorChange("orange",1000,()=>{
        delayedColorChange("yellow",1000,()=>{
            delayedColorChange("green",1000,()=>{
                delayedColorChange("blue",1000,()=>{
                    delayedColorChange("indigo",1000,()=>{
                        delayedColorChange("violet",1000,()=>{

                        })
                    })
                })
            })
        })
    })
})
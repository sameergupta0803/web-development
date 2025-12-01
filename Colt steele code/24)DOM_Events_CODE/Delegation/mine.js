const tweetForm=document.querySelector('#tweetForm');
const username=document.querySelector('input[name="username"]')
const tweet=document.querySelector('input[name="tweet"]')
const tweets=document.querySelector('#tweets');
const button=document.querySelector('button');
tweetForm.addEventListener('submit',(e)=>{
    e.preventDefault();
})
button.addEventListener('click',()=>{
    const listElement=document.createElement('li');
    listElement.innerHTML=`<b>${username.value}</b>:${tweet.value}`;
    tweets.append(listElement);
    username.value="";
    tweet.value=""
})
tweets.addEventListener('click',(e)=>{
    e.target.nodeName==='LI'&&e.target.remove();
})
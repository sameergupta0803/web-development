const p1score = document.querySelector('#p1Score');
const p2score = document.querySelector('#p2Score');
const select = document.querySelector('#scores');
const p1btn = document.querySelector('#p1Btn')
const p2btn = document.querySelector('#p2Btn')
const reset = document.querySelector('#reset')
let maxScore = parseInt(select.value);
function resetText() {
    p1score.innerText = "0";
    p2score.innerText = "0";
    p1score.style.color = 'black'
    p2score.style.color = 'black'
    p1btn.disabled = false;
    p2btn.disabled = false;
}
p1btn.addEventListener('click', () => {
    let currScore = parseInt(p1score.innerText);
    p1score.innerText = `${++currScore}`;
    if (currScore === maxScore) {
        p1btn.disabled = true;
        p2btn.disabled = true;
        p1score.style.color = 'green'
        p2score.style.color = 'red'
        // console.log("Game Over")
        // resetText();   
    }
})
p2btn.addEventListener('click', () => {
    let currScore = parseInt(p2score.innerText);
    p2score.innerText = `${++currScore}`;
    if (currScore === maxScore) {
        p1btn.disabled = true;
        p2btn.disabled = true;
        p1score.style.color = 'red'
        p2score.style.color = 'green'
        // console.log("Game Over")
        // resetText();   
    }
})
reset.addEventListener('click', resetText)
select.addEventListener('change', () => {
    resetText();
    maxScore = parseInt(select.value);
})
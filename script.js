let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let msg = document.querySelector("h2");

let turnO = true;

let click1 = new Audio("click1.mp3");
let click2 = new Audio("click2.mp3");
let mouseClick = new Audio("mouseclick.mp3");
let win = new Audio("win.mp3");
let draw = new Audio("draw.wav");

let winPatterns = [
    [0 , 1 , 2],
    [0 , 3 , 6],
    [0 , 4 , 8],
    [1 , 4 , 7],
    [2 , 5 , 8],
    [2 , 4 , 6],
    [3 , 4 , 5],
    [6 , 7 , 8],
];

boxes.forEach((box) => {
    box.addEventListener("mouseover" , ()=>{
        hover.play();
    })
})

boxes.forEach((box) => {
    box.addEventListener("click" , ()=>{
        if(turnO){
            click1.play();
            box.innerHTML = "O";
            turnO = false;
            msg.innerHTML = "X's turn";
        }
        else{
            click2.play();
            box.innerHTML = "X";
            turnO = true;
            msg.innerHTML = "O's turn";
        }
 
        box.disabled = true;
        
        checkWinner();
    })
})

function checkWinner() {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 == pos2 && pos2 == pos3) {
                msg.innerHTML = pos1 + " Wins!";
                msg.style.color = "green";
                msg.style.transform = "scale(1.3)";
                win.play();
                boxes.forEach((box) => {
                    box.disabled = true;
                })
            }
        }
    }
    let count=0;
    boxes.forEach( (box) => {
        if(box.innerText !== "")
            count++;
        })
    if(count===9){
        draw.play();
        msg.style.transform = "scale(1.3)";
        msg.style.color = "#694229";
        msg.innerHTML = "Draw!";
    }
        
}

reset.addEventListener("click",() => {
    msg.style.transform = "scale(1)";
    msg.style.color = "#694229";
    mouseClick.play();
    msg.innerHTML = "Start Game!";
    boxes.forEach((box) =>{
        box.innerHTML = "";
        box.disabled = false;
    })
})
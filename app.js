let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "green", "purple"];

let started = false ;
let level = 0 ;
let highscore = 0;


let h2 = document.querySelector("h2");
let h4 = document.querySelector("h4");



document.addEventListener("keypress" , function() {
    if (started ==false){
        console.log("game is started");
        started = true ;
        levelup();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },1000);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    },1000);
}

function levelup(){
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;
    
    let randIdx = Math.floor(Math.random()* 3);
    let randColor = btns [randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randbtn);
    
}

function checkAns(idx){
    // console.log("current lvl", level);

    if (userSeq[idx] === gameSeq[idx]){
        if (userSeq.length == gameSeq.length){
            setTimeout(levelup,1000);
        }
    }
    else {
        h2.innerHTML = `gameover ! your score is </b> ${level}</b> <br/>press any key to start`;
        document.querySelector("body").style.backgroundColor= "red" ;
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor= "white" ;
        }, 150);
        
        if (level > 0 ){
            lvlHistory();
        }
        if( level > highscore){
            highscore = level;
        }
        h4.innerText = ` hightest score ${highscore} `;
        reset();

    }
}

function btnPress(){
    // console.log(this);

    let btn = this ;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}
    function reset(){
        started = false ;
        userSeq = [];
        gameSeq = [];
        level = 0 ;
    }

function lvlHistory(){
    let levelnumber = [];
    levelnumber.push(level);
    console.log( "your last level is ",level);
    let item = document.createElement("li");

    const now = new Date();
    item.innerHTML = `your last level is <b>${level}</b> at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    let ul =document.querySelector("ul");
    ul.appendChild(item);

}



const bc = new BroadcastChannel("PearsGamePoint");

const playBtn = document.getElementById("PlayButton");
const restartBtn = document.getElementById("RestartButton");

const infoGame = document.getElementById("infoGame");
const gameScore = document.getElementById("ifoGame");

let gameWindow;
let playing;

playBtn.addEventListener("click", letsPlay);
restartBtn.addEventListener("click", restart)

function getUserData(){
    if(navigator.userAgent.includes("Chrome")){
        document.getElementById("navigator").innerHTML = "Chrome";
    }else{
        document.getElementById("navigator").innerHTML = "Mozilla";
    }
    document.getElementById("url").innerHTML = window.location.href;
}

function letsPlay(){
    let userName = document.getElementById("UserName").value;
    if (gameWindow && playing){
        alert("Ja hi ha una partida en marxa!")
    }else if (userName != ""){
        document.cookie = "username="+userName;
        gameWindow = window.open('game.html', 'gameWindow');
    }else {
        alert("Has d'introduir un nom");
    }
}

function restart(){
    if (gameWindow){
        gameWindow.close();
        gameWindow = ""
    }
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    gameScore.innerHTML = "No hi ha cap partida en joc"
}

// Brodcast recive data
bc.onmessage = (event) => {
    gameScore.innerHTML =   
        "NOM: " + event.data.player + 
        ", PUNTS: " + event.data.score + 
        ", ESTAT PARTIDA: " + event.data.estate;

    event.data.estate == "En Joc"? playing = true : playing = false;
};
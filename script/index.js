const playBtn = document.getElementById("PlayButton");
const restartBtn = document.getElementById("RestartButton");

const infoGame = document.getElementById("infoGame")

let gameWindow;

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
    if (gameWindow){
        // En cas de que ja hi hagi una partida en marxa, avisa i et cambia de finestra
        alert("Ja hi ha una partida en marxa!")
        gameWindow = window.open('game.html', 'gameWindow');
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
    }
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    infoGame.innerHTML = "No hi ha cap partida en joc"
}
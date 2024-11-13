const bc = new BroadcastChannel("PearsGamePoint");

const instructionsbtn = document.getElementById("instructions-button");

const body = document.getElementById("game");
const recordPoints = document.getElementById("partida-record");
const playerDisplayer = document.getElementById("player-name");
const gamePoints = document.getElementById("points");

const gamePage = document.getElementById("gamePage");
const gameEnd = document.getElementById("gameFinished");

let actualPoints = 0;
let bestPoints = 0;
let bestPlayer = "";
let cardsFliped = 0;
let firtsCartSelected;
let actualPlayer = document.cookie ? document.cookie.split('=')[1] : "No te nom";

instructionsbtn.addEventListener("click", openInstructions);

function onStart(){

    // gameEnd.style.display = "none";
    // gamePage.style.display = "block";

    let images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    images = images.sort(() => Math.random() - 0.5);

    playerDisplayer.innerHTML = actualPlayer;

    // Background color depending on the browser
    if(navigator.userAgent.includes("Chrome")){
        body.style.backgroundColor = "rgb(165, 255, 143)";
        sessionStorage.setItem('backgroundColor', 'green');
    }else{
        body.style.backgroundColor = "orange";
        sessionStorage.setItem('backgroundColor', 'orange');
    }

    if (bestPlayer = null){
        localStorage.setItem('bestPlayer', actualPlayer); // Guardo el millor jugador i la millor puntuació es local storage per poder competir amb altres jugadors cada cop que és comenci una artida
        localStorage.setItem('bestPoints', actualPoints);
    }

    for (let i = 0; i < 20; i++) {
        const cardWrapper = document.createElement('div');
        cardWrapper.id = "cardWrapper";

        const card = document.createElement('img');
        card.src = 'img/card.png';
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = 'img/img' + images[i] +'.png';
        img.classList.add('img')

        cardWrapper.appendChild(card);
        cardWrapper.appendChild(img);

        document.getElementById("playZone").appendChild(cardWrapper);

        cardWrapper.addEventListener('click', function() {
            flipCard(img, cardWrapper);
        });

    }

    scoreUpdate();

}

function openInstructions(){
    window.open('instructions.html', '', 'width=400,height=500'); // He posat h=500 per no haber de fer scroll
}

function flipCard(img, cardWrapper){

    if (cardsFliped <= 2 && !cardWrapper.classList.contains("flipped")){

        cardsFliped += 1;

        cardWrapper.classList.add('flipped')
        if(cardsFliped >= 2){

            setTimeout(function() {

                anyAccerted = false;

                document.querySelectorAll('#cardWrapper').forEach(cardElement => {

                    const cardImg = cardElement.querySelector('.img');

                    if (img.src == cardImg.src && cardImg.src == firtsCartSelected){
                        anyAccerted = true;
                        actualPoints += 5;
                        cardElement.classList.add("accurated");
                    } else if (!cardElement.classList.contains('accurated')){
                        cardElement.classList.remove('flipped');
                    }

                });

                if (!anyAccerted) actualPoints -=3;
                scoreUpdate();

                cardsFliped = 0;

            }, 1000);

        } else{
            firtsCartSelected = img.src;
        }

    }

}

function scoreUpdate(){

    gamePoints.innerHTML = "Punts: "+actualPoints;
    bestPoints = localStorage.getItem('bestPoints')

    // Enviar la info de la partida via Brodcast
    bc.postMessage({"score" : actualPoints, "player" : actualPlayer, "estate" : "En Joc"});

    if (actualPoints > bestPoints){

        bestPoints = localStorage.setItem('bestPoints', actualPoints);
        bestPlayer = localStorage.setItem('bestPlayer', actualPlayer);

    }

    recordPoints.innerHTML = "JUGADOR: " + localStorage.getItem('bestPlayer') + " - PUNTS: " + localStorage.getItem('bestPoints');
}
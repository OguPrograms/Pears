const instructionsbtn = document.getElementById("instructions-button");

const body = document.getElementById("game");
const recordPoints = document.getElementById("partida-record");
// const points = document.getElementById("points");

let actualPoints = 0;
let cardsFliped = 0;
let firtsCartSelected;

instructionsbtn.addEventListener("click", openInstructions);

function onStart(){

    let images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    images = images.sort(() => Math.random() - 0.5);

    // Background color depending on the browser
    if(navigator.userAgent.includes("Chrome")){
        body.style.backgroundColor = "rgb(165, 255, 143)";
    }else{
        body.style.backgroundColor = "orange";
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
            flipCard(card, img);
        });

    }

    points()

    flipCard()

}

function points(){
    recordPoints.innerHTML = "JUGADOR: " + document.cookie.slice(9) + " - PUNTS: " + actualPoints;
}

function openInstructions(){
    window.open('/instructions.html', '', 'width=400,height=500'); // He posat h=500 per no haber de fer scroll
}

function flipCard(card, img){

    if(cardsFliped >= 2){

        cardsFliped = 0;
        document.querySelectorAll('#cardWrapper').forEach(cardElement => {
            if (cardElement.querySelector('.img')){
                cardElement.querySelector('.img').style.display = 'none';
                cardElement.querySelector('.card').style.display = 'block';
            }
        });

    }

    card.style.display = 'none';
    img.style.display = 'block';
    cardsFliped += 1;

    if(firtsCartSelected){

        if(img.src == firtsCartSelected){

            let allCards = document.getElementsByClassName('img');

            Array.from(allCards).forEach(card => {

                if (card.src.includes(firtsCartSelected)) {
                    card.classList.add("accurated");
                    card.classList.remove("img");
                }
            });

        }

        firtsCartSelected = undefined;
        return;

    }else {

        firtsCartSelected = img.src;

    }

}
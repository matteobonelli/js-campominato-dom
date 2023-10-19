
const btn = document.querySelector('.btn');
const bombNum = 16;
let score = 0;
let gameOver = false;
btn.addEventListener('click',() => {
    const selectDifficulty = document.getElementById('difficulty').value;
    const playingField = document.getElementById('playingField');
    const scoreRecorder = document.getElementById('scoreRecorder')
    let randomContainer = [];
    if(selectDifficulty === ''){
        return;
    } else{
        score = 0;
        scoreRecorder.classList.add('d-none');
        console.clear();
        playingField.innerHTML = '';
        const squareNum = difficultySelector(selectDifficulty);
        const maxAttempt = squareNum - bombNum;
        console.log(maxAttempt);
        randomContainer = generateBombs(squareNum);
        console.log(randomContainer);
        // console.log(squareNum);
        playingField.append(gridFieldGenerator(squareNum, randomContainer));
        // console.log(playingField)

        function boxGenerator(squareIndex, squareNumber, randomContainer){
            const square = document.createElement('div');
            const squareDimension = Math.sqrt(squareNumber);
            const scoreRecorder = document.getElementById('scoreRecorder');
            square.style.width = `calc(100% / ${squareDimension})`;
            square.style.height = square.style.width;
            square.classList.add('box');
            let boxAction = squareIndex + 1;;
            let boxColor = 'active-box';
            for(let x = 0; x < randomContainer.length; x++){
                if(squareIndex + 1 === randomContainer[x]){
                     boxColor = 'boom-box';
                     boxAction = 'BOOM!';
                 };
            }
            square.innerHTML = squareIndex + 1; 
            square.addEventListener('click', () => {
                square.innerHTML = boxAction;
                square.classList.add(boxColor);
                let message;
                if (boxColor === 'boom-box'){
                    console.log('Hai perso!');
                    message = `<h4 class = 'display-3 text-danger fw-bold text-center'>Hai perso! <i class="fa-solid fa-face-grin-tongue-wink"></i></h4>
                    <div class = 'fw-bold display-5 text-center text-light'>${score}</div>`;
                    gameOver();
                } else{
                    console.log(squareIndex + 1);
                    score += 100;
                    message = `<h4 class = 'display-3 text-danger fw-bold text-center'>Il tuo score</h4>
                    <div class = 'fw-bold display-5 text-center text-light'>${score}</div>`;
                    
                    if((score / 100) === maxAttempt){
                        message = `<h4 class = 'display-3 text-success fw-bold text-center'>Hai Vinto! <i class="fa-solid fa-face-grin-stars"></i></h4>
                        <div class = 'fw-bold display-5 text-center text-light'>${score}</div>`;
                        
                        gameOver();
                    }
                }
                scoreRecorder.innerHTML = message;
                scoreRecorder.classList.remove('d-none');
            }, {once : true});
            return square
        };
        function gridFieldGenerator(squareNumber, randomContainer){
            const minedGrid = document.createElement('div');
            minedGrid.classList.add('minedGrid');
            for (let i = 0; i < squareNumber; i++){
                let box = boxGenerator(i, squareNumber, randomContainer);
                // console.log(box);
                minedGrid.append(box);
            }
            return minedGrid
        }
        function gameOver(){
            const arraySquareBombs = document.getElementsByClassName('box')
            for (let i = 0; i < arraySquareBombs.length; i++){
                let el = arraySquareBombs[i];
                if(randomContainer.includes(parseInt(el.textContent))){
                    el.classList.add('boom-box');
                    el.innerText = 'BOOM!'
                }
            }
        }
    }
});

function difficultySelector(selectDifficulty){
    let squareNum;
    if (selectDifficulty === 'easy'){
        squareNum = 100;
    } else if (selectDifficulty === 'medium'){
        squareNum = 81;
    } else if (selectDifficulty === 'hard'){
        squareNum = 49;
    }
    return squareNum
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
  }
  
function generateBombs(squareNum){
    const randomContainer = [];
    while(randomContainer.length  < bombNum ){
        let bomb = getRandomIntInclusive(1, squareNum);
        if(!randomContainer.includes(bomb)){
            randomContainer.push(bomb);
        }
    }
    return randomContainer;
}


const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        timerID: setInterval(randomSquare, 1000),
        countDownTimerID: setInterval(countDown, 1000),
    }
};


function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerID);
        clearInterval(state.actions.timerID);
        alert(`Game Over! Your score is ${state.values.result}`);
    }
}



function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.5;
    audio.play();
}


function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });

    let ramdomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[ramdomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}


function addListennerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener('click', () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null; 
                playSound('hit');
            }
        })
    })
}


function init() {
    addListennerHitBox();
}


init();
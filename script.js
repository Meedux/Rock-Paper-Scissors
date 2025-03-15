let player = '';
let enemy = '';
let enemy_score = 0;
let player_score = 0;
let soundOn = true;

let choices = ['paper', 'rock', 'scissor'];

const choice = document.querySelector('.choices');
const announce = document.querySelector('.announcer');

const ENEMY = document.querySelector('.enemy-score');
const PLAYER = document.querySelector('.player-score');

const Enemy = document.querySelector('.enemy');
const Player = document.querySelector('.player');

// Audio elements
const backgroundMusic = document.getElementById('background-music');
const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const tieSound = document.getElementById('tie-sound');

// Toggle sound button
const toggleSound = document.getElementById('toggle-sound');
toggleSound.addEventListener('click', () => {
    soundOn = !soundOn;
    if (soundOn) {
        toggleSound.textContent = '🔊';
        toggleSound.className = 'sound-on';
        if (document.querySelector('.game-container').classList.contains('hidden') === false) {
            backgroundMusic.play();
        }
    } else {
        toggleSound.textContent = '🔇';
        toggleSound.className = 'sound-off';
        backgroundMusic.pause();
    }
});

// Function to play sound
function playSound(sound) {
    if (soundOn) {
        sound.currentTime = 0;
        sound.play();
    }
}

document.querySelector('.start').addEventListener('click', () => {
    document.querySelector('.game-container').classList.remove('hidden');
    document.querySelector('.start').classList.add('hidden');
    playSound(clickSound);
    
    // Start background music
    if (soundOn) {
        backgroundMusic.play();
    }
});

choice.addEventListener('click', click);

document.querySelector('.reset').addEventListener('click', () => {
    player_score = 0;
    enemy_score = 0;
    PLAYER.innerText = player_score;
    ENEMY.innerText = enemy_score;
    announce.innerText = '';
    Player.setAttribute('src', '');
    Enemy.setAttribute('src', '');
    
    // Remove any winner announcement
    const finalResult = document.querySelector('.final-result');
    if (finalResult) {
        finalResult.remove();
    }
    
    // Re-add click event listener
    choices.forEach(choice => {
        const elements = document.querySelectorAll(`[${choice}]`);
        elements.forEach(element => {
            element.style.opacity = '1';
        });
    });
    
    choice.addEventListener('click', click);
    playSound(clickSound);
});

function renderAndValidate(playur, enemi) {
    let en = Math.floor(Math.random() * 3);
    enemy = choices[en];

    Player.setAttribute('src', `./img/${playur}.png`);
    Enemy.setAttribute('src', `./img/${enemy}.png`);
    
    // Add animation classes
    Player.classList.add('winner');
    Enemy.classList.add('winner');
    
    // Remove animation classes after animation completes
    setTimeout(() => {
        Player.classList.remove('winner');
        Enemy.classList.remove('winner');
    }, 1500);

    if (playur == 'rock') {
        if (enemy == 'paper') {
            announce.innerText = 'Paper Wins!';
            enemy_score += 1;
            ENEMY.innerText = enemy_score;
            playSound(loseSound);
        } else if (enemy == 'scissor') {
            announce.innerText = 'Rock Wins!';
            player_score += 1;
            PLAYER.innerText = player_score;
            playSound(winSound);
        } else if (enemy == 'rock') {
            announce.innerText = 'Its a Tie!';
            playSound(tieSound);
        }
    } else if (playur == 'paper') {
        if (enemy == 'scissor') {
            enemy_score += 1;
            announce.innerText = 'Scissor Wins!';
            ENEMY.innerText = enemy_score;
            playSound(loseSound);
        } else if (enemy == 'rock') {
            player_score += 1;
            announce.innerText = 'Paper Wins!';
            PLAYER.innerText = player_score;
            playSound(winSound);
        } else if (enemy == 'paper') {
            announce.innerText = 'Its a Tie!';
            playSound(tieSound);
        }
    } else if (playur == 'scissor') {
        if (enemy == 'rock') {
            enemy_score += 1;
            announce.innerText = 'Rock Wins!';
            ENEMY.innerText = enemy_score;
            playSound(loseSound);
        } else if (enemy == 'paper') {
            player_score += 1;
            announce.innerText = 'Scissor Wins!';
            PLAYER.innerText = player_score;
            playSound(winSound);
        } else if (enemy == 'scissor') {
            announce.innerText = 'Its a Tie!';
            playSound(tieSound);
        }
    }

    // Check for winner
    if (player_score === 5 || enemy_score === 5) {
        // Create and display final result
        const finalResult = document.createElement('div');
        finalResult.className = 'final-result';
        
        if (player_score === 5) {
            finalResult.textContent = 'YOU WIN THE GAME!';
            playSound(winSound);
        } else {
            finalResult.textContent = 'ENEMY WINS THE GAME!';
            playSound(loseSound);
        }
        
        document.querySelector('.game-container').insertBefore(
            finalResult,
            document.querySelector('.reset')
        );
        
        // Disable choices
        choices.forEach(choice => {
            const elements = document.querySelectorAll(`[${choice}]`);
            elements.forEach(element => {
                element.style.opacity = '0.5';
            });
        });
        
        choice.removeEventListener('click', click);
    }
}

function click(event) {
    playSound(clickSound);
    
    if (event.target.hasAttribute('rock')) {
        player = 'rock';
        renderAndValidate(player, enemy);
    } else if (event.target.hasAttribute('paper')) {
        player = 'paper';
        renderAndValidate(player, enemy);
    } else if (event.target.hasAttribute('scissor')) {
        player = 'scissor';
        renderAndValidate(player, enemy);
    }
}
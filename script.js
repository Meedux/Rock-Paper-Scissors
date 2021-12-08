let player = '';
let enemy = '';
let enemy_score = 0;
let player_score = 0;

let choices = ['paper', 'rock', 'scissor'];

const choice = document.querySelector('.choices');
const announce = document.querySelector('.announcer');

const ENEMY = document.querySelector('.enemy-score');
const PLAYER = document.querySelector('.player-score');

const Enemy = document.querySelector('.enemy');
const Player = document.querySelector('.player');

choice.addEventListener('click', click);

function renderAndValidate(playur, enemi){
	let en = Math.floor(Math.random() * 3);
	enemy = choices[en];

	Player.setAttribute('src', `./img/${playur}.png`);
	Enemy.setAttribute('src', `./img/${enemy}.png`);

	if(playur == 'rock'){

		if(enemy == 'paper'){
			announce.innerText = 'Paper Wins!';
			enemy_score += 1;
			ENEMY.innerText = enemy_score;
		}else if(enemy == 'scissor'){
			announce.innerText = 'Rock Wins!';
			player_score += 1;
			PLAYER.innerText = player_score;
		}else if(enemy == 'rock'){
			announce.innerText = 'Its a Tie!';
		}

	}else if(playur == 'paper'){

		if(enemy == 'scissor'){
			enemy_score += 1;
			announce.innerText = 'Scissor Wins!';
			ENEMY.innerText = enemy_score;
		}else if(enemy == 'rock'){
			player_score += 1;
			announce.innerText = 'Paper Wins!';
			PLAYER.innerText = player_score;
		}else if(enemy == 'paper'){
			announce.innerText = 'Its a Tie!';
		}

	}else if(playur == 'scissor'){

		if(enemy == 'rock'){
			enemy_score += 1;
			announce.innerText = 'Rock Wins!';
			ENEMY.innerText = enemy_score;
		}else if(enemy == 'paper'){
			player_score += 1;
			announce.innerText = 'Scissor Wins!';
			PLAYER.innerText = player_score;
		}else if(enemy == 'scissor'){
			announce.innerText = 'Its a Tie!';
		}

	}
}

function click(event){
	if(event.target.hasAttribute('rock')){
		player = 'rock';
		renderAndValidate(player, enemy);
	}else if(event.target.hasAttribute('paper')){
		player = 'paper';
		renderAndValidate(player, enemy);
	}else if(event.target.hasAttribute('scissor')){
		player = 'scissor';
		renderAndValidate(player, enemy);
	}
}
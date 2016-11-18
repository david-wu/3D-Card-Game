global._ = require('lodash');

const THREE = require('three-js')();
require('./lib/CSS3DRenderer.js')(THREE);
require('./lib/TrackBallControls.js')(THREE);


const Board = require('./components/board/Board.js');

const board = new Board({
	renderer: renderer,
	players: [
		{
			name: 'bill1',
			hand: [
				{
					name: 'fireball',
					color: 'red',
				},
				{
					name: 'bloop',
					color: 'red',
				},
				{
					name: 'bloop2',
					color: 'red',
				},
				{
					name: 'bloop3',
					color: 'red',
				},
				{
					name: 'bloop4',
					color: 'red',
				},
			],
			deck: [
				{
					name: 'blur2',
					color: 'purple',
				}
			],
		},
		{
			name: 'bill2',
			hand: [
				{
					name: 'fireball',
					color: 'red',
				},
				{
					name: 'bloop',
					color: 'green',
				},
				{
					name: 'bloop2',
					color: 'green',
				},
				{
					name: 'bloop3',
					color: 'green',
				},
				{
					name: 'bloop4',
					color: 'green',
				},
			],
			deck: [
				{
					name: 'blur2',
					color: 'purple',
				}
			],
		},
		{
			name: 'bill3',
			hand: [
				{
					name: 'fireball',
					color: 'red',
				},
				{
					name: 'bloop',
					color: 'green',
				},
				{
					name: 'bloop2',
					color: 'blue',
				},
				{
					name: 'bloop3',
					color: 'yellow',
				},
				{
					name: 'bloop4',
					color: 'orange',
				},
			],
			deck: [
				{
					name: 'blur2',
					color: 'purple',
				}
			],
		},
		{
			name: 'bill4',
			hand: [
				{
					name: 'fireball',
					color: 'red',
				},
				{
					name: 'bloop',
					color: 'green',
				},
				{
					name: 'bloop2',
					color: 'blue',
				},
				{
					name: 'bloop3',
					color: 'yellow',
				},
				{
					name: 'bloop4',
					color: 'orange',
				},
			],
			deck: [
				{
					name: 'blur2',
					color: 'purple',
				},
				{
					name: 'blur2',
					color: 'purple',
				},
				{
					name: 'blur2',
					color: 'purple',
				},
			],
		},
	]
});


const Renderer = require('./components/Renderer.js');
const renderer = new Renderer({
	width: window.innerWidth,
	height: window.innerHeight,
	context: document.getElementById('root'),
	board: board,
})


board.dramaticEntry();
board.setMeshPositionDeep();



const uiState = {
	focusedPlayer: board.players[0],
	focusedCard: false,
}

board.on('cardClick', function(card){
	const player = card.getRoot('Player');

	if(player === uiState.focusedPlayer){
		if(uiState.focusedCard){
			card.swapPosition(uiState.focusedCard);
			board.setMeshPositionDeep();
			uiState.focusedCard = undefined;
		}else{
			uiState.focusedCard = card;
		}
	}

	uiState.focusedPlayer = player;
	return board.setCameraOnPlayer(player)

});




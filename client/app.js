global._ = require('lodash');

const THREE = require('three-js')();
require('./lib/CSS3DRenderer.js')(THREE);
require('./lib/TrackBallControls.js')(THREE);


const Board = require('./components/board/Board.js');


const colors = ['red', 'purple', 'yellow', 'green', 'orange'];
const board = new Board({
	renderer: renderer,
	players: [
		{
			name: 'bill1',
			hand: [
				{
					name: 'fireball',
					color: _.sample(colors),
				},
				{
					name: 'bloop',
					color: _.sample(colors),
				},
				{
					name: 'bloop2',
					color: _.sample(colors),
				},
				{
					name: 'bloop3',
					color: _.sample(colors),
				},
				{
					name: 'bloop4',
					color: _.sample(colors),
				},
			],
			deck: [
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
			],
		},
		{
			name: 'bill2',
			hand: [
				{
					name: 'fireball',
					color: _.sample(colors),
				},
				{
					name: 'bloop',
					color: _.sample(colors),
				},
				{
					name: 'bloop2',
					color: _.sample(colors),
				},
				{
					name: 'bloop3',
					color: _.sample(colors),
				},
				{
					name: 'bloop4',
					color: _.sample(colors),
				},
			],
			deck: [
				{
					name: 'blur2',
					color: _.sample(colors),
				}
			],
		},
		{
			name: 'bill3',
			hand: [
				{
					name: 'fireball',
					color: _.sample(colors),
				},
				{
					name: 'bloop',
					color: _.sample(colors),
				},
				{
					name: 'bloop2',
					color: _.sample(colors),
				},
				{
					name: 'bloop3',
					color: _.sample(colors),
				},
				{
					name: 'bloop4',
					color: _.sample(colors),
				},
			],
			deck: [
				{
					name: 'blur2',
					color: _.sample(colors),
				}
			],
		},
		{
			name: 'bill4',
			hand: [
				{
					name: 'fireball',
					color: _.sample(colors),
				},
				{
					name: 'bloop',
					color: _.sample(colors),
				},
				{
					name: 'bloop2',
					color: _.sample(colors),
				},
				{
					name: 'bloop3',
					color: _.sample(colors),
				},
				{
					name: 'bloop4',
					color: _.sample(colors),
				},
			],
			deck: [
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
				},
				{
					name: 'blur2',
					color: _.sample(colors),
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
	const cardGroup = card.getRoot('CardGroup');

	if(cardGroup.groupType==='deck'){
		cardGroup.shuffle();
		return board.setMeshPositionDeep();
	}

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




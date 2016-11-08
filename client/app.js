global._ = require('lodash');

const THREE = require('three-js')();
require('./lib/CSS3DRenderer.js')(THREE);
require('./lib/TrackBallControls.js')(THREE);


const Board = require('./components/board/Board.js');

const board = new Board({
	centerGroup: {
		groupType: 'center',
		children: [
			{
				name: 'fireball',
				color: 'red',
			},
		]
	},
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

board.setMeshPositionDeep();

let selectedCard;
board.on('cardClick', function(card){

	console.log(card.getRoot('Player'));

	if(selectedCard){
		card.swapPosition(selectedCard);
		board.setMeshPositionDeep();
		selectedCard = undefined;
	}else{
		selectedCard = card;
	}
});


// setInterval(function(){
// 	_.each(board.players, function(player){
// 		player.hand.shuffle();

// 		let type = player.field.groupType
// 		player.field.groupType = player.hand.groupType
// 		player.hand.groupType = type

// 	})
// 	board.players = _.shuffle(board.players);
// 	board.setMeshPositionDeep();
// }, 1000)




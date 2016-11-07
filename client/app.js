global.React = require('react');
global.Component = require('react').Component;
global.CSSModules = require('react-css-modules');
global._ = require('lodash');



const board = require('./components/board/board.js');

var render = board.renderDeep.bind(board, document.getElementById('root'));

// render();
setInterval(function(){
	board.positionPlayers();
	board.positionCenterGroup();
	_.each(board.players, function(player){
		// player.hand.shuffle();
		// player.hand.positionAsHand();

		const hand = player.hand;

		player.hand = player.field
			.positionAsHand();

		player.field = hand
			.positionAsField();
	})
	// board.players = _.shuffle(board.players);

	render();
}, 1000)




// const ReactDom = require('react-dom');
// const Login = require('./components/login/login.jsx');
// ReactDom.render(
// 	<Login></Login>,
// 	document.getElementById('root')
// );

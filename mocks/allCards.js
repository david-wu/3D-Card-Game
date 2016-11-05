const CardGroup = require('../models/CardGroup.js')

module.exports = CardGroup.fromOptions({
	cards: [
		{
			name: 'Spark',
			cost: 2,
			colors: {
				red: true,
			},
			play: function(board, options){
				options.otherPlayers.mill(2);
			}
		},
		{
			name: 'Bandage',
			cost: 2,
			colors: {
				white: true,
			},
			play: function(board, options){
				options.player.unmill(2);
			}
		},
		{
			name: 'Fireball',
			cost: 5,
			colors: {
				red: true,
			},
			play: function(board, options){
				options.otherPlayers.mill(5);
			}
		},
		{
			name: 'Heal',
			cost: 5,
			colors: {
				white: true,
			},
			play: function(board, options){
				options.player.unmill(5);
			}
		},
		{
			name: 'Terror',
			cost: 5,
			colors: {
				black: true,
			},
			play: function(board, options){
				options.otherPlayers.discard(1);
			}
		},
		{
			name: 'Research',
			cost: 5,
			colors: {
				blue: true,
			},
			play: function(board, options){
				options.player.draw(1);
			}
		},
		{
			name: 'Cannon',
			cost: 5,
			colors: {
				brown: true,
				red: true,
			},
			play: function(board, options){
				options.player.draw(1);
				board.addPermanent({
					name: 'Cannon',
					actions: {
						main: function(){
							options.otherPlayers.mill(1);
						}
					}
				})
			}
		},
		{
			name: 'Hospital',
			cost: 5,
			colors: {
				brown: true,
				white: true,
			},
			play: function(board, options){
				options.player.draw(1);
				board.addPermanent({
					name: 'Hospital',
					actions: {
						main: function(){
							options.player.unmill(1);
						}
					}
				})
			}
		},
		{
			name: 'Firestorm',
			cost: 7,
			colors: {
				red: true,
				black: true,
			},
			play: function(board, options){
				options.otherPlayers.mill(10);
				options.player.mill(10);
			}
		},
		{
			name: 'Hysteria',
			cost: 7,
			colors: {
				black: true,
			},
			play: function(board, options){
				options.player.discard(1);
				options.otherPlayers.discard(2);
			}
		},
		{
			name: 'Religion',
			cost: 7,
			colors: {
				black: true,
				white: true,
			},
			play: function(board, options){
				options.player.discard(1);
				options.player.draw(1);
			}
		},
	]
})
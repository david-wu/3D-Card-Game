
class Player{

	constructor(options){
		_.extend(this, options)
		_.defaults(this, {
			name: 'name',
			deck: [],
			hand: [],
			grave: [],
		});
	}

	// takeTurn(game){
	// 	return new Promise((res, rej)=>{

	// 		setTimeout(function(){
	// 			res({
	// 				cause: 'outOfTime'
	// 			});
	// 		}, 15000);

	// 		this.draw();

	// 	});
	// }

	takeTurn(){
		console.log('player '+this.name+' starting turn');
		return new Promise((res, rej)=>{
			setTimeout(()=>{
				console.log('player '+this.name+' finishing turn')
				res({});
			}, 1000 + Math.random()*3000)
		})
	}

	draw(count=1){
		_.times(count, ()=>{
			this.hand.push(this.deck.pop());
		})
	}


}

module.exports = Player
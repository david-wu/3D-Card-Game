
const Player = require('./player/player.jsx');
const board = require('./board.js');

class Board extends Component{

	constructor(props){
		super(props);
		this.state = {

			players: [
				{
					name: 'bill',
					hand: [
						{
							name: 'fireball'
						},
						{
							name: 'bloop'
						},
					],
					deck: [
						{
							name: 'blur'
						}
					],
				}
			]

		}

	}

	changeHandler(event){
		this.setState({
			name: event.target.value
		});
	}

	componentWillMount(){
		var render = board.renderDeep.bind(board, document.getElementById('center-root'));

		// render();
		setInterval(function(){
			board.positionPlayers();
			board.positionCenterGroup();
			_.each(board.players, function(player){
				player.hand.shuffle();
				player.hand.positionAsHand();
			})
			render();
		}, 1000)

	}

	render(){
		return <div></div>
	}
}

const styles = require('./board.scss');

module.exports = CSSModules(Board, styles, {
	allowMultiple: true,
	errorWhenNotFound: false,
})
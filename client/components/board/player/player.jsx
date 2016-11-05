
const CardGroup = require('../cardGroup/cardGroup.jsx');

class Player extends Component{

	constructor(props){
		super(props);

	}

	render(){

		return <div styleName='container'>
			<div styleName="name">{this.props.name}</div>
			<CardGroup cards={this.props.hand} />
		</div>
	}
}

const styles = require('./player.scss');
module.exports = CSSModules(Player, styles, {
	allowMultiple: true,
	errorWhenNotFound: false,
})

const Card = require('../card/card.jsx');

class CardGroup extends Component{

	constructor(props){
		super(props);

		this.state = {

		}
	}

	componentWillMount(){

	}

	render(){

		const hand = _.map(this.props.cards, function(card, i){
			card.key = i;
			return <Card {...card}/>
		})

		return <div styleName='container'>
			<div styleName="name">{this.props.name}</div>
			<div styleName="hand">
				{hand}
			</div>
		</div>
	}
}

const styles = require('./cardGroup.scss');
module.exports = CSSModules(CardGroup, styles, {
	allowMultiple: true,
	errorWhenNotFound: false,
})
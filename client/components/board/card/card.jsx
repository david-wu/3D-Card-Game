
class Card extends Component{

	constructor(props){
		super(props);

	}

	changeHandler(event){
		this.setState({
			name: event.target.value
		});
	}

	render(){
		return <div styleName='container'>
			<div styleName="name">{this.props.name}</div>
		</div>
	}
}

const styles = require('./card.scss');
module.exports = CSSModules(Card, styles, {
	allowMultiple: true,
	errorWhenNotFound: false,
})
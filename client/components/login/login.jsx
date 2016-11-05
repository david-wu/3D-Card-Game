
class LoginEl extends Component{

	constructor(props){
		super(props);

		this.state = {
			name: ''
		}

	}

	changeHandler(event){
		this.setState({
			name: event.target.value
		});
	}

	render(){

		return <div styleName='container'>
			<label>
				name:
				<input
					type='string'
					placeholder='Enter name..'
					onChange={this.changeHandler.bind(this)}
					value={this.state.name} />
			</label>
		</div>
	}
}

const styles = require('./login.scss');
module.exports = CSSModules(LoginEl, styles, {
	allowMultiple: true,
	errorWhenNotFound: false,
})
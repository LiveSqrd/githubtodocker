var React = require("react")
var Router = require("react-router")
var Link = Router.Link

var Header = React.createClass({
	displayName: "Header",
	propTypes: {},
	mixins: [],

	getInitialState: function () { return null; },
	handleClick: function(){},
	componentWillMount: function () {},
	componentWillUnmount: function () {},
	render: function () {
		return (
			<div className="mainHeader">
				<div className="contentWrapper">
					<Link className="logo" to="app"><i></i>Logo</Link>
					<Link className="link pricing" to="pricing"><i></i>It&apos;s free</Link>
					<Link className="link about" to="about"><i></i>Why we made it</Link>
				</div>
			</div>
		)
	}
})

module.exports = Header
 
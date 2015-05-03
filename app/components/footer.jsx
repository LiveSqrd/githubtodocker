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
			<div className="mainFooter">
			<div className="contentWrapper">
				<Link to="app" className="logo">logo</Link>
				<Link to="pricing">Pricing</Link>
				<Link to="about">About</Link>
			
				<span><a href="mailto:pell@lsq.com" target="_top">Contact</a> Pelle, he&apos;s got your back :)</span>

				<h5 className="firstchild"> Thank You TechCrunch Disrupt NYC 2015</h5>
				<h5> With love from <a href="http://lsq.io" target="_blank">LSQ.io</a> &amp; <a href="http://haystack.im" target="_blank"> Haystack.im</a></h5>
			</div>
			</div>
		)
	}
})

module.exports = Header
 
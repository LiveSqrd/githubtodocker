var React = require("react")
var Router = require("react-router")
var Link = Router.Link

var Header = React.createClass({
  displayName: "Header",

	render: function () {
		return (
			<div className="mainHeader">
				<div className="contentWrapper">
					<Link to="/">
            <h1>ContainerFactory.io</h1>
          </Link>

				</div>
			</div>
		)
	}
})

module.exports = Header
 
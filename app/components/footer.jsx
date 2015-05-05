var React = require("react")
var Router = require("react-router")
var Link = Router.Link

var Header = React.createClass({
	displayName: "Header",

  render: function () {
		return (
			<div className="mainFooter">
        <div className="contentWrapper">
          <p className="footer-text">A joint project between Haystack.io and LSQ.io</p>
        </div>
			</div>
		)
	}
})

module.exports = Header
 
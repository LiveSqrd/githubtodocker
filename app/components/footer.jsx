var React = require("react")
var Router = require("react-router")
var Link = Router.Link

var Header = React.createClass({
	displayName: "Header",

  render: function () {
		return (
			<div className="mainFooter">
        <div className="contentWrapper">

          <ul className="list-inline footer-text">
            <li>
              <span>Built at Disrupt NY Hackathon 2015 by &nbsp;
                <a href="https://lsqio.io" target="_blank">Haystack.im</a> &amp; &nbsp;
                <a href="https://haystack.im" target="_blank">LSQ.io</a>
              </span>
            </li>
            <li>|</li>
            <li>
              <span>
                <a href="https://github.com/lsqio" target="_blank">View the source code</a> on GitHub
              </span>
            </li>
          </ul>

        </div>
			</div>
		)
	}
})

module.exports = Header
 
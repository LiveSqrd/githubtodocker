var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler
var Link = Router.Link

var About = React.createClass({
  displayName: "About",
  propTypes: {},
  mixins: [],
  getInitialState: function () { return null; },
  componentWillMount: function () {},

  componentWillUnmount: function () {},

  render: function () {
    return (
      <div className="pricing">
        <div className="hero">
        <div className="contentWrapper">
          <h1>&#36;0.00</h1>
          <h1>We believe that a pollution free factory is your god given right.</h1>
          <h2>We work hard making apps, we deserve a treat.</h2>
        </div>
        </div>

        <RouteHandler />
      </div>
    );
  }
});

module.exports = About;



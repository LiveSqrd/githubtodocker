var React = require("react")
var Router = require("react-router")
var RouteHandler = Router.RouteHandler
var Header = require("./header.jsx")
var Footer = require("./footer.jsx")

var App = React.createClass({
  displayName: "App",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return null; },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  render: function () {
    return (
      <div className="MainAppWrap">
        <Header />
        <RouteHandler {...this.props} />
        <Footer />
      </div>
    );
  }
});

module.exports = App;
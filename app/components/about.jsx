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
      <div className="about">
        <div className="hero">
        <div className="contentWrapper">
          <h1>What the world needs is <b>yet</b> another Docker related app.</h1>
          <h2>All jokes aside, it just takes way too long to do this &#37;&#35;&#42;&#33; and we think saving you time is a genuinely noble endeavour.</h2>
        </div>
        </div>
        <div className="more">
        <div className="contentWrapper">
          <h2>We help you pollute less. Be <b>greener</b>. Make Elon happy.</h2>
          <h3>Say what&#33; How can a web app service thingy have anything to do with pollution?</h3>
          <p className="ppp">
            Well let me explain. By using ContainerFactory.io you save time which translates into saved electricity which means less popullution.
            How much less you ask, about 244.94 grams less.
            Google the numbers yourself :)
          </p>

          <h2 className="ccc">Technolgies</h2>
          <p className="ppp ddd">ContainerFactory.io could not be possible without these and many more projects and peoples. </p>
          <ul>
            <li>
              <span></span> Docker
            </li>
            <li>
              <span></span> Docker
            </li>
            <li>
              <span></span> Docker
            </li>
          </ul>
        </div>
        </div>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = About;



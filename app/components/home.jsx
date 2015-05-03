var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler
var Link = Router.Link

var Home = React.createClass({
  displayName: "Home",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return null; },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  render: function () {
    return (
      <div className="landing">        
        <div className="hero">
        <div className="contentWrapper">
          <h1>Build <i className='dockerLogo'></i>images faster.</h1>
          <h2>Pollution free container packaging in under 20 seconds.</h2>
          <h2 className="lastChild"> 
            Don&apos;t believe me? 
            <Link to="about"> Learn More</Link>
          </h2>
          <a href="/auth/github" className="gitlogin"><i></i>Get started</a>
        </div>
        </div>
        <div className="break">
        <div className="contentWrapper">
          <h2> 
            P.S. It&#39;s all free. Find out 
            <Link to="pricing"><i></i> why.</Link>
          </h2>
        </div>  
        </div>

        <div className="more">
        <div className="contentWrapper">
          <i className="gear"></i>
          <h2>Build in 3 easy steps.</h2>
          <h2 className="lastChild"> So easy a Ruby on Rails developer can do it.</h2>
          <span className="list">
            <span>
              <h3>Pull from github</h3>
              <p>Choose from your public and private repos.</p>
            </span>
            <span>
              <h3>Add your registry</h3>
              <p>Fill out all the required and optional registry fields.</p>
            </span>
            <span>
              <h3>Let the factory do it&apos;s thing</h3>
              <p>Don&apos;t worry it&apos;s going to take less than 5 blinks.</p>
              <small>Read more about blinking <a href="http://www.smithsonianmag.com/science-nature/why-do-we-blink-so-frequently-172334883/?no-ist=">here</a>, you&apos;re welcome.</small>
            </span>
          </span>
        </div>
        </div>        
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Home;
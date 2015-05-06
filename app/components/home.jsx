var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler
var Link = Router.Link

var Home = React.createClass({
  displayName: "Home",

  render: function () {

    return (

      <div className="landing">

        <div className="hero">

          <div className="container">
            <h1 className="hidden-xs">Container Factory</h1>
            <h2>Turn your Github repo into a published container image</h2>

            <div className="row imageRow hidden-xs">
              <div className="col-sm-offset-2 col-sm-3 text-center">
                <i className='githubLogo'></i>
                <h2>source code </h2>
              </div>

              <div className="col-sm-2 text-center">
                <i className='arrowImage'></i>
              </div>

              <div className="col-sm-3 text-center">
                <i className='dockerLogo'></i>
                <h2>docker image</h2>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a href="/auth/github" className="gitlogin">
              <i></i> Get started
            </a>
          </div>

        </div>

        <div className="break-home text-center">
          <div className="container">
            <div className="row">

              <div className="col-sm-4">
                <h2>1. Select a GitHub repository</h2>
                <p>Sign in with GitHub and select one of your public or private repositories.</p>
              </div>

              <div className="col-sm-4">
                <h2>2. Provide your registry credentials</h2>
                <p>Enter your credentials from your favorite container registry. You'll need your email address, your username and your password.</p>
              </div>

              <div className="col-sm-4">
                <h2>3. Collect your container!</h2>
                <p>In about a minute, your project will be available as a container in your container registry!</p>
              </div>

            </div>
          </div>
        </div>

      </div>
    );
  }
});

module.exports = Home;
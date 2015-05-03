var React = require("react")
var Router = require("react-router")
var RouteHandler = Router.RouteHandler
var Link = Router.Link

var Single = React.createClass({
  displayName: "Single",
  propTypes: {},
  mixins: [],

  getInitialState: function () { return null; },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  render: function () {
    return (
      <div className="repo">        
        <div className="hero">
        <div className="contentWrapper">
          <h2>Step 2: Fill in the required information</h2>
        </div>
        </div>        
        <div className="more">
        <div className="contentWrapper">
          <form className="createForm" action="/api/v1/build">
          <fieldset>
          <legend>Registry Details</legend>
          
          <div>
            <label for="email">Email:</label>
            <input name="email" type="email" placeholder="ex: bob@bobbyland.com" required autofocus />
          </div>
          <div>
            <label for="username">Username:</label>
            <input name="username" type="text" placeholder="ex: bob" required autofocus />
          </div>
          <div>
            <label for="password">Password:</label>
            <input name="password" type="password" placeholder="6 digits, a combination of numbers and letters" required />
          </div>
          <div>
            <label for="serverAddress">Server Address:</label>
            <input name="serverAddress" type="text" placeholder="ex: bob" required autofocus />
          </div>
          <div>
            <label for="tar">Repo Tar:</label>
            <input name="tar" type="text" placeholder="" value="" required autofocus />
          </div>

          <div>

            <label for="image">Image:</label>
            <input name="image" type="text" placeholder="scope/name" required />
          </div>
          <div>
            <input name="create" type="submit" value="Create" />
          </div>
          </fieldset>
          </form>
        </div>
        </div>        
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Single;

// , username = req.body.username
// , password = req.body.password
// , serverAddress = req.body.serverAddress
// , tar = req.body.tar
// , image = req.body.image


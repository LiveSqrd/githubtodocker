var React = require("react")
var Router = require("react-router")
var request = require("superagent")
var State = require('react-router').State
var Navigation = require('react-router').Navigation
var RouteHandler = Router.RouteHandler
var Link = Router.Link

var Single = React.createClass({
  displayName: "Single",
  propTypes: {},
    mixins: [State, Navigation],

  getInitialState: function () {
   return {
     email:""
    ,username:""
    ,password:""
    ,serverAddress:"https://index.docker.io/v1/"
    ,tar:"https://github.com/"+this.getParams().user+"/"+this.getParams().repo+"/archive/master.tar.gz"
    ,image:this.getParams().user+"/"+this.getParams().repo
    ,message:""
    ,building:false
  };
  },

  componentWillMount: function () {},

  componentWillUnmount: function () {},

  handleChange: function (name, e) {
    var change = {}
    change[name] = e.target.value;
    this.setState(change)
  }, 

  sendto:function () {
    var that = this;
    that.setState({building:true}) 
   request
    .post("/api/v1/build",this.state)
    .set("Accept", "application/json")
    .end(function (error, res) {      
      that.setState({message:res.text})        
    })
  },

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
         { this.state.building ?
            <h2>{ this.state.message ? "Done" : "building"}</h2>
           :  
          <fieldset className="createForm">
          <legend>Registry Details</legend>
          
          <div>
            <label for="email">Email:</label>
            <input name="email" type="email" value={this.state.email} onChange={this.handleChange.bind(this, 'email') } placeholder="ex: bob@bobbyland.com" required autofocus />
          </div>
          <div>
            <label for="username">Username:</label>
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange.bind(this, 'username') } placeholder="ex: bob" required autofocus />
          </div>
          <div>
            <label for="password">Password:</label>
            <input name="password" type="password" value={this.state.password} onChange={this.handleChange.bind(this, 'password') } placeholder="6 digits, a combination of numbers and letters" required />
          </div>
          <div>
            <label for="serverAddress">Server Address:</label>
            <input name="serverAddress" type="text" value={this.state.serverAddress} onChange={this.handleChange.bind(this, 'serverAddress') } placeholder=" ex: https://index.docker.io/v1/" required autofocus />
          </div>
          <div>
            <label for="tar">Repo Tar:</label>
            <input name="tar" type="text" value={this.state.tar} onChange={this.handleChange.bind(this, 'tar') } placeholder="ex: https://github.com/username/repo/archive/branch.tar.gz"  required autofocus />
          </div>

          <div>

            <label for="image">Image:</label>
            <input name="image" value={this.state.image} onChange={this.handleChange.bind(this, 'image') } type="text" placeholder="scope/name" required />
          </div>
          <div>

            <button name="create" onClick={this.sendto} >Create
             </button>
          </div>
          </fieldset>

        }
        { this.state.message ? 
          <textarea>{this.state.message}</textarea>
          : null}
        </div>
       
        
        
        </div>        
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Single;


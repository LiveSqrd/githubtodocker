var React = require("react")
var Router = require("react-router")
var request = require("superagent")
var State = require('react-router').State
var Navigation = require('react-router').Navigation
var RouteHandler = Router.RouteHandler
var hyperquest = require('hyperquest')
var http = require('http-browserify')
var _ = require('underscore')
var Link = Router.Link

var Single = React.createClass({
  displayName: "Single",
  propTypes: {},
  mixins: [State, Navigation],

  getInitialState: function () {
    this.message = [];
    this.followLogs =true;
    return {
      email:""
      ,username:""
      ,password:""
      ,serverAddress:"https://index.docker.io/v1/"
      ,tar:""
      ,image:this.getParams().user+"/"+this.getParams().repo
      ,message:""
      ,status:""
      ,branches:[]
      ,branch:"master"
    };
  },
  componentDidMount: function () {
    var that = this;
    if(this.isMounted()) {
      this.getTar(this.state.branch)
      request
        .get("/api/v1/repoBranches/"+this.getParams().user+"/"+this.getParams().repo)
        .end(function (error, res) {
          if(!error && _.isArray(res.body.result))
            that.setState({ branches: res.body.result})
        })
    }
  },
  getTar:function(branch){
    var that = this
    if(this.getParams().private != "true")
      return this.setState({tar:"https://github.com/"+this.getParams().user+"/"+this.getParams().repo+"/archive/"+(branch || this.state.branch)+".tar.gz"})

    request
      .get("/api/v1/tar/"+this.getParams().user+"/"+this.getParams().repo+"/"+(branch || this.state.branch))
      .end(function (error, res) {
        if(!error)
          that.setState({ tar: res.body.result})
      })
  },
  handleChange: function (name, e) {
    var change = {}
    change[name] = e.target.value;
    this.setState(change)
    if(name=="branch")
      this.getTar(e.target.value)
  },
  sendto:function () {
    var that = this;
    var opts = {
      path:'/api/v1/build'
      ,method:'POST'
      ,headers:{'content-type':'application/json'}
    }

    this.setState({status:"Building"})
    opts.port = window.location.port
    opts.host = window.location.host

    var result = ""
    var status;
    var req = http.request(opts, function(res) {
      var info = "";
      res.on('data', function (chunk) {
        result +=chunk
        info += chunk
        var rest = ""
        var breaks = info.split(/\n/)
        var arr = []
        for(var i = 0; i < breaks.length; i ++){
          var piece = breaks[i]
          try{
            var data = JSON.parse(piece)

            var push = data.stream  ||  "";
            push += " " + (data.status || "")
            push += " " + (data.progress || "")
            push = push
              .replace("\n","")
              .replace(/\033\[[0-9;]*m/,"")
              .replace("\[0m","")
              .replace("\u001B","")
            that.message.push(push)
          }catch(e){
            rest += piece
          }
        }
        info = rest
        that.setState({message:"mess"+arr.length})
      })
      res.on("end",function(){
        that.setState({status:"Done"})
      })
    })
    req.on('error', function(e) {
      console.log("error",e)
    })
    req.end(JSON.stringify(that.state))
  },
  scrollHandler:function(e){

    var elem = document.getElementById("logs")
    //var scrollTop = elem.scrollTop
    //var scrollHeight = elem.scrollHeight
    //var height = elem.clientHeight
    var wheelDelta = elem.scrollTop + elem.clientHeight + 20
    var isDeltaPositive =  wheelDelta >= elem.scrollHeight
    this.followLogs = isDeltaPositive
  },

  render: function () {

    var that = this
    var scrollElem = document.getElementById("logs")
    var options = this.state.branches.map(function(branch){ return(<option value={branch}>{branch}</option>)} )

    setTimeout(function(){
      if(that.followLogs && scrollElem)
        scrollElem.scrollTop = scrollElem.scrollHeight
    },400)

    return (
      <div className="repo">
        <div className="hero">
          <div className="contentWrapper">
            <h2>{ this.state.status == "" ? "Step 2: Fill in the required information" :"Step 3: Build"} </h2>
          </div>
        </div>

        <div className="more">
          <div className="contentWrapper">

            { this.state.status == "" ?

              <div className="row">
                <div className="col-sm-6">

                  <form className="form">

                    <fieldset className="">
                      <legend>Registry Details</legend>

                      <div>
                        <label for="email">Email </label>
                        <input className="form-control" name="email" type="email" value={this.state.email} onChange={this.handleChange.bind(this, 'email') } placeholder="ex: bob@bobbyland.com" required autofocus />
                      </div>
                      <div>
                        <label for="username">Username:</label>
                        <input className="form-control" name="username" type="text" value={this.state.username} onChange={this.handleChange.bind(this, 'username') } placeholder="ex: bob" required autofocus />
                      </div>
                      <div>
                        <label for="password">Password:</label>
                        <input className="form-control" name="password" type="password" value={this.state.password} onChange={this.handleChange.bind(this, 'password') } placeholder="6 digits, a combination of numbers and letters" required />
                      </div>
                      <div>
                        <label for="serverAddress">Server Address:</label>
                        <input className="form-control" name="serverAddress" type="text" value={this.state.serverAddress} onChange={this.handleChange.bind(this, 'serverAddress') } placeholder=" ex: https://index.docker.io/v1/" required autofocus />
                      </div>
                      <div>
                        <label for="image">Image:</label>
                        <input className="form-control" name="image" value={this.state.image} onChange={this.handleChange.bind(this, 'image') } type="text" placeholder="scope/name" required />
                      </div>

                      <button className="btn btn-lg btn-default" name="create" onClick={this.sendto} >Create</button>

                    </fieldset>
                  </form>

                </div>

                <div className="col-sm-6">
                  <fieldset className="">
                    <legend>GitHub Repository Details</legend>
                    <p>GitHub user: {this.getParams().user}</p>
                    <p>Repository: {this.getParams().repo}</p>

                    <label for="tar">Select a branch:</label>
                    <select className="form-control" name="branch" value={this.state.branch} onChange={this.handleChange.bind(this, 'branch') }required>
                      {options}
                    </select>
                    <br/>
                  </fieldset>
                </div>

              </div>

              :

              <ul className="logs" id="logs" onScroll={this.scrollHandler}>
                {
                  this.message.map(function(obj){
                    return (<li>{obj}</li>)
                  })
                }
              </ul>
            }
            <h2>{ this.state.status}</h2>
          </div>
        </div>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Single;

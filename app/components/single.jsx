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
      ,branch:this.getParams().branch || "master"
      ,private: this.getParams().private == "true"
      ,user:this.getParams().user
      ,repo:this.getParams().repo
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
    if(!this.state.private)
      return this.setState({tar:"https://github.com/"+this.state.user+"/"+this.state.repo+"/archive/"+(branch || this.state.branch)+".tar.gz"})

    request
      .get("/api/v1/tar/"+this.state.user+"/"+this.state.repo+"/"+(branch || this.state.branch))
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
  sendto:function (e) {
    e.preventDefault()

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

    var options = this.state.branches.map(function(branch, index){ return(<option value={branch} key={index}>{branch}</option>)} )

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

        <div className="container">

          { this.state.status == "" ?

            <div className="row">

              <div className="col-sm-6">

                <form className="form">
                  <fieldset>
                    <legend>Container Registry Details</legend>
                    <p>Enter your container registry credentials. If you do not have an account with a container registry you will need to create one.</p>

                    <div>
                      <label htmlFor="email">Email</label>
                      <input className="form-control" name="email" type="email" value={this.state.email} onChange={this.handleChange.bind(this, 'email') } placeholder="ex: email@example.com" required autofocus />
                    </div>
                    <div>
                      <label htmlFor="username">Username</label>
                      <input className="form-control" name="username" type="text" value={this.state.username} onChange={this.handleChange.bind(this, 'username') } placeholder="ex: bob" required autofocus />
                    </div>
                    <div>
                      <label htmlFor="password">Password</label>
                      <input className="form-control" name="password" type="password" value={this.state.password} onChange={this.handleChange.bind(this, 'password') } placeholder="6 digits, a combination of numbers and letters" required />
                    </div>
                    <div>
                      <label htmlFor="image">Container Image Name</label>
                      <input className="form-control" name="image" value={this.state.image} onChange={this.handleChange.bind(this, 'image') } type="text" placeholder="scope/name" required />
                    </div>
                    <div>
                      <label htmlFor="serverAddress">Registry Server Address</label>
                      <input className="form-control" name="serverAddress" type="text" value={this.state.serverAddress} onChange={this.handleChange.bind(this, 'serverAddress') } placeholder=" ex: https://index.docker.io/v1/" required autofocus />
                    </div>


                  </fieldset>
                </form>

              </div>

              <div className="col-sm-6">

                <form>
                  <fieldset className="">
                    <legend>GitHub Repository Details</legend>

                    <div>
                      <label htmlFor="githubUser">GitHub Account</label>
                      <input className="form-control" name="githubUser" type="text" value={this.getParams().user} disabled/>
                    </div>
                    <div>
                      <label htmlFor="githubRepo">Repository</label>
                      <input className="form-control" name="githubRepo" type="text" value={this.getParams().repo} disabled/>
                    </div>

                    <label htmlFor="tar">Select a branch:</label>
                    <select className="form-control" name="branch" value={this.state.branch} onChange={this.handleChange.bind(this, 'branch') }required>
                      {options}
                    </select>
                    <br/>
                  </fieldset>
                </form>

              </div>

              <div className="col-sm-12 text-center">
                <button className="btn btn-lg btn-success create-button" name="create" onClick={this.sendto} >Create container and publish</button>
              </div>

            </div>

            :

            <div className="row">
              <div className="col-sm-3">
                <h2>{ this.state.status}</h2>
              </div>
              <div className="col-sm-9">
                <ul className="logs" id="logs" onScroll={this.scrollHandler}>
                  {
                    this.message.map(function(obj){
                      return (<li>{obj}</li>)
                    })
                  }
                </ul>
              </div>


            </div>
          }

        </div>


      </div>
    );
  }
});

module.exports = Single;

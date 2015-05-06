var request = require("superagent")
var React = require("react");
var Router = require("react-router");
var Navigation = Router.Navigation
var RouteHandler = Router.RouteHandler;
var Link = Router.Link
var ghUrl = require('github-url-to-object')

var Repo = React.createClass({
	displayName: "Repo",
	contextTypes: {
		router: React.PropTypes.func
	},

	 mixins: [Navigation],

	getInitialState: function () {
		return {
      repos: []
      , isLoading: false
      , error: ""
      ,repo:""
  		,branch:""
  		,user:""
  		,private:""}
	},

	componentDidMount: function () {
		var that = this;
    that.setState({ isLoading: true})

		if(this.isMounted()) {
			request
		    .get("/api/v1/repos")
		    .end(function (error, res) {              
		      if(error){
            that.setState({ error: error})
		      } else{
		      	that.setState({
              repos: res.body.result
              , isLoading: false
            })
		      }

		    })
		}
	}, changeGhUrl:function(event){
	    var git = ghUrl( event.target.value)
	    if(git){
	    	this.setState({repo: git.repo, user: git.user, branch: git.branch})
	    }
	  },
	goToGHRepo:function(){
		   event.preventDefault()
		if(this.state.repo && this.state.user && this.state.branch)
			this.transitionTo("single",{repo: this.state.repo, user: this.state.user, branch: this.state.branch,private:"false"})
	},
	createRepoNodes: function (repos) {	

		var nodes = repos.map(function (repos) {
			var url = "/#/repo/" + repos.full_name+"/"+repos.branch+"/"+repos.private;
			return (				
				<a href={url} className="singleRepo" >
          <h5 className="repoName">{repos.full_name}
            <small className="text-uppercase">{repos.private ? " Private": " Public"}</small>
          </h5>
          <p> {repos.url}</p>
				</a>
			);
		});

		return nodes;
	},
	render: function () {		

    var listRepos = this.createRepoNodes(this.state.repos)

		return (
			<div className="repo">        
				<div className="hero">
          <div className="contentWrapper">
            <h2>Step 1: Select a repository</h2>
          </div>
				</div>

				<div className="break">
          <div className="contentWrapper">
            <div className="tableHeader">
              <span>Your GitHub Repositories</span>
            </div>
          </div>
				</div>

				<div className="more">
          <div className="contentWrapper">
            <div className="listingRepos">
      			<div  className="singleRepo" >
      				<form className="form"  onSubmit={this.goToGHRepo}>
		            	<label  >Put in a public github url</label>
		            	<input className="form-control"  type="text" onChange={this.changeGhUrl} placeholder="https://github.com/lsqio/container-factory/tree/master" />
		            	<input className="form-control"  type="submit" value="Next" disabled={(!this.state.repo || !this.state.user || !this.state.branch)}  />
             
             		</form>
             	</div>
             {this.state.isLoading ?
                <h5 className="text-center steps-padding">Loading...</h5>
                :
                {listRepos}
              }

            </div>
          </div>
				</div>        
				<RouteHandler />
			</div>
		);
	}
});

module.exports = Repo;
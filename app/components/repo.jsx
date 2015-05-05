var request = require("superagent")
var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link

var Repo = React.createClass({
	displayName: "Repo",
	contextTypes: {
		router: React.PropTypes.func
	},

	getInitialState: function () {
		return {
      repos: []
      , isLoading: false
      , error: ""}
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
	},

	createRepoNodes: function (repos) {	

		var nodes = repos.map(function (repos) {
			var url = "/#/repo/" + repos.full_name;
			return (				
				<a href={url} className="singleRepo" key={repos.id}>
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
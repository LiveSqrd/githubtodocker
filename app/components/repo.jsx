var request = require("superagent")
var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var Link = Router.Link

var Repo = React.createClass({
	displayName: "Repo",
	propTypes: {},	
	mixins: [],
	contextTypes: {
		router: React.PropTypes.func
	},

	getInitialState: function () { 
		var that = this
		
		
		return { repos: []} 
	},
	componentDidMount: function () {
		var that = this;
		if(this.isMounted()) {
			request
		    .get("/api/v1/repos")
		    .end(function (error, res) {              
		      if(error){
		      	
		      } else{
		      	console.log(res.body)
		      	that.setState({ repos: res.body.result})
		      }

		    })
		}
	},
	componentWillUnmount: function () {},
	createRepoNodes: function (repos) {	
		console.log("sad",repos)
		var nodes = repos.map(function (repos) {
			var url = "/#/repo/"+repos.full_name;
			return (				
				<a href={url} className="singleRepo" key={repos.id}>
					<span className="long">{repos.full_name}</span>
					<span className="short">{repos.private ? "x": null}</span>
					<span className="long">{repos.description}</span>
					<span className="short">
						<a href={repos.html_url} target="_blank"> &gt; </a>
					</span>
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
				  <h2>Step 1: Pick a repo</h2>
				</div>
				</div>
				<div className="break">
				<div className="contentWrapper">
				  <div className="tableHeader">
				  	<span className="long">name</span>
				  	<span className="short">private</span>
				  	<span className="long">description</span>
				  	<span className="short">url</span>				  	
				  </div>
				</div>  
				</div>
				<div className="more">
				<div className="contentWrapper">
				  <div className="listingRepos">
				  	{listRepos}
				  </div>
				</div>
				</div>        
				<RouteHandler />
			</div>
		);
	}
});

module.exports = Repo;
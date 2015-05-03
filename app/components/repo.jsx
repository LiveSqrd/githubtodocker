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
		var repo = {
			id: 12532516,
			name: "bitstoberlin",
			full_name: "gagarigs/bitstoberlin",
			owner: {
			login: "gagarigs",
			id: 6877651,
			avatar_url: "https://avatars.githubusercontent.com/u/6877651?v=3",
			gravatar_id: "",
			url: "https://api.github.com/users/gagarigs",
			html_url: "https://github.com/gagarigs",
			followers_url: "https://api.github.com/users/gagarigs/followers",
			following_url: "https://api.github.com/users/gagarigs/following{/other_user}",
			gists_url: "https://api.github.com/users/gagarigs/gists{/gist_id}",
			starred_url: "https://api.github.com/users/gagarigs/starred{/owner}{/repo}",
			subscriptions_url: "https://api.github.com/users/gagarigs/subscriptions",
			organizations_url: "https://api.github.com/users/gagarigs/orgs",
			repos_url: "https://api.github.com/users/gagarigs/repos",
			events_url: "https://api.github.com/users/gagarigs/events{/privacy}",
			received_events_url: "https://api.github.com/users/gagarigs/received_events",
			type: "Organization",
			site_admin: false
			},
			private: false,
			html_url: "https://github.com/gagarigs/bitstoberlin",
			description: "Bits To Berlin Project",
			fork: false,
			url: "https://api.github.com/repos/gagarigs/bitstoberlin",
			forks_url: "https://api.github.com/repos/gagarigs/bitstoberlin/forks",
			keys_url: "https://api.github.com/repos/gagarigs/bitstoberlin/keys{/key_id}",
			collaborators_url: "https://api.github.com/repos/gagarigs/bitstoberlin/collaborators{/collaborator}",
			teams_url: "https://api.github.com/repos/gagarigs/bitstoberlin/teams",
			hooks_url: "https://api.github.com/repos/gagarigs/bitstoberlin/hooks",
			issue_events_url: "https://api.github.com/repos/gagarigs/bitstoberlin/issues/events{/number}",
			events_url: "https://api.github.com/repos/gagarigs/bitstoberlin/events",
			assignees_url: "https://api.github.com/repos/gagarigs/bitstoberlin/assignees{/user}",
			branches_url: "https://api.github.com/repos/gagarigs/bitstoberlin/branches{/branch}",
			tags_url: "https://api.github.com/repos/gagarigs/bitstoberlin/tags",
			blobs_url: "https://api.github.com/repos/gagarigs/bitstoberlin/git/blobs{/sha}",
			git_tags_url: "https://api.github.com/repos/gagarigs/bitstoberlin/git/tags{/sha}",
			git_refs_url: "https://api.github.com/repos/gagarigs/bitstoberlin/git/refs{/sha}",
			trees_url: "https://api.github.com/repos/gagarigs/bitstoberlin/git/trees{/sha}",
			statuses_url: "https://api.github.com/repos/gagarigs/bitstoberlin/statuses/{sha}",
			languages_url: "https://api.github.com/repos/gagarigs/bitstoberlin/languages",
			stargazers_url: "https://api.github.com/repos/gagarigs/bitstoberlin/stargazers",
			contributors_url: "https://api.github.com/repos/gagarigs/bitstoberlin/contributors",
			subscribers_url: "https://api.github.com/repos/gagarigs/bitstoberlin/subscribers",
			subscription_url: "https://api.github.com/repos/gagarigs/bitstoberlin/subscription",
			commits_url: "https://api.github.com/repos/gagarigs/bitstoberlin/commits{/sha}",
			git_commits_url: "https://api.github.com/repos/gagarigs/bitstoberlin/git/commits{/sha}",
			comments_url: "https://api.github.com/repos/gagarigs/bitstoberlin/comments{/number}",
			issue_comment_url: "https://api.github.com/repos/gagarigs/bitstoberlin/issues/comments{/number}",
			contents_url: "https://api.github.com/repos/gagarigs/bitstoberlin/contents/{+path}",
			compare_url: "https://api.github.com/repos/gagarigs/bitstoberlin/compare/{base}...{head}",
			merges_url: "https://api.github.com/repos/gagarigs/bitstoberlin/merges",
			archive_url: "https://api.github.com/repos/gagarigs/bitstoberlin/{archive_format}{/ref}",
			downloads_url: "https://api.github.com/repos/gagarigs/bitstoberlin/downloads",
			issues_url: "https://api.github.com/repos/gagarigs/bitstoberlin/issues{/number}",
			pulls_url: "https://api.github.com/repos/gagarigs/bitstoberlin/pulls{/number}",
			milestones_url: "https://api.github.com/repos/gagarigs/bitstoberlin/milestones{/number}",
			notifications_url: "https://api.github.com/repos/gagarigs/bitstoberlin/notifications{?since,all,participating}",
			labels_url: "https://api.github.com/repos/gagarigs/bitstoberlin/labels{/name}",
			releases_url: "https://api.github.com/repos/gagarigs/bitstoberlin/releases{/id}",
			created_at: "2013-09-02T05:15:22Z",
			updated_at: "2015-02-19T16:34:33Z",
			pushed_at: "2013-10-27T14:22:07Z",
			git_url: "git://github.com/gagarigs/bitstoberlin.git",
			ssh_url: "git@github.com:gagarigs/bitstoberlin.git",
			clone_url: "https://github.com/gagarigs/bitstoberlin.git",
			svn_url: "https://github.com/gagarigs/bitstoberlin",
			homepage: null,
			size: 121096,
			stargazers_count: 0,
			watchers_count: 0,
			language: "JavaScript",
			has_issues: true,
			has_downloads: true,
			has_wiki: true,
			has_pages: false,
			forks_count: 0,
			mirror_url: null,
			open_issues_count: 0,
			forks: 0,
			open_issues: 0,
			watchers: 0,
			default_branch: "master",
			permissions: {
			admin: true,
			push: true,
			pull: true}
			}
		
		return { repos: [repo]} 
	},
	componentDidMount: function () {
		if(this.isMounted()) {
			request
		    .get("/api/v1/repos")
		    .set("Accept", "application/json")
		    .end(function (error, res) {              
		      if(error){
		      	
		      } else{
		      	that.setState({ repos: res.result})
		      }

		    })
		}
	},
	componentWillUnmount: function () {},
	createRepoNodes: function (that) {	

		var nodes = that.state.repos.map(function (repos) {
			var url = "/#/repo/"+repos.id;
			return (				
				<a href={url} className="singleRepo" key={repos.id}>
					<span className="long">{repos.name}</span>
					<span className="short">{repos.private}</span>
					<span className="long">{repos.description}</span>
					<span className="short"><a href={repos.html_url} target="_blank"> &gt; </a></span>
				</a>
			);
		});
		return nodes;
	},
	render: function () {		
		var listRepos = this.createRepoNodes(this)
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
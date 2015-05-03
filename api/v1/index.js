var express = require('express')
  , api = express.Router()
  , request = require('request')
  , lsq = require('lsq')
  , sq
  , config
  , hyperquest = require('hyperquest')
  , hyperdirect = require('hyperdirect').request
  , zlib = require('zlib')
  , Tar = require('tar-stream')
  , EventEmitter = require('events').EventEmitter
  , GitHubApi = require("github")
  , github    = new GitHubApi({version: "3.0.0"})
  , _ = require('underscore')
  , path = require('path')

// lsq.config.get().then(function(c){
//   config = c
// })

api.get('/repos',function(req,res){
	var gitLogin = (req.session && req.session.auth && req.session.auth.github) ? req.session.auth.github : null 

	if(!_.isObject(gitLogin))
		return res.send({"err":"doesnt have github login"})

	github.authenticate({
		type: "oauth",
		token: gitLogin.accessToken
	})

	github.user.getOrgs({"per_page":100}, function(errO, orgs) {
		var counter = 0;
		var arr =[];
		var listRepos = function (){
			github.repos.getAll({"per_page":100}, function(err, resp) {
				arr = _.union(arr,_.pluck(resp,"full_name"));
				res.send({err:err, result:arr})
			});
		}
		if(orgs.length == counter)
			return listRepos();

		_.each(orgs,function(v){
			github.orgs.getTeams({org:v.login,"per_page":100}, function(errT, t) {
				if(t && _.findWhere(t,{"permission": "admin"}))
					github.orgs.getTeamRepos({id:_.findWhere(t,{"permission": "admin"}).id,"per_page":100}, function(err, repos) {
						counter++;
						arr = _.union(arr,_.pluck(repos,"full_name"))
						if(counter ==  orgs.length)
							listRepos();
					});
				else
					counter++;

				if(counter == orgs.length)
					listRepos();
			});
		})
	})
})

api.post('/build',function(req,res){
  var email = req.body.email
  	, username = req.body.username
  	, password = req.body.password
  	, serverAddress = req.body.serverAddress
  	, tar = req.body.tar
  	, image = req.body.image
	, config = {}
	, writer

	config[serverAddress] = {
        email: email,
        username: username,
        password: password,
        serverAddress: serverAddress 
    }
   // lsq.services.get("factory")
   // .then(function (service) {
	var extract = Tar.extract()
	var pack = Tar.pack()
	extract.on('entry', function(header, stream, callback) {
	 header.name = header.name
            .split(path.sep)
            .slice(1)
            .join(path.sep)
	  stream.pipe(pack.entry(header, callback))
	})

	extract.on('finish', function() {
	  pack.finalize()
	})

   	var service = "factory-cc08ef42-1.lsqio.cont.tutum.io:49192"
		hyperdirect(tar)
		.pipe(zlib.createGunzip())
		.pipe(extract)
		pack
	    .pipe(hyperquest.post('http://'+service+'/build?t='+image, {
			headers: {
				'X-Registry-Auth': encode(config[serverAddress]),
				'X-Registry-Config': encode(config)
			}
		}))
		.pipe(res)
 	//})
		 

 
})

module.exports = api

function encode(obj) {
  return Buffer(JSON.stringify(obj)).toString('base64')
}



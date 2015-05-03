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



  var fs = require("fs")
  var path = require("path")

// lsq.config.get().then(function(c){
//   config = c
// })

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


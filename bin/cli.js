#!/usr/bin/env node
'use strict'; //jshint node:true,newcap:false
var fs = require('fs')
  , Path = require('path')
  , AuthConfigs = require('../api/v1/dockercfg')

var authConfigs = AuthConfigs.parse(fs.readFileSync(Path.join(process.env.HOME, '.dockercfg')))

function encode(obj) {
  return Buffer(JSON.stringify(obj)).toString('base64')
}

process.stdin
  .pipe(require('hyperquest').post('http://localhost:3000/build?t=pellepelle3/foo', {
    headers: {
      //'X-Registry-Auth': encode(authConfigs.configs['https://index.docker.io/v1/']),
      'X-Registry-Auth': encode({
        email: 'pellepelle3@gmail.com',
        username: 'pellepelle3',
        password: 'onio1367',
        serverAddress: 'https://index.docker.io/v1/'
      }),
      'X-Registry-Config': encode({'https://index.docker.io/v1/':{
        email: 'pellepelle3@gmail.com',
        username: 'pellepelle3',
        password: 'onio1367',
        serverAddress: 'https://index.docker.io/v1/'
      }})
    }
  }))
  .pipe(process.stdout)
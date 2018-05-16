'use strict';

const bodyParser = require('../lib/middleware/bodyParser.js');

const Blog = require('../models/blogSchema.js');

const blogRouter = module.exports = require('express').Router();


blogRouter.post('/api/:model', bodyParser, (req,res,next) => {

  try{
    let blog = new Blog(req.body);

    blog.save()
      .then( data => res.status(200).send(data))
      .catch( err => next(err));
  }
  catch(error){
    next(error.message);
  }
});

blogRouter.get('/api/:model', (req,res,next) => {

  try{
    Blog.find({})
      .then( data => res.send(data))
      .catch( err => next(err));
  }
  catch(error){
    next(error.message);
  }
});

blogRouter.get('/api/:model/:id', (req,res,next) => {

  try{
    let id = req.params.id;
    Blog.findOne({_id: id})
      .then( data => res.status(200).send(data))
      .catch( err => next(err));
  }
  catch(error){
    next(error.message);
  }
});

blogRouter.put('/api/:model/:id', bodyParser, (req,res,next) => {
  try{

    let id = req.params.id;

    Blog.findOne({_id:id})
      .then( result => {
        Object.assign(result, req.body);
        return result.save();
      })
      .then(result => res.send(result))
      .catch(err => next(err));
  }
  catch(error){
    next(error.message);
  }
});

'use strict';

const bodyParser = require('../lib/middleware/bodyParser.js');

const FileData = require('../models/fileDataSchema.js');

const fileDataRouter = module.exports = require('express').Router();


fileDataRouter.post('/api/:model', bodyParser, (req,res,next) => {
  try{
    let image = new FileData(req.body);

    image.save()
      .then( record => {
        if(req.files && req.files.length){
          return record.attachFiles(req.files);
        }
      })
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => res.status(400));
  }catch(error){
    next(error.message);
  }
});

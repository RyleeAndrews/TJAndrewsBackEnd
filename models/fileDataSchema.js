'use strict';

const mongoose = require('mongoose');
const aws = require('../lib/middleware/s3.js');

const fileDataSchema = new mongoose.Schema({
  fileCaption: String,
  avatar: String,
  avatarFile: String,
});

const FileData = module.exports = mongoose.model('FileData', fileDataSchema);


fileDataSchema.methods.attachFiles = function(files){
  let file = files[0];
  let key = `${file.filename}-${file.originalname}`;
  let record = this;

  aws.upload(file.path, key)
    .then(url => {
      record.avatar = url;
      return record.save();
    })
    .catch(console.error);
};

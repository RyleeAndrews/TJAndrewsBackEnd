'use strict';

const mongoose = require('mongoose');



const blogSchema = new mongoose.Schema({
  authorName: String,
  title: String,
  content: String,
  publicView: Boolean,
  date: String,
});

const Blog = module.exports = mongoose.model('Blog', blogSchema);

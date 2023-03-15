const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

// Content for page start
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [];
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


// main page gets two paramaters forwarded to an ejs file: starting content for the page and any posts the user might have written
app.get("/", function(req, res){

  res.render("home", {homeStartingContent: homeStartingContent, posts: posts});

})

// about page
app.get("/about", function(req, res){

  res.render("about", {aboutContent: aboutContent});

})

// contact page
app.get("/contact", function(req, res){

  res.render("contact", {contactContent: contactContent});

})

// page where the user writes posts
app.get("/compose", function(req, res){

  res.render("compose");

})

// get post the user has made and push the post to posts array and redirect to main page with said post already rendered
app.post("/compose", function(req, res){

  const post = {
    title: req.body.title,
    content: req.body.content
  };
  posts.push(post);
  res.redirect("/");

})

// Individual site for all user posts
app.get("/posts/:postName", function(req, res){
  let isPageRendered = false;
//   check if searched post exists
  posts.forEach(post => {
    if (_.lowerCase(post.title) === _.lowerCase(req.params.postName)){
      res.render("post", {postTitle: post.title, postContent: post.content});
      isPageRendered = true;
    } 
    
  })
//   write an error if the post is not found
  if (!isPageRendered){
    res.send("Error 404 page not found");
  }
})


// run server
app.listen(3000, function() {
  console.log("Server is running on port 3000");
});

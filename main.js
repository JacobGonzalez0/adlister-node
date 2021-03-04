const mysql      = require('mysql');
const login      = require('./login.json');
const connection = mysql.createConnection(login);
const express    = require('express');

connection.connect();

function getUsers(){
    connection.query('SELECT * FROM Users', function (error, results, fields) {
        if (error) throw error; //error handling
        console.log(results);
    });
}

function getUser(username){
    connection.query('SELECT ? FROM Users', username ,function (error, results, fields) {
        if (error) throw error; //error handling
        //console.log(results);
    });
}
//addUser("pon","pon@gmail.com","dsdasdf")
//getUsers();
//newCatagory("Free stuff","Need to get rid of something? list if for free!")

//newPost(1,"Junk in yard","I dont wanna clean but the stuff is really cool here",1);

function addUser(username, email, password){
    connection.query("INSERT INTO `Users`(`username`, `email`, `password`) VALUES ( ?,?,?)", [username,email,password] , function (error, results, fields) {
        if (error) throw error; //error handling
        console.log(results);
    });
}

function newCatagory(name, description){
    connection.query("INSERT INTO `catagories`(`name`, `description`) VALUES ( ?,?)", [name, description] , function (error, results, fields) {
        if (error) throw error; //error handling
        console.log(results);
    });
}

function newPost(user, title, content, catagory){
    connection.query("INSERT INTO `posts`(`userid`, `title`, `content`, `catagoryid`) VALUES ( ?,?,?,?)", [user, title, content, catagory] , function (error, results, fields) {
        if (error) throw error; //error handling
        console.log(results);
    });
}

function getEmailfromPost(postid){
    connection.query("SELECT posts.userid, posts.postid, users.email FROM posts INNER JOIN users ON posts.userid=users.userid WHERE posts.postid = ?;", postid ,function (error, results, fields) {
        if (error) throw error; //error handling
        console.log("For a given ad, what is the email address of the user that created it?")
        console.log(results);
    });
}

function getCatagoryfromPost(postid){
    connection.query("SELECT posts.catagoryid, posts.postid, catagories.catagoryid, catagories.name FROM posts INNER JOIN catagories ON posts.catagoryid = catagories.catagoryid WHERE posts.postid = ?;", postid ,function (error, results, fields) {
        if (error) throw error; //error handling
        console.log("For a given ad, what category, or categories, does it belong to?")
        console.log(results);
    });
}

function getPostsFromCatagoryName(catagory){
    connection.query("SELECT posts.catagoryid, posts.postid, posts.title, catagories.catagoryid, catagories.name FROM posts INNER JOIN catagories ON posts.catagoryid = catagories.catagoryid WHERE catagories.name = ?;", catagory ,function (error, results, fields) {
        if (error) throw error; //error handling
        console.log("For a given category, show all the ads that are in that category.")
        console.log(results);
    });
}

function getPostsFromCatagoryId(catagory){
    connection.query("SELECT posts.catagoryid, posts.postid, catagories.catagoryid, catagories.name FROM posts INNER JOIN catagories ON posts.catagoryid = catagories.catagoryid WHERE catagories.catagoryid = ?;", catagory ,function (error, results, fields) {
        if (error) throw error; //error handling
        console.log(results);
    });
}

function getPostsFromUserID(user){
    connection.query("SELECT posts.catagoryid, posts.postid, posts.title, posts.content, users.userid, users.username FROM posts INNER JOIN users ON posts.userid = users.userid WHERE posts.userid = ?;", user ,function (error, results, fields) {
        if (error) throw error; //error handling
        console.log("For a given user, show all the ads they have posted.")
        console.log(results);
    });
}
//For a given ad, what is the email address of the user that created it?
getEmailfromPost(6)
//For a given ad, what category, or categories, does it belong to?
getCatagoryfromPost(5)
//For a given category, show all the ads that are in that category.
getPostsFromCatagoryName("Free stuff");
//For a given user, show all the ads they have posted.
getPostsFromUserID(1)


connection.end();
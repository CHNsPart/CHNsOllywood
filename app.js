var request = require('request');
var express = require('express');
const {
    response
} = require('express');
const {
    render
} = require('ejs');
const port = process.env.PORT || 8080;
var app = express();
app.use(express.static('public'));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("search");
});


app.get("/results", function (req, res) {
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?t=" + query + "&apikey=1b41c4c1";
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", {
                data: data
            });
        }
    });
});




app.listen(port, () => console.log("Movie app started"));
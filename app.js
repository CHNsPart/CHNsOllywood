var request = require("request");
var flash = require("connect-flash");
const session = require("express-session");
var express = require("express");
const {
    response
} = require("express");
const {
    render
} = require("ejs");
const port = process.env.PORT || 8080;
var app = express();
app.use(express.static("public"));
app.use(
    session({
        secret: "chnsollywood",
        saveUninitialized: true,
        resave: true,
    })
);
app.use(flash());

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("search", {
        message: req.flash('error')
    });
});

app.get("/results", function (req, res) {
    var query = req.query.search;
    if (query.length === 0) {
        req.flash("error", "Sorry, Couldn't find your Movie Search!");
        res.redirect("/");
    } else {
        var url = "http://www.omdbapi.com/?t=" + query + "&apikey=1b41c4c1";
        request(url, function (error, response, body) {
            if (error) {
                req.flash("error", "Sorry, Couldn't find your Movie Search!");
                res.redirect("/");
            }
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);
                if (data.Error === "Movie not found!") {
                    req.flash("error", data.Error);
                    res.redirect("/");
                } else {
                    res.render("results", {
                        data: data,
                    });
                    // console.log(data.Error);
                }
            }
        });
    }
});

app.listen(port, () => console.log("Movie app started"));
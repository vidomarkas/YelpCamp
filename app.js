var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comment"),
    passport        =require("passport"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user"),
    methodOverride  = require("method-override");
    
var commentRoutes   = require("./routes/comments"),
    campgroundRoutes= require("./routes/campgrounds"),
    indexRoutes     = require("./routes/index");

    
    
    
    //CREATE DATABASE yelp_camp
    
    
mongoose.connect("mongodb://localhost/yelp_campv10");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

//seedDB(); //seed the database


    // PASSPORT CONFIGURATION

app.use(require("express-session")({
    //my phrase for coding algorythm
    secret:"Mano striuke kabo ant pakabos",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(indexRoutes);


//=========================================================

    //START THE SERVER

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});
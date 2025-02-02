const User = require("../models/user.js");

module.exports.signupPage = (req,res) => {
    res.render("users/signup.ejs");
}

module.exports.signupRequest = async (req,res) => {
    try{
        let {username, email, password} = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "SignUp successfull. Welcome to AirBNB !");
            res.redirect("/listings");
        })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.loginPage = (req,res) => {
    res.render("users/login.ejs");
}

module.exports.loginRequest = async(req,res) => {
    req.flash("success", "Welcome Back to AirBNB");
    res.locals.currUser = req.user;
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success", "Logout successful")
        res.redirect("/listings");
    })
}
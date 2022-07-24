const passport = require("passport");
const nodemailer = require("nodemailer");
const {OAuth2Client} = require("google-auth-library");
const Users = require("../models/user");
const Homes = require("../models/home");
const key = require("../key")
var bcrypt = require("bcryptjs");
var randomstring = require("randomstring");
const GOOGLE_MAILER_CLIENT_ID = key.ClientID;
const GOOGLE_MAILER_CLIENT_SECRET = key.ClientSecret;
const GOOGLE_MAILER_REFRESH_TOKEN = key.RefreshToken;
const ADMIN_EMAIL_ADDRESS = key.EmailAddress;
const myOAuth2Client = new OAuth2Client(GOOGLE_MAILER_CLIENT_ID, GOOGLE_MAILER_CLIENT_SECRET)

myOAuth2Client.setCredentials({refresh_token: GOOGLE_MAILER_REFRESH_TOKEN})

exports.getLogin = (req, res, next) => {
    const message = req.flash("error")[0];
    if (!req.isAuthenticated()) {
        res.render("login", {
            title: "Đăng nhập",
            message: `${message}`,
            user: req.user
        });
    } else {
        res.redirect("/");
    }
};

exports.postLogin = (req, res, next) => {
    passport.authenticate("local-signin", {
        successReturnToOrRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);
};

exports.getVerifyHome = (req, res, next) => {
    const message = req.flash("error")[0];
    res.render ("verify-home", {
        title: "Verify home",
        message: `${message}`,
        user: req.user
    })
};

exports.postVerifyHome = (req, res, next) => {
    var homeName = req.body.homeName;
    var homeId = req.body.homeId;
    

    Homes.findOne({homeName: homeName})
        .then( home => {
            if(!home || home.homeId != homeId) {
                req.flash("error", "Home's name hoặc Home's id không đúng!");
                return res.redirect("/verify-home")
            } else {
                return req.user;
            }
        })
        .then(user => {
            let check = false;
            user.homeModel.forEach(x => {
                if(x.homeName == homeName) {
                    req.flash("error", "Home's name đã tồn tại!");
                    return res.redirect("/verify-home");
                } else {
                    check = true;
                }
            })
            if(check) {
                user.homeModel.push(
                    {
                        homeName: homeName,
                        homeId: homeId
                    }
                )
    
                user.homeNameCurrent = homeName;
    
                user.save();
                return res.redirect("/");
            }
        })
};

exports.getLogout = (req, res, next) => {
    req.logout();
    res.redirect("/");
};

exports.getSignUp = (req, res, next) => {
    const message = req.flash("error")[0];
    if (!req.isAuthenticated()) {
        res.render("register", {
            title: "Đăng ký",
            message: `${message}`,
            user: req.user
        });
    } else {
        res.redirect("/");
    }
};

exports.postSignUp = (req, res, next) => {
    passport.authenticate("local-signup", {
        successReturnToOrRedirect: "/verify-email",
        failureRedirect: "/register",
        failureFlash: true
    })(req, res, next);
};

exports.getVerifyEmail = async (req, res, next) => {
    try {
        const myAccessTokenObject = await myOAuth2Client.getAccessToken()

        const myAccesstToken = myAccessTokenObject ?. token

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: ADMIN_EMAIL_ADDRESS,
                clientId: GOOGLE_MAILER_CLIENT_ID,
                clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                refreshToken: GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: myAccesstToken
            }
        });
        var verification_token = randomstring.generate({length: 10});

        Users.findOne({username: req.user.username}).then(user => {
            let mainOptions = {
                from: "SmartHome web",
                to: req.user.email,
                subject: "Gửi mã xác thực",
                html: "<p>Mã xác thực của bạn là: </p>" + verification_token
            };
            transporter.sendMail(mainOptions);

            user.verify_token = verification_token;
            user.save();
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({errors: error.message})
    }


    const message = req.flash("error")[0];
    res.render("verify-email", {
        title: "Xác thực email",
        message: `${message}`,
        user: req.user
    });
};

exports.postVerifyEmail = (req, res, next) => {
    const token = req.body.token;
    Users.findOne({
        username: req.user.username
    }, (err, user) => {
        if (token == user.verify_token) {
            user.isAuthenticated = true;
            user.save();
            return res.redirect("/login");
        } else if (token != user.verify_token) {
            req.flash("error", "Mã xác thực không hợp lệ!");
            return res.redirect("/verify-email");
        }
    });
};

exports.getForgotPass = (req, res, next) => {
    const message = req.flash("error")[0];
    res.render("forgot-password", {
        title: "Quên mật khẩu",
        message: `${message}`,
        user: req.user
    });
};

exports.postForgotPass = async (req, res, next) => {
    try {
        const myAccessTokenObject = await myOAuth2Client.getAccessToken()

        const myAccesstToken = myAccessTokenObject ?. token

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: ADMIN_EMAIL_ADDRESS,
                clientId: GOOGLE_MAILER_CLIENT_ID,
                clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                refreshToken: GOOGLE_MAILER_REFRESH_TOKEN,
                accessToken: myAccesstToken
            }
        });

        const email = req.body.email;
        
        Users.findOne({
            email: email
        }).then( user => {
            if (!user) {
                req.flash("error", "Invalid email!");
                return res.redirect("/forgot-password");
            } else {
                    var newpass = randomstring.generate({length: 6});
                    let mainOptions = {
                        from: "SmartHome web",
                        to: email,
                        subject: "Quên mật khẩu",
                        html: "<p>Mật khẩu mới của bạn là: </p>" + newpass
                    };
                    transporter.sendMail(mainOptions);
            
                    bcrypt.hash(newpass, 12).then(hashPassword => {
                        user.password = hashPassword;
                        user.save();
                    });
                    res.redirect("/login");
                }
            });
    } catch (error) {
        console.log(error)
        res.status(500).json({errors: error.message})
    }
};

exports.getChangePassword = (req, res, next) => {
    const message = req.flash("error")[0];
    res.render("change-password", {
        title: "Change password",
        message: `${message}`,
        user: req.user
    });
};

exports.postChangePassword = (req, res, next) => {
    bcrypt.compare(req.body.oldpass, req.user.password, function (err, result) {
        if (! result) {
            req.flash("error", "Old password isn't correct!");
            return res.redirect("back");
        } else {
            bcrypt.hash(req.body.newpass, 12).then(hashPassword => {
                req.user.password = hashPassword;
                req.user.save();
            });
            req.flash("success", "Change password successfully!");
            res.redirect("/");
        }
    });
};

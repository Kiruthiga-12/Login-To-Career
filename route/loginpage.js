const LTC_Signup = require('../model/schema');
const LTC_jobpost = require('../model/jobpost');
const path = require('path');
const dirname = process.cwd();
const jwt = require('jsonwebtoken');
let access_key = '';
let username = '';
exports.signup = (req, res) => {
    if (req.body.loginsubmit == "Sign Up") {
        LTC_Signup.find({ emailid: req.body.email }).
            then((data) => {
                if (data.length > 0)
                    res.json({ message: "Emailid already Exists!. Please Login instead of Sign Up." })
                else {
                    LTC_Signup.create(
                        {
                            firstname: req.body.fname,
                            lastname: req.body.lname,
                            emailid: req.body.email,
                            password: req.body.pass

                        }
                    ).then((data) => {
                        if (data) {
                            res.render(path.join(dirname + '/view/EJS/login.ejs'));
                        }
                        else {
                            res.json({ error: "Please Sign up again!!" });
                        }
                    }).
                        catch((error) => {
                            res.json({ error: error.message });
                        })
                }
            })
            .catch((error) => {
                res.json({ error: error.message });
            })

    }
    else {
        res.json({ error: "Please Sign up again!!" });
    }

}


/////////////////////////////
exports.login = (req, res) => {
    exports.username = req.body.email;
    username = req.body.email;
    LTC_Signup.find({ $and: [{ emailid: req.body.email }, { password: req.body.pass }] }).
        then((data) => {
            if (data.length != 0) {
                LTC_jobpost.find()
                    .then((data) => {
                        access_key = jwt.sign({ emailid: req.body.email, password: req.body.pass }, process.env.Secret_Access_key, { expiresIn: '2h' });
                        exports.access_key = access_key;
                        res.render(path.join(dirname + '/view/EJS/home.ejs'), { dirname: dirname, loginname: username, data: data });
                    })
                    .catch((error) => {
                        res.json({ error: error.message });
                    })
            }
            else {
                res.json({ message: "Username/password does not match" });
            }
        }).
        catch((error) => {
            res.json({ error: error.message });
        })

}

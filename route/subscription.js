const nodemailer = require('nodemailer');
const path = require('path');
const dirname = process.cwd();
const LTC_subscribe = require('../model/subscribe');
let username = '';
exports.subscrib = (req, res) => {
    username = req.username;
    LTC_subscribe.find({ emailid: username }).
        then((data) => {
            if (data.length > 0) {
                res.json({ message: "You have already subscribed!!" });
            }
            else {
                LTC_subscribe.create(
                    {
                        emailid: username
                    }).
                    then((data) => {
                        if (data) {
                            const transport = nodemailer.createTransport(
                                {
                                    service: "gmail",
                                    auth:
                                    {
                                        user: process.env.user,
                                        pass: process.env.pass
                                    }
                                });
                            res.render(path.join(dirname + '/view/EJS/subscription.ejs'), { username: username }, (error, data) => {
                                if (error)
                                    res.json({ error: error.message });
                                else {
                                    const message = {
                                        from: process.env.user,
                                        to: username,
                                        subject: 'Login To Career Subscription',
                                        html: data
                                    }
                                    transport.sendMail(message, (error, info) => {
                                        if (error) {
                                            res.json({ error: error.message });
                                        }
                                        else
                                            res.json({ message: info.envelope.to + " mail id have been added to subscription successfully!!" });
                                    })
                                }
                            })
                        }
                        else {
                            res.json({ error: error.message });
                        }
                    }).catch((error) => {
                        res.json({ error: error.message });
                    })
            }
        })
        .catch((error) => {
            res.json({ error: error.message });
        })
}
////////////////////////
exports.unsubscrib = (req, res) => {
    username = req.username;
    LTC_subscribe.find({ emailid: username }).
        then((data) => {
            if (data.length > 0) {
                LTC_subscribe.deleteOne({ emailid: username })
                    .then((data) => {
                        if (data)
                            res.json({ message: username + " is successfully removed from subscription" })
                    }).
                    catch((error) => {
                        res.json({ error });
                    })
            }
        })
}
const path = require('path');
const dirname = process.cwd();
const LTC_jobpost = require('../model/jobpost');
const LTC_profile = require('../model/profile');
let username = '';
exports.homepageredirect = (req, res) => {
    username = req.username;
    if (req.body.post == "post") {
        LTC_jobpost.find({
            $and: [
                { designation: req.body.desig },
                { company: req.body.company },
                { location: req.body.location },
                { skills: req.body.skills },
                { experience: req.body.exp },
                { salary: req.body.salary }
            ]
        })
            .then((result) => {
                if (result.length > 0) {
                    res.json({ message: "Data already Exists!!!" });
                }
                else {
                    LTC_jobpost.create(
                        {
                            designation: req.body.desig,
                            company: req.body.company,
                            location: req.body.location,
                            skills: req.body.skills,
                            experience: req.body.exp,
                            salary: req.body.salary,
                            emailid: username
                        }
                    ).then((data) => {
                        if (data) {
                            LTC_jobpost.find()
                                .then((data) => {
                                    res.render(path.join(dirname + '/view/EJS/home.ejs'), { dirname: dirname, loginname: username, data: data });
                                })
                                .catch((error) => {
                                    res.json({ error: error.message });
                                })
                        }
                        else {
                            res.json({ error: error.message });
                        }
                    })
                        .catch((error) => {
                            res.json({ error: error.message });
                        })
                }
            }).
            catch((error) => {
                res.json({ error: error.message });
            })

    }
    else if (req.body.saveprofile == "saveprofile") {
        LTC_profile.find({ emailid: username }).
            then((data) => {
                if (data.length == 0) {
                    let filevalue = '';
                    if (req.file) {
                        filevalue = req.file.path;
                    }
                    LTC_profile.create(
                        {
                            firstname: req.body.fname,
                            lastname: req.body.lname,
                            designation: req.body.design,
                            skills: req.body.skills,
                            country: req.body.country,
                            emailid: username,
                            resume: filevalue
                        }
                    ).then((data) => {
                        if (data) {
                            LTC_jobpost.find()
                                .then((data) => {
                                    res.render(path.join(dirname + '/view/EJS/home.ejs'), { dirname: dirname, loginname: username, data: data });
                                })
                                .catch((error) => {
                                    res.json({ error: error.message });
                                })
                        }
                        else {
                            res.json({ error: error.message });
                        }
                    })
                        .catch((error) => {
                            res.json({ error: error.message });
                        })

                }
                else if (data.length != 0) {
                    let filevalue = '';
                    if (req.file) {
                        filevalue = req.file.path;
                    }
                    LTC_profile.updateOne({ emailid: username }, {
                        $set:
                        {
                            firstname: req.body.fname,
                            lastname: req.body.lname,
                            designation: req.body.design,
                            skills: req.body.skills,
                            country: req.body.country,
                            emailid: username,
                            resume: filevalue
                        }
                    }).then((result) => {
                        LTC_jobpost.find()
                            .then((data) => {
                                res.render(path.join(dirname + '/view/EJS/home.ejs'), { dirname: dirname, loginname: username, data: data });
                            })
                            .catch((error) => {
                                res.json({ error: error.message });
                            })
                    }).
                        catch((error) => {
                            res.json({ error: error.message });
                        })
                }
            })

    }
    else if (req.body.deletepost == "deletepost") {
        LTC_jobpost.find({
            $and: [
                { designation: req.body.searchdesign },
                { company: req.body.searchcompany },
                { location: req.body.searchlocation },
                { skills: req.body.searchskills },
                { experience: req.body.searchexperience },
                { salary: req.body.searchsalary },
                { emailid: username }
            ]
        })
            .then((data) => {
                if (data.length != 0) {
                    LTC_jobpost.deleteOne({
                        $and: [{ designation: req.body.searchdesign },
                        { company: req.body.searchcompany },
                        { location: req.body.searchlocation },
                        { skills: req.body.searchskills },
                        { experience: req.body.searchexperience },
                        { salary: req.body.searchsalary },
                        { emailid: username }]
                    }).then((result) => {
                        if (result) {
                            LTC_jobpost.find()
                                .then((data) => {
                                    res.render(path.join(dirname + '/view/EJS/home.ejs'), { dirname: dirname, loginname: username, data: data });
                                })
                                .catch((error) => {
                                    res.json({ error: error.message });
                                })
                        }
                        else {
                            res.json({ message: "No data for deletion!!!" });
                        }
                    }).catch((error) => {
                        res.json({ error: error.message });
                    })

                }
                else {
                    res.json({ message: "No jobs posted by you" });
                }
            })
            .catch((error) => {
                res.json({ error: error.message });
            })

    }
    else if (req.body.searchbtn == "Search...") {
        LTC_jobpost.find({
            $or: [
                { designation: req.body.hdesignation },
                { company: req.body.hcompanyname },
                { location: req.body.hlocation },
                { skills: req.body.hskills },
                { experience: req.body.hexperience },
                { salary: req.body.hsalary }
            ]
        })
            .then((data) => {
                res.render(path.join(dirname + '/view/EJS/home.ejs'), { dirname: dirname, loginname: username, data: data });
            })
            .catch((error) => {
                res.json({ error: error.message });
            })
    }
    else if (req.body.refreshbtn == "Refresh") {
        LTC_jobpost.find()
            .then((data) => {
                res.render(path.join(dirname + '/view/EJS/home.ejs'), { dirname: dirname, loginname: username, data: data });
            })
            .catch((error) => {
                res.json({ error: error.message });
            })
    }
}




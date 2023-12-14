const path = require('path');
const dirname = process.cwd();
const LTC_jobpost = require('../model/jobpost');
const LTC_candidate = require('../model/candidate');
let username = '';
/////////////////////////////////////////////
exports.redirecttohome = (req, res) => {
    username = req.username;
    LTC_jobpost.find()
        .then((data) => {
            res.render(path.join(dirname + '/view/EJS/home.ejs'), { dirname: dirname, loginname: username, data: data });
        })
        .catch((error) => {
            res.json({ error: error.message });
        })
}
///////////////////////////////////////////
exports.editpost = (req, res) => {
    username = req.username;
    LTC_jobpost.find({
        $and: [
            { designation: req.body.searchdesign },
            { company: req.body.searchcompany },
            { location: req.body.searchlocation },
            { skills: req.body.searchskills },
            { experience: req.body.searchexperience },
            { salary: req.body.searchsalary },
            { emailid: username }]
    }).then((data) => {
        if (data.length > 0) {
            res.render(path.join(dirname + '/view/EJS/editjob.ejs'), { dirname: dirname, loginname: username, data: data });
        }
    })
        .catch((error) => {
            res.json({ error: error.message });
        })

}
///////////////////////////////////////
exports.seemore = (req, res) => {
    username = req.username;
    if (req.body.applydet == "See more..") {
        LTC_jobpost.find({
            $and: [{ designation: req.body.searchdesign },
            { company: req.body.searchcompany },
            { location: req.body.searchlocation },
            { skills: req.body.searchskills },
            { experience: req.body.searchexperience },
            { salary: req.body.searchsalary },
            { emailid: req.body.postedby }]
        })
            .then((data) => {
                if ((data.length != 0) && (username == data[0].emailid)) {
                    res.json({ message: "You cannot apply for the jobs you posted" });
                }
                else if ((data.length != 0) && (username != data[0].emailid)) {
                    res.render(path.join(dirname + '/view/EJS/applyjob.ejs'), { dirname: dirname, loginname: username, data: data });
                }

            })
            .catch((error) => {
                res.json({ error: error.message });
            })
    }
}
//////////////////////////////////////////
exports.redirecttoownpost = (req, res) => {
    username = req.username;
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
    }).
        then((result) => {
            if (result.length > 0) {
                res.json({ message: "Data already Exists!!" });
            }
            else {
                LTC_jobpost.updateOne({
                    emailid: username,
                    designation: req.body.searchdesign,
                    company: req.body.searchcompany
                },
                    {
                        $set: {
                            designation: req.body.searchdesign,
                            company: req.body.searchcompany,
                            location: req.body.searchlocation,
                            skills: req.body.searchskills,
                            experience: req.body.searchexperience,
                            salary: req.body.searchsalary,
                            emailid: username
                        }
                    })
                    .then((data) => {
                        res.redirect('/getjobsposted');
                    })
                    .catch((error) => {
                        res.json({ error: error.message });
                    })
            }
        })
        .catch((error) => {
            res.json({ error: error.message });
        })
}
///////////////////////////////////////////
exports.applyforjob = (req, res) => {
    username = req.username;
    let mobileno = Number(req.body.searchmobile);
    LTC_candidate.find({
        $and: [
            { designation: req.body.searchdesign },
            { company: req.body.searchcompany },
            { location: req.body.searchlocation },
            { skills: req.body.searchskills },
            { experience: req.body.searchexperience },
            { salary: req.body.searchsalary },
            { postedby: req.body.postedby },
            { emailid: username },
            { mobile: mobileno }
        ]
    }).
        then((result) => {
            if (result.length > 0) {
                res.json({ message: "You have already Applied for job, please check in Home->Applied Jobs path for further details" })
            }
            else {
                LTC_candidate.create({
                    designation: req.body.searchdesign,
                    company: req.body.searchcompany,
                    location: req.body.searchlocation,
                    skills: req.body.searchskills,
                    experience: req.body.searchexperience,
                    salary: req.body.searchsalary,
                    mobile: mobileno,
                    firstname: req.body.searchfname,
                    lastname: req.body.searchlname,
                    comments: req.body.comments,
                    postedby: req.body.postedby,
                    emailid: username
                }).then((data) => {
                    if (data) {
                        res.json({ message: "You have successfully applied for jobs!!!" });
                    }
                    else {
                        res.json({ error: "Please try again!" });
                    }
                })
                    .catch((error) => {
                        res.json({ error: error.message });
                    });
            }
        })
        .catch((error) => {
            res.json({ error: error.message });
        })
};
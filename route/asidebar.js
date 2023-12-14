const LTC_profile = require('../model/profile');
const LTC_candidate = require('../model/candidate');
const LTC_jobpost = require('../model/jobpost');
const path = require('path');
const dirname = process.cwd();
let username = '';
/////////////////////////////
exports.createpost = (req, res) => {
    username = req.username;
    res.render(path.join(dirname + '/view/EJS/createpost.ejs'), { dirname: dirname, loginname: username });
}
/////////////////////////////
exports.profile = (req, res) => {
    username = req.username;
    LTC_profile.find({ emailid: username })
        .then((data) => {
            res.render(path.join(dirname + '/view/EJS/profile.ejs'), { dirname: dirname, loginname: username, data: data });
        })
        .catch((error) => {
            res.json({ error: error.message });
        })

}
/////////////////////////////
exports.ownpost = (req, res) => {
    username = req.username;
    LTC_jobpost.find({ emailid: username })
        .then((data) => {
            res.render(path.join(dirname + '/view/EJS/ownpost.ejs'), { dirname: dirname, loginname: username, data: data });
        })
        .catch((error) => {
            res.json({ error: error.message });
        })

}
/////////////////////////////
exports.jobspapplied = (req, res) => {
    username = req.username;
    LTC_candidate.find({ emailid: username })
        .then((data) => {
            res.render(path.join(dirname + '/view/EJS/listofappliedjobs.ejs'), { dirname: dirname, loginname: username, data: data });
        })
        .catch((error) => {
            res.json({ error: error.message });
        })
}
/////////////////////////////
exports.applicantdetails = (req, res) => {
    username = req.username;
    LTC_candidate.find({
        $and: [
            { designation: req.body.searchdesign },
            { company: req.body.searchcompany },
            { location: req.body.searchlocation },
            { skills: req.body.searchskills },
            { experience: req.body.searchexperience },
            { salary: req.body.searchsalary },
            { postedby: username }
        ]
    }).
        then((data) => {
            res.render(path.join(dirname + '/view/EJS/listofapplicantdetails.ejs'), { dirname: dirname, loginname: username, data: data });
        })
        .catch((error) => {
            res.json({ error: error.message });
        })
}
/////////////////////////////

exports.instructions = (req, res) => {
    username = req.username;
    res.render(path.join(dirname + '/view/EJS/instruction.ejs'), { dirname: dirname, loginname: username });
}
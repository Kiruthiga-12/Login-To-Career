const exp = require('express');
const route = exp.Router();
const subscrip_det = require('./subscription');
const login_det = require('./loginpage');
const asidebar = require('./asidebar');
const other = require('./other');
const homepageredirect = require('./redirecttohomepage');
const upload = require('../controller/config/multer');
const jwt = require('jsonwebtoken');
//routes
//signup and login
route.post('/redirecttologinpage', login_det.signup);
//login page
route.post('/homepage', login_det.login);
//assigning username
const assign_user = (req, res, next) => {
    req.username = login_det.username;
    next();
}
//verifying token- accesskey
const verifytoken = (req, res, next) => {
    req.token = login_det.access_key;
    jwt.verify(req.token, process.env.Secret_Access_Key, (error, verifiedToken) => {
        if (error)
            res.json({ error: error.message });
        else
            next();
    })
}

//Subscribe & Unsubscribe
route.get('/subscribe', verifytoken, assign_user, subscrip_det.subscrib);
route.get('/unsubscribe', verifytoken, assign_user, subscrip_det.unsubscrib);
//create post
route.get('/createpost', verifytoken, assign_user, asidebar.createpost);
//profile tab
route.get('/profile', verifytoken, assign_user, asidebar.profile);
//Posts by you.
route.get('/getjobsposted', verifytoken, assign_user, asidebar.ownpost);
//jobs applied:
route.get('/getjobsapplied', verifytoken, assign_user, asidebar.jobspapplied)
//applicant details
route.post('/getapplicantsdetails', verifytoken, assign_user, asidebar.applicantdetails);
//Instructions.
route.get('/instructions', verifytoken, assign_user, asidebar.instructions);
//redirect to home page get method.
route.get('/redirecttohomepage', verifytoken, assign_user, other.redirecttohome);
//edit job  posts.
route.post('/editpost', verifytoken, assign_user, other.editpost);
//see more details.
route.post('/seemore', verifytoken, assign_user, other.seemore);
//redirect to own post
route.post('/redirecttoownpost', verifytoken, assign_user, other.redirecttoownpost)
//Apply for job
route.post('/appliedforjob', verifytoken, assign_user, other.applyforjob);
//homepage redirect
route.post('/redirecttohomepage', verifytoken, upload.single('resume'), assign_user, homepageredirect.homepageredirect);

module.exports = route;
const mong = require('mongoose');

let profile = new mong.Schema(
    {
        firstname:
        {
            type: String,
            required: true
        },
        lastname:
        {
            type: String,
            required: true
        },
        designation:
        {
            type: String
        },
        skills:
        {
            type: String
        },
        country:
        {
            type: String,
            required: true
        },
        emailid:
        {
            type: String
        },
        resume:
        {
            type: String
        }
    }
)

module.exports = mong.model("LTC_profile", profile)
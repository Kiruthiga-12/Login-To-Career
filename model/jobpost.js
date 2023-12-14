const mong = require('mongoose');

let job = new mong.Schema(
    {
        designation:
        {
            type: String,
            required: true
        },
        company:
        {
            type: String,
            required: true
        },
        location:
        {
            type: String,
            required: true
        },
        skills:
        {
            type: String,
            required: true
        },
        experience:
        {
            type: String,
            required: true
        },
        salary:
        {
            type: String,
            required: true
        },
        emailid:
        {
            type: String,
            required: true
        }
    }
);

module.exports = mong.model("LTC_createpost", job);
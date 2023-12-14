let mong = require('mongoose');
let candidate = new mong.Schema(
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
        },
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
        mobile:
        {
            type: Number,
            required: true
        },
        comments:
        {
            type: String,
            required: true
        },
        postedby:
        {
            type: String,
            required: true
        }
    }
)

module.exports = mong.model('LTC_candidate', candidate);
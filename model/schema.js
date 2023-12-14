const mong = require('mongoose');
const sch = new mong.Schema(
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
        emailid:
        {
            type: String,
            required: true,
            unique:true
        },
        password:
        {
            type: String,
            required: true,
            unique:true
        }
    }
)


module.exports = mong.model('LTC_Signup', sch);
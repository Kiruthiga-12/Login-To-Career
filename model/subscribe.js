let mong = require('mongoose');

let subscribe = new mong.Schema(
    {
        emailid:
        {
            type: String,
            require: true
        }
    }
)

module.exports = mong.model("Ltc_Subscribe", subscribe);
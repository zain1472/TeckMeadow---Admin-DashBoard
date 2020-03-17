
module.exports = function () {
    var User = require('../models/user');
    User.find({},function (err,users) {
        if (err) {
            console.log(err);
        } else {
            users.forEach(user=>{
                user.active = true;
                user.save();
            });
        }
    })
}

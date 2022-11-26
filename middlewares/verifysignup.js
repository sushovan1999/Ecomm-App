const db = require("../model/index");
const Roles = db.Roles;
const User = db.user;

let checkDuplicateUserName = async (req, res, next) => {
  let user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (user) {
    res.status(400).json({
      message: "User already exist",
    });
    return;
  }
  next();
};

let checkRoleExisted = (req, res, next) => {
  if (req.body.role) {
    for (let i = 0; i < req.body.role.length; i++) {
      if (!Roles.includes(req.body.role[i])) {
        res.status(400).send({
          message: "Failed! Role does't exists = " + req.body.role,
        });
        return;
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUserName: checkDuplicateUserName,
  checkRoleExisted: checkRoleExisted,
};

module.exports = verifySignUp;

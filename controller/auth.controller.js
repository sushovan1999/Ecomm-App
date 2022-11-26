const db = require("../model/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sequelize = require("sequelize");
const config = require("../config/auth.config");
const User = db.user;
const Roles = db.roles;

let signup = async (req, res) => {
  let user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  if (req.body.role) {
    let roles = await Roles.findAll({
      where: {
        name: {
          [sequelize.Op.or]: req.body.role,
        },
      },
    });

    await user.setRoles(roles);
    res.status(200).json({
      message: "User registered successfully",
    });
  } else {
    await user.setRoles([1]);
    res.status(200).json({
      message: "Registered with user role as client don't specify the role",
    });
  }
};

let signin = async (req, res) => {
  let password = req.body.password;
  let username = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!username) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  let isValidPassword = bcrypt.compareSync(password, username.password);

  if (!isValidPassword) {
    res.status(401).json({
      message: "Password is incorrect",
    });
    return;
  }
  var token = jwt.sign({ id: username.id }, config.secret, {
    expiresIn: 86400,
  });

  let authorities = [];
  let roles = await username.getRoles();
  for (let i = 0; i < roles.length; i++) {
    authorities.push("ROLE_" + roles[i].name.toUpperCase());
  }

  res.status(200).send({
    id: username.id,
    username: username.username,
    email: username.email,
    roles: authorities,
    accessToken: token,
  });
};

module.exports = { signup, signin };

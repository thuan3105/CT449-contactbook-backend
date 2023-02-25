const LoginService = require("../services/login.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.login = async (req, res, next) => {
  try {
    const loginService = new LoginService(MongoDB.client);
    const { username, password } = req.body;
    console.log(req.body);
    const { user } = await loginService.login(username, password);
    res.json({ user});
  } catch (err) {
    next(err);
  }
};
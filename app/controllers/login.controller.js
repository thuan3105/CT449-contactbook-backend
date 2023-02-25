const express = require('express');
const router = express.Router();
const MongoDB = require("../utils/mongodb.util");
const loginService = require('../services/login.service');

exports.login = async (req, res, next) => {
    try {
        const loginService = new loginService(MongoDB.client);
        const { username, password } = req.body;
        console.log(req.body)
        const token = await loginService.authenticate(username, password);
        res.json({ token });
      } catch (error) {
        next(error);
      }
}

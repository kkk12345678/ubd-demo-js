const userService = require('../services/user-service');
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Invalid email or password.", errors.array()));
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }
    async getUsers(req, res, next) {
        try {
            res.json(["ljhkjgkig", "jghfkj"])
        } catch (e) {
            next(e);
        }
    }

    async getUser(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
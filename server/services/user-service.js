const {User} = require("../config/model");
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error');




class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({where: {email: email}});
        if (candidate) {
            throw new ApiError(400, `User with email ${email} already exists.`);
        }
        const hashedPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4()
        const defaultRole = 'USER';
        const user = await User.create({email, password: hashedPassword, activationLink, role: defaultRole});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = await tokenService.generateTokens({...userDto});
        await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async activate(activationLink) {
        const user = User.findOne({where: {activationLink: activationLink}});
        if (!user) {
            throw new ApiError("Incorrect activation link");
        }
        await User.update({isActivated: true}, {where: {activationLink: activationLink}})
    }
}

module.exports = new UserService();
const jwt = require('jsonwebtoken');
const {User} = require('../config/model');


class TokenService {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '30d'});
        return {accessToken, refreshToken};
    }

    async saveRefreshToken(userId, refreshToken) {
        const user = await User.findOne({where : {id: userId}});
        if (user) {
            user.refreshToken = refreshToken;
            return user.save();
        }
        throw new Error('There is no user with id ' + userId);
    }
}

module.exports = new TokenService();
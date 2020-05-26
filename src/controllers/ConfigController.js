const connection = require('../database/connections');
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
const authConfig = require('../../config/authConfig');

module.exports = {
    async validaToken(request, response) {
        try {
            const token = request.headers.auth 
            if(!token) {
                const retorno = {success: false, msg: 'TOKEN_INVALIDO'}
                return response.status(401).json(retorno)
            }
            
            try {
                const decoded = await promisify(jwt.verify)(token, authConfig.secret);
                request.userId = decoded.id

                const retorno = {success: true, msg: 'TOKEN_VALIDO'}
                return response.status(200).json(retorno)

            } catch (error) {
                const retorno = {success: false, msg: 'TOKEN_INVALIDO'}
                return res.status(401).json(retorno)
            }

        } catch (error) {
            const retorno = {success: false, msg: 'TOKEN_INVALIDO'}
            return response.status(401).json(retorno)
        }
    }
}
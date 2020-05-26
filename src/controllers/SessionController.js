const connection = require('../database/connections');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/authConfig');

module.exports = {
    async create(request, response) {
        try {
            const { email, password } = request.body;

            const user = await connection('user')
                .where({
                    'email': email,
                    'password': password,
                })
                .select('name')
                .select('id')
                .first();

            if( !user ){
                return response.status(400).json({error: 'Invalid user!'});
            }
            
            user.token = jwt.sign({id: user.id}, authConfig.secret, { expiresIn: authConfig.expiresIn } )
            return response.status(200).json(user);

        } catch (error) {
            return response.status(500).json({error: 'Fatal Error!'});
        }
    }
}
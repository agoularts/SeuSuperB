const connection = require('../database/connections');
const crypto = require('crypto');

module.exports= {
    async index(request, response) {
        try {
            const user = await connection('user').select('*');
            /*const { email } = request.params;
            const user = await connection('user').where('email', email).select('*');*/
            return response.status(200).json(user);

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu algum erro na API'}]
            return response.status(400).json(retorno);
        }
    },

    async create(request, response){
        try {
            const { name, email, password } = request.body;
            const id = crypto.randomBytes(4).toString('HEX'); 
        
            await connection('user').insert({
                id,
                name,
                email,
                password,
            })
        
            return response.json({ name });

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu algum erro na API'}]
            return response.status(400).json(retorno);
        }
    },

}
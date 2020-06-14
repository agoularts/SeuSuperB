const connection = require('../database/connections');

module.exports = {
    async index(request, response) { //Lista os produtos em /reciclagem/id
        try {
            const { id } = request.params;
            const packing = await connection('recycle')
                .where('id', id)
                .andWhere('category', "Embalagem")
                .select('*');
            console.log(packing)

            return response.status(200).json(packing);

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API' }]
            console.log(error)
            return response.status(400).json(retorno);
        }
    },

    async indexSearch(request, response) {
        try {
            const { name } = request.query;
            const searchPacking = await connection('recycle')
                .where('recycle.name', 'like', `%${name}%`)
                .andWhere('category', "Embalagem")
                .select('*')

            return response.status(200).json(searchPacking);

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API' }]
            return response.status(400).json(retorno);
        }
    },
}
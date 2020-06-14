const connection = require('../database/connections');

module.exports = {
    async index(request, response) { //Lista os produtos em /reciclagem/id
        try {
            const { id } = request.params;
            const symbol = await connection('recycle')
            .where('id', id)
            .andWhere('category', "Símbolo")
            .select('*');
            console.log(symbol)
            return response.status(200).json(symbol);

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API' }]
            console.log(error)
            return response.status(400).json(retorno);
        }
    },

    async indexSearch(request, response) {
        try {
            const { name } = request.query;
            const searchSymbol = await connection('recycle')
                .where('recycle.name', 'like', `%${name}%`)
                .andWhere('category', "Símbolo")
                .select('*')

            return response.status(200).json(searchSymbol);

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API' }]
            return response.status(400).json(retorno);
        }
    },
}
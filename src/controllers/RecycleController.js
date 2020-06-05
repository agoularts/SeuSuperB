const connection = require('../database/connections');

module.exports = {
    async index(request, response) { //Lista os produtos em /reciclagem/id
        try {
            const { id } = request.params;
            const recycle = await connection('recycle')
                .where('id', id)
                .select('*');

            return response.status(200).json(recycle);

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API' }]
            return response.status(400).json(retorno);
        }
    },

    async indexSearch(request, response) { //Lista os itens para pesquisa 
        try {
            const { name } = request.query;
            const searchRecycle = await connection('recycle')
                .where('recycle.name', 'like', `%${name}%`)
                .select('*');

            return response.status(200).json(searchRecycle);

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API' }]
            return response.status(400).json(retorno);
        }
    },

    async indexList(request, response) {
        try {
            const allRecycle = await connection('recycle')
            .select('*')

            return response.status(200).json(allRecycle);

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API' }]
            return response.status(400).json(retorno);
        }

    },

    async create(request, response) { //cria novo item
        try {
            const { name, image, description, curiosities, advantage, disadvantage } = request.body;

            const [id] = await connection('recycle').insert({
                name,
                image,
                description,
                curiosities,
                advantage,
                disadvantage,
            })

            return response.json({ id });
        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API' }]
            return response.status(400).json(retorno);
        }
    },

    // Lista os itens que podem ser alterados
    async indexUpdate(request, response) {
        try {
            const { id } = request.params;
            const listRecycle = await connection('recycle')
                .where('recycle.id', id)
                .select('*')

            return response.status(200).json(listRecycle);

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API.' }]
            return response.status(400).json(retorno);
        }
    },

    // Altera os dados do item selecionado em indexUpdate
    async update(request, response) {

        const { id, name, image, description, curiosities, advantage, disadvantage } = request.body;

        await connection('recycle').where('recycle.id', id).update({
            id,
            name,
            image,
            description,
            curiosities,
            advantage,
            disadvantage,
        })
        return response.json({ name });
    },

    // Deleta um item
    async delete(request, response) {
        try {
            const { id } = request.params;

            const recycle = await connection('recycle')
                .where('recycle.id', id)
                .select('id')
                .first();

            if (recycle[0].id != id) {
                return response.status(401).json({ error: 'Operation not permited' });
            }

            await connection('recycle').where('id', id).delete();

            return response.status(204).send();

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API' }]
            return response.status(400).json(retorno);
        }

    }
}
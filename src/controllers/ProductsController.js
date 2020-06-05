const connection = require('../database/connections');

module.exports = {
    //Lista os produtos cadastrados por ID
    async index(request, response) {
        try {
            const { id } = request.params;
            const product = await connection('product')
                .where('id', id)
                .select('*')
                .join('nutritionFacts', { 'product.id': 'nutritionFacts.product_id' });

            return response.status(200).json(product);

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API' }]
            return response.status(400).json(retorno);
        }
    },

    // Lista os itens para busca
    async indexSearch(request, response) {
        try {
            const { name } = request.query;
            const searchProduct = await connection('product')
                .where('product.name', 'like', `%${name}%`)
                .select('*')
                .join('nutritionFacts', { 'product.id': 'nutritionFacts.product_id' });

            return response.status(200).json(searchProduct);

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API' }]
            return response.status(400).json(retorno);
        }
    },

    // lista os itens que podem ser alterados
    async indexList(request, response) {
        try {
            const allProducts = await connection('product')
            .select('*')
            .join('nutritionFacts', { 'product.id': 'nutritionFacts.product_id' });

            return response.status(200).json(allProducts);

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API' }]
            return response.status(400).json(retorno);
        }

    },

    //Cria um novo produto
    async create(request, response) {
        try {
            const { name, img, description, category, specifications, brand,
                curiosities, howToBuy, howToPrepare, howToStore,
                howToDiscard } = request.body;


            const [id] = await connection('product').insert({
                name,
                img,
                description,
                category,
                specifications,
                brand,
                curiosities,
                howToBuy,
                howToPrepare,
                howToStore,
                howToDiscard,
            })

            return response.status(200).json({ id, name });

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API' }]
            return response.status(400).json(retorno);
        }
    },

    // Lista os itens que podem ser alterados
    async indexUpdate(request, response) {
        try {
            const { id } = request.params;
            const listProduct = await connection('product')
                .where('product.id', id)
                .select('*')
                .join('nutritionFacts', { 'product.id': 'nutritionFacts.product_id' }, );

            console.log(listProduct)

            return response.status(200).json(listProduct);

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API.' }]
            console.log(err)
            return response.status(400).json(retorno);
        }
    },

    // Altera os dados do item selecionado em indexUpdate
    async update(request, response) {

        const { product_id, name, img, description, category, specifications, brand,
            curiosities, howToBuy, howToPrepare, howToStore,
            howToDiscard } = request.body;

        await connection('product').where('product.id', product_id).update({
            id,
            name,
            img,
            description,
            category,
            specifications,
            brand,
            curiosities,
            howToBuy,
            howToPrepare,
            howToStore,
            howToDiscard,
        })
        return response.json({ name });
    },

    // Deleta um produto
    async delete(request, response) {
        try {
            const { id } = request.params;

            const product = await connection('product')
                .where('product.id', id)
                .select('id')
                .first();

            if (product[0].id != id) {
                return response.status(401).json({ error: 'Operation not permited' });
            }

            await connection('product').where('id', id).delete();

            return response.status(204).send();

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API' }]
            return response.status(400).json(retorno);
        }

    }
}
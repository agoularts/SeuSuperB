const connection = require('../database/connections');

module.exports= {
    //Lista os produtos cadastrados
    async index (request, response) {
        try {
            const { id } = request.params;
            const product = await connection('product')
                .where('id' , id)
                .select('*')
                .join('nutritionFacts', { 'product.id': 'nutritionFacts.product_id' });

            return response.status(200).json(product);

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu algum erro na API'}]
            return response.status(400).json(retorno);
        }
    },

    async indexSearch (request, response) {
        try {
            //return response.status(200).json({ok:true});
            
            const { name } = request.query;
            const searchProduct = await connection('product')
            .where('product.name', 'like', `%${ name }%`)
            .select('*')
            .join('nutritionFacts', { 'product.id': 'nutritionFacts.product_id' }, );

            return response.status(200).json(searchProduct);

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu algum erro na API'}]
            console.log(error);
            return response.status(400).json(retorno);
        }
    },
    
    //Cria um novo produto
    async create(request, response){
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
            const retorno = [{success: 0, msg: 'Ocorreu algum erro na API'}]
            return response.status(400).json(retorno);
        }
    },

    async delete (request, response){
        try {
            const { id } = request.params;

            const product = await connection('product')
            .where('id', id)
            .select('id')
            .first();

            if(product[0].id != id){
                return response.status(401).json({error: 'Operation not permited' });
            }

            await connection('product').where('id', id).delete();

            return response.status(204).send();

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu algum erro na API'}]
            return response.status(400).json(retorno);
        }

    }
}
const connection = require('../database/connections');

module.exports= {
    //Lista os mercados cadastrados
    async index (request, response) {
        try {
            const {id_usuario} = request.body;
            const favorites = await connection('favorites')
            .where('favorites.user_id' , id_usuario)
            .join('user', 'favorites.user_id', 'user.id')
            .join('product', 'favorites.product_id', 'product.id')
            .select('favorites.product_id', 'product.id', 'product.name');
            
            return response.status(200).json(favorites); 
              
        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu algum erro na API'}]
            return response.status(400).json(retorno);
        }
    },

    //Cria um novo mercado
    async create(request, response){
        const { user_id, product_id } = request.body;
        
        const [id] = await connection('favorites').insert({
            user_id,
            product_id
        })
        return response.json({ user_id });
    },

    async delete (request, response){
        try {
            const { product_id } = request.params;

            const favorites = await connection('favorites')
            .where('favorites.product_id',  product_id)
            .select('id')
            .first();

            if(favorites[0].product_id !=  product_id){
                return response.status(401).json({error: 'Operation not permited' });
            }

            await connection('favorites').where('favorites.product_id',  product_id).delete();

            return response.status(204).send();

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu algum erro na API'}]
            return response.status(400).json(retorno);
        }

    }
}
const connection = require('../database/connections');

module.exports= {
    async index (request, response) {
        try {
            const {id} = request.params;
            const favorites = await connection('favorites')
            .where('favorites.user_id' , id)
            .join('user', 'favorites.user_id', 'user.id')
            .join('product', 'favorites.product_id', 'product.id')
            .select('product.name');

            return response.status(200).json(favorites); 
              
        } catch (error) {
            console.log('index', error)
            const retorno = [{success: 0, msg: 'Ocorreu algum erro na API'}]
            return response.status(400).json(retorno);
        }
    },

    async indexFavorite (request, response) {
        try {
            const {id_usuario, id_product} = request.query;
            const favorites = await connection('favorites')
            .where({'favorites.user_id' : id_usuario, 'favorites.product_id': id_product})
            .select('*');
            
            return response.status(200).json(favorites); 
              
        } catch (error) {
            console.log('create',error)
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
        console.log(request.body)
        return response.json({ id });
    },

    async delete (request, response){
            try {
                const { id } = request.params;
    
                await connection('favorites')
                    .where('favorites.product_id', id)
                    .select('id')
                    .first();

                    console.log(id); 
    
                await connection('favorites').where('favorites.product_id', id).delete();
    
                return response.status(204).send();

        } catch (error) {
            console.log('del', error)
            const retorno = [{success: 0, msg: 'Ocorreu algum erro na API'}]
            return response.status(400).json(retorno);
        }

    }
}
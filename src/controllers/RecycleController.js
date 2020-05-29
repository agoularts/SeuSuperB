const connection = require('../database/connections');

module.exports= {
    async index (request, response) {
        try {
            const { id } = request.params;
            const recycle = await connection('recycle').where('id' , id).select('*');

            return response.status(200).json(recycle);

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu algum erro na API'}]
            return response.status(400).json(retorno);
        }
    },

    async indexSearch (request, response) {
        try {
            //return response.status(200).json({ok:true});
            
            const { name } = request.query;
            const searchRecycle = await connection('recycle')
            .where('recycle.name', 'like', `%${ name }%`)
            .select('*');

            return response.status(200).json(searchRecycle);

        } catch (error) {
            const retorno = [{success: 0, msg: 'Ocorreu algum erro na API'}]
            console.log(error);
            return response.status(400).json(retorno);
        }
    },
    async create(request, response){
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
            const retorno = [{success: 0, msg: 'Ocorreu algum erro na API'}]
            return response.status(400).json(retorno);
        }
    }
}
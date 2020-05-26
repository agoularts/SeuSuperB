const connection = require('../database/connections');

module.exports= {
    async index(request, response) {
        const { id } = request.params;
        const recycle = await connection('recycle').where('id' , id).select('*');
        
        return response.json(recycle);
    },

    async indexAll(request, response) {
        const listRecycle = await connection('recycle').select('*');
        
        return response.json(listRecycle);
    },

    async create(request, response){
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
    },

}
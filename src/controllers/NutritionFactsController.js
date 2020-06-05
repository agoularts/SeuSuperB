const connection = require('../database/connections');

module.exports= {
    //Lista os mercados cadastrados
    async index (request, response) {
        const nutritionFacts = await connection('nutritionFacts').select('*');
   
        return response.json(nutritionFacts);
    },

    //Cria um novo mercado
    async create(request, response){
        const { portion, calories, carbohidrate, protein,
                totalFat, saturatedFat, transFat, cholesterol, dietaryFiber, 
                sodium, vitamins, calcium, vitB1,vitB2, vitB6,  iron, niacin,
                panthotenicAcid, folicAcid, sugar, monounsaturatedFat, product_id } = request.body;
        
        await connection('nutritionFacts').insert({
            product_id,
            portion,
            calories,
            carbohidrate,
            protein,
            totalFat,
            saturatedFat,
            transFat,
            cholesterol,
            dietaryFiber,
            sodium,
            vitamins,
            calcium,
            vitB1,
            vitB2,
            vitB6, 
            iron,
            niacin, 
            panthotenicAcid,
            folicAcid,
            sugar,
            monounsaturatedFat
        })

        return response.json({ product_id });
    },

    // Lista os itens que podem ser alterados
    async indexUpdate(request, response) {
        try {
            const { id } = request.params;
            const listNutrition = await connection('nutritionFacts')
                .where('nutritionFacts.product_id', id)
                .select('*')

            return response.status(200).json(listNutrition);

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API.' }]
            return response.status(400).json(retorno);
        }
    },

    async update(request, response) {

        const { portion, calories, carbohidrate, protein,
            totalFat, saturatedFat, transFat, cholesterol, dietaryFiber, 
            sodium, vitamins, calcium, vitB1,vitB2, vitB6,  iron, niacin,
            panthotenicAcid, folicAcid, sugar, monounsaturatedFat, product_id  } = request.body;

        await connection('nutritionFacts').where('nutritionFacts.product_id', product_id).update({
            product_id,
            portion,
            calories,
            carbohidrate,
            protein,
            totalFat,
            saturatedFat,
            transFat,
            cholesterol,
            dietaryFiber,
            sodium,
            vitamins,
            calcium,
            vitB1,
            vitB2,
            vitB6, 
            iron,
            niacin, 
            panthotenicAcid,
            folicAcid,
            sugar,
            monounsaturatedFat
        })

        return response.json({ name });

    },

    async delete(request, response) {
        try {
            const { id } = request.params;

            await connection('nutritionFacts')
                .where('nutritionFacts.product_id', id)
                .select('product_id')
                .first();

            await connection('nutritionFacts').where('nutritionFacts.product_id', id).delete();

            return response.status(204).send();

        } catch (error) {
            const retorno = [{ success: 0, msg: 'Ocorreu algum erro na API' }]
            return response.status(400).json(retorno);
        }
    }
}
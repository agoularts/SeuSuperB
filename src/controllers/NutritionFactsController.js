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
}
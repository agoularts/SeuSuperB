const express = require('express');

const authMiddleware = require('./middlewares/authValidate');

const ConfigController = require('./controllers/ConfigController');
const UserController =  require('./controllers/UserController');
const MarketController =  require('./controllers/MarketController');
/*const ProfileController =  require('./controllers/ProfileController');*/
const SessionController = require('./controllers/SessionController');
const ProductsController = require('./controllers/ProductsController');
const NutritionFactsController = require('./controllers/NutritionFactsController');
const RecycleController = require('./controllers/RecycleController');
const FavoriteController = require('./controllers/FavoriteController');

const routes = express.Router();

routes.get('/config/validaToken', ConfigController.validaToken)
routes.post('/sessions', SessionController.create);

routes.get('/user', UserController.index);
routes.post('/user', UserController.create);
routes.put('/updateMarket/:cnpj', MarketController.update);
routes.put('/updateProduct/:id', ProductsController.update);
routes.put('/updateNutrition/:product_id', NutritionFactsController.update);
routes.put('/updateRecycle/:id', RecycleController.update);
routes.post('/product', ProductsController.create);
routes.post('/nutrition', NutritionFactsController.create);
routes.delete('/product/:id', ProductsController.delete);
routes.post('/recycle', RecycleController.create);

/*routes.get('/profile', ProfileController.index); */
routes.use(authMiddleware)

routes.post('/market', MarketController.create);
routes.get('/market', MarketController.index);
routes.get('/searchMarket/:cnpj', MarketController.indexUpdate);
routes.delete('/market/:cnpj', MarketController.delete);

routes.get('/productEdit', ProductsController.indexList);
routes.get('/searchProduct', ProductsController.indexSearch);
routes.get('/product/:id', ProductsController.index);
routes.get('/productList/:id', ProductsController.indexUpdate);
routes.delete('/product/:id', ProductsController.delete);

routes.get('/nutrition', NutritionFactsController.index);
routes.delete('/nutrition/:product_id', NutritionFactsController.delete);

routes.get('/recycle', RecycleController.indexList);
routes.get('/searchRecycle', RecycleController.indexSearch);
routes.get('/recycleList/:id', RecycleController.indexUpdate);
routes.get('/recycle/:id', RecycleController.index);
routes.delete('/recycle/:id', RecycleController.delete);

routes.post('/favorite', FavoriteController.create);
routes.get('/favorite', FavoriteController.index);
routes.delete('/favorite/:id', MarketController.delete);

module.exports = routes;
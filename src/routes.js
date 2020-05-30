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

const routes = express.Router();

routes.get('/config/validaToken', ConfigController.validaToken)
routes.post('/sessions', SessionController.create);
routes.get('/user', UserController.index);
routes.post('/user', UserController.create);
routes.post('/market', MarketController.create);
routes.post('/product', ProductsController.create);
routes.post('/nutrition', NutritionFactsController.create);
routes.post('/recycle', RecycleController.create);
routes.post('/market', MarketController.delete);

/*routes.get('/profile', ProfileController.index); */
routes.use(authMiddleware)

routes.get('/market', MarketController.index);
routes.delete('/market/:cnpj', MarketController.delete);

routes.get('/product/:id', ProductsController.index);
routes.get('/searchProduct', ProductsController.indexSearch);

routes.get('/nutrition', NutritionFactsController.index);

routes.get('/recycle/:id', RecycleController.index);
routes.get('/searchRecycle', RecycleController.indexSearch);

module.exports = routes;
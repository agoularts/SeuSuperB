const express = require('express');

//const authMiddleware = require('./middlewares/authValidate');

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

/*routes.get('/profile', ProfileController.index); */
//routes.use(authMiddleware)

routes.get('/market', MarketController.index);
routes.post('/market', MarketController.create);

routes.get('/product/:id', ProductsController.index);
routes.get('/listProduct', ProductsController.indexAll);
routes.get('/searchProduct', ProductsController.indexSearch);
routes.post('/product', ProductsController.create);

routes.get('/nutrition', NutritionFactsController.index);
routes.post('/nutrition', NutritionFactsController.create);

routes.get('/recycle/:id', RecycleController.index);
routes.get('/listRecycle', RecycleController.indexAll);
routes.post('/recycle', RecycleController.create);

module.exports = routes;
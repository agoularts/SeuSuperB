const express = require('express'); //importa as funcionalidades do express
const cors = require('cors');
const routes = require ('./routes');

const app = express(); //var que armazena a aplicação

//informa que o corpo das requisições estão em formato json.
//Converte o json pra um obj JS
app.use(cors());
app.use(express.json());
app.use(routes); 

app.listen(process.env.PORT || 3333); //define a porta que o acessa a aplicação
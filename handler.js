'use strict';

const querystring = require("querystring")

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hola Serverless!!!',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.helloUser = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Hola Usuario ${event.pathParameters.name}`,
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.createUser = async (event) => {
  const body = querystring.parse(event["body"])
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Petición POST para crear usuarios",
        input: `Hola ${body.user}`,
      },
      null,
      2
    ),
  };
};

const express = require('express');
const handler = express();
const port = process.env.PORT || 3000;

const productRouter = require('./routes/product');

handler.use(express.json());
handler.use('/product', productRouter);

handler.get('/', (req, res) => {
  res.send('<h1>Node.js CRUD API</h1> <h4>Message: Success</h4><p>Version: 1.0>/p>');
})

handler.get('/health', (req, res) => {
  res.send();
})

handler.listen(port, () => {
  console.log('La aplicación de demostración está escuchando al puerto: ' + port);
})
const swaggerAutogen = require('swagger-autogen');

const outputFile = './swagger_output.json';
const endpointsFiles = [
    './src/routes/Router.ts',
];

const doc = {
    info: {
        version: '2.0.0',
        title: 'My API',
        description: 'This is a sample API by Hong Son',
    },
    host: 'localhost:3001',
    basePath: '/api/v1',
    schemes: ['http'],
    apis: ['./routes/*.route.ts'],
}

swaggerAutogen(outputFile, endpointsFiles, doc)
    .catch(error => {
        console.error('Erro when auto generate Swagger: ', error.message);
    });
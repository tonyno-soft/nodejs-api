const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");



const options = {
    definition: {
        openapi: "3.1.0",
        info: { title: "Multiplica API", version: "1.0.0" }
    },
    apis: ["./routes/*.js"]
};

const swaggerSpect = swaggerJSDoc(options);


const swaggerDocs = (app) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpect));
    app.get('/api/docs.json', (req, res) => {
        res.json(swaggerSpect)
    });

    console.log("Version 1 docs available at: /api/docs");
}

module.exports = { swaggerDocs }
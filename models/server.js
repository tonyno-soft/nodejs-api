const express = require("express");
const cors = require("cors");
const db = require("../database/connection");

const {swaggerDocs} = require("../routes/swagger");

const userRoutes = require('../routes/usuario');
const publicacionRoutes = require('../routes/publicacion');
const authRoutes = require('../routes/auth');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT | 5442;

        this.paths = {
            auth: '/api',
            usuarios: '/api/usuarios',
            publicaciones: '/api/publicaciones'
        }

        //Conectar base de datos
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas
        this.routes();
    }


    async conectarDB() {
        try {
            await db.authenticate();
            console.log("DataBase is Online.");
        } catch (error) {
            throw new Error( error );
        }
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio Public
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.paths.auth, authRoutes);
        this.app.use( this.paths.usuarios, userRoutes )
        this.app.use( this.paths.publicaciones, publicacionRoutes )
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`
------------------------------------------------------------------
     ------- Servidor Corriendo en el puerto: ${this.port} -----
------------------------------------------------------------------

             `);
             swaggerDocs(this.app, this.port)
        })
    }

}


module.exports = Server;
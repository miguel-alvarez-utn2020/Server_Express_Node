const express = require('express');
const  cors = require('cors')
const { dbConection } = require('../database/config')
require('dotenv').config();

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';
        this.authPath = '/api/auth'
        //Conectar a base de datos
        this.conectionDB();
        //Middleware
        this.middleware();
        //Rutas de mi app
        this.routes();
    }

    routes(){
        this.app.use(this.userPath, require('../routes/user'))
        this.app.use(this.authPath, require('../routes/auth'))
    }

    async conectionDB(){
        await dbConection();
    }

    middleware(){
        //CORS
        this.app.use( cors() )

        //Lectura y parseo del body
        this.app.use( express.json() )

        //los middlewares se usan con el métoto use.
        this.app.use( express.static('public') )
    }

    listen(){
        this.app.listen(this.port, ()=> {
            console.log(`Server on in PORT: ${this.port}`);
        })
    }
}

module.exports = Server;
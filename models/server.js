const express = require('express');
var cors = require('cors')
require('dotenv').config();
class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users'
        //Middleware

        //Rutas de mi app
        this.middleware();
        this.routes();
    }

    routes(){
        this.app.use(this.userPath, require('../routes/user'))
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
//Core framework
import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');

//Entifix framework
import entifix = require('entifix-ts-backend');

//Application
import UserEntity = require('./app/entities/User');


class App extends entifix.EntifixApplication 
{

    //#region Properties
    
    //#endregion


    //#region Methods

    protected registerEntities() : void 
    {
        //App Entities
        this.session.registerEntity<UserEntity.IUserModel, UserEntity.User>( UserEntity.User, UserEntity.User.getInfo() );
        
    }


    protected exposeEntities() : void
    {
        //App Entities
        this.routerManager.exposeEntity('User');
        
    }

    protected validateToken (token: string, request: express.Request) : Promise<{success:boolean, message:string}>
    {
        return null;
    }

    //#endregion

    
    //#region Accessors
    
    protected get serviceConfiguration()
    {
        let config : entifix.EntifixAppConfig = {
            serviceName: 'ratings-management-users',
            mongoService: process.env.MONGO_SERVICE || 'localhost:27017/ratings-management-users-db',
            amqpService: process.env.AMQP_SERVICE,
            cors: { enable: true },
            protectRoutes: { enable: false },
            devMode: true
        }

        return config;
    }
    
    //#endregion


}

export { App }
//Core framework
import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');

//Entifix framework
import entifix = require('entifix-ts-backend');

//Application
import PurchaseEntity = require('./app/entities/Purchase');


class App extends entifix.EntifixApplication 
{

    //#region Properties
    
    //#endregion


    //#region Methods

    protected registerEntities() : void 
    {
        //App Entities
        this.session.registerEntity<PurchaseEntity.IPurchaseModel, PurchaseEntity.Purchase>( PurchaseEntity.Purchase, PurchaseEntity.Purchase.getInfo() );
        
    }

    protected exposeEntities() : void
    {
        //App Entities
        this.routerManager.exposeEntity('Purchase');
    }

    protected validateToken (token: string, request: express.Request) : Promise<{success:boolean, message:string}>
    {
        return this.requestTokenValidationWithCache(token, request);
    }

    //#endregion

    
    //#region Accessors
    
    protected get serviceConfiguration()
    {
        let config : entifix.EntifixAppConfig = {
            serviceName: 'ratings-management-purchases',
            mongoService: process.env.MONGO_SERVICE || 'localhost:27017/ratings-management-purchases-db',
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
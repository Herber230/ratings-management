//Core framework
import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
import amqp = require('amqplib/callback_api');

//Entifix framework
import entifix = require('entifix-ts-backend');

//Application
import PurchaseEntity = require('./app/entities/Purchase');
import PurchaseRatingEntity = require('./app/entities/PurchaseRating');
import { StoreRatingUpdate, IStoreRatingUpdateModel  } from './app/entities/StoreRatingUpdate';
import { PurchaseEventHandler } from './app/event-handlers/PurchaseEventHandler';

class App extends entifix.EntifixApplication 
{

    //#region Properties
    
    private _purchaseEventHandler : PurchaseEventHandler;

    //#endregion


    //#region Methods

    protected registerEntities() : void 
    {
        //App Entities
        this.session.registerEntity<PurchaseEntity.IPurchaseModel, PurchaseEntity.Purchase>( PurchaseEntity.Purchase, PurchaseEntity.Purchase.getInfo() );
        this.session.registerEntity<PurchaseRatingEntity.IPurchaseRatingModel, PurchaseRatingEntity.PurchaseRating>( PurchaseRatingEntity.PurchaseRating, PurchaseRatingEntity.PurchaseRating.getInfo());
        this.session.registerEntity<IStoreRatingUpdateModel, StoreRatingUpdate>( StoreRatingUpdate, StoreRatingUpdate.getInfo());
    
    }

    protected exposeEntities() : void
    {
        //App Entities
        this.routerManager.exposeEntity('Purchase');

    }

    protected validateToken (token: string, request: express.Request) : Promise<{success:boolean, message:string}>
    {
        return null;
    }

    configSessionAMQPConneciton() : void
    {
        this.session.amqpExchangesDescription = [ 
            { name: 'main_events', type: 'topic', durable: true }
        ];
        
        this.session.amqpQueueBindsDescription = [ 
            { name: 'update_purchase', exchangeName: 'main_events', routingKey: 'saved.rating', exclusive: false  } 
        ];
    }

    onSessionCreated() : void
    {
        super.onSessionCreated();

        //Manage events
        this._purchaseEventHandler = new PurchaseEventHandler( { secondsToUpdate: this.secondsToUpdateStore });
        this.session.brokerChannel.consume('update_purchase', message => this._purchaseEventHandler.onRatingUpdated(this.session, message) );
    }

    //#endregion

    
    //#region Accessors
    
    protected get serviceConfiguration()
    {
        let config : entifix.EntifixAppConfig = {
            serviceName: 'ratings-management-purchases',
            mongoService: process.env.MONGO_SERVICE || 'localhost:27017/ratings-management-purchases-db',
            amqpService: process.env.AMQP_SERVICE || 'localhost:5672',
            amqpDefaultInteraction: false,
            cors: { enable: true },
            protectRoutes: { enable: false },
            devMode: true
        }

        return config;
    }

    private get secondsToUpdateStore() : number
    {
        if ( process.env.SECONDS_TO_UPDATE_STORE)
            return parseInt(process.env.SECONDS_TO_UPDATE_STORE);
        
        //Default value
        return 60;
    }
    
    //#endregion

}

export { App }
import ampq = require('amqplib/callback_api');

import {
    EMSession
} from 'entifix-ts-backend';


import { Purchase, IPurchaseModel } from '../entities/Purchase';
import { PurchaseRating, IPurchaseRatingModel } from '../entities/PurchaseRating';
import { StoreRatingUpdate, IStoreRatingUpdateModel } from '../entities/StoreRatingUpdate';


interface RatingMessage 
{ 
    idRating : string;
    idPurchase : string; 
    idStore : string;
    idUser : string;
    action : string;
    score : number;
}

interface PurchaseMessage
{   
    idPurchase : string;
    idStore : string;
    totalScore : number;
    countPurchases : number;
}

class PurchaseEventHandler
{
    //#region Properties

    private _secondsToUpdate : number;

    //#endregion


    //#region Methods

    constructor( options : { secondsToUpdate : number }) 
    {
        this._secondsToUpdate = options.secondsToUpdate;
    }

    onRatingUpdated( session : EMSession,  message : ampq.Message ) : void
    {
        let messageContent = this.castMessage( message );

        session.findEntity<Purchase, IPurchaseModel>(Purchase.getInfo(), messageContent.idPurchase).then(
            purchase => {
                let purchaseRating : PurchaseRating;
                let savePurchaseRating = false;
        
                if (messageContent.action == 'create' || messageContent.action == 'update')
                    purchase.score = messageContent.score;   
                else if (messageContent.action == 'delete')
                    purchase.score = null;

                purchase.save().then( movflow => {
                    if (movflow.continue)
                    {
                        let filter = {  $and:   [   { deferredDeletion: {$in: [null, false]}},
                                                    { idStore: messageContent.idStore }         ] };
                
                        session.getModel<IStoreRatingUpdateModel>("StoreRatingUpdate").findOne().where(filter).sort('created').exec(
                            (err, doc) => {
                                if (!err)
                                {
                                    if (doc == null || this.isTimeToUpdate(doc.created))
                                    {
                                        let filterByStore = { $and: [   { idStore: messageContent.idStore },
                                                                        { score: { $gte: 0 } }                  ]};

                                        session.listEntitiesByQuery<Purchase, IPurchaseModel>(Purchase.getInfo(), filterByStore).then( 
                                            purchasesByStore => {
                                                let totalScoreByStore = purchasesByStore.map( p => p.score).reduce( (p,n)=> p+n );
                                                let messageToBroker : PurchaseMessage = {
                                                    idPurchase: messageContent.idPurchase,
                                                    idStore : messageContent.idStore,
                                                    totalScore: totalScoreByStore,
                                                    countPurchases : purchasesByStore.length
                                                }
                
                                                let newStoreRatingUpdate = new StoreRatingUpdate(session);
                                                newStoreRatingUpdate.idStore = messageToBroker.idStore;
                                                newStoreRatingUpdate.ratingScore = messageToBroker.totalScore;
                                                newStoreRatingUpdate.ratingCount = messageToBroker.countPurchases;

                                                session.brokerChannel.publish('main_events', 'saved.purchase.store_update', new Buffer(JSON.stringify(messageToBroker)));
                                                newStoreRatingUpdate.save();
                                            }
                                        );
                                    }
                                }
                            }
                        );
                    }
                });
            }
        );
    }

    castMessage( message : ampq.Message ) : RatingMessage
    {
        return JSON.parse( message.content.toString() ) as RatingMessage;
    }

    private isTimeToUpdate( lastUpdated : Date ) : boolean
    {
        let currentTime = new Date().getTime();
        let lastUpdatedTime = lastUpdated.getDate();
        let diff = (currentTime - lastUpdatedTime)/(1000*60); // Time in seconds;

        return diff > this._secondsToUpdate;
    }
     
    //#endregion


    //#region Accessors

    //#endregion
}

export { PurchaseEventHandler }
import ampq = require('amqplib/callback_api');

import { Purchase, IPurchaseModel } from '../entities/Purchase';
import { PurchaseRating, IPurchaseRatingModel } from '../entities/PurchaseRating';

import {
    EMSession
} from 'entifix-ts-backend';


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

class PurchaseEventHandlers
{

    static onRatingUpdated( session : EMSession,  message : ampq.Message ) : void
    {
        let messageContent = this.castMessage( message );

        session.findEntity<Purchase, IPurchaseModel>(Purchase.getInfo(), messageContent.idPurchase).then(
            purchase => {
                let purchaseRating : PurchaseRating;
                let savePurchaseRating = false;
                
                if (purchase.purchaseRatings)
                    purchaseRating = purchase.purchaseRatings.find( pr => pr.idRating == messageContent.idRating );

                if (!purchaseRating)
                {
                    let newPurchaseRating = new PurchaseRating(session);
                    newPurchaseRating.idRating = messageContent.idRating;
                    newPurchaseRating.score = messageContent.score;
                    
                    if (!purchase.purchaseRatings)
                        purchase.purchaseRatings = new Array<PurchaseRating>();
                    
                    purchase.purchaseRatings.push(newPurchaseRating);

                    savePurchaseRating = true;
                }
                else if (purchaseRating.score != messageContent.score)
                {
                    purchase.purchaseRatings.find( pr => pr.idRating == messageContent.idRating ).score = messageContent.score;
                    savePurchaseRating = true;
                }


                if (savePurchaseRating)
                    purchase.save().then( movFlow => {
                        if (movFlow.continue)
                        {
                            let filterByStore = { idStore: purchase.idStore };
                            session.listEntitiesByQuery<Purchase, IPurchaseModel>(Purchase.getInfo(), filterByStore).then( 
                                purchasesByStore => {

                                    let totalScoreByStore = 0;
                                    purchasesByStore.filter( p => p.purchaseRatings ).forEach( purchase => {
                                        totalScoreByStore += purchase.purchaseRatings.map( pr => pr.score ).reduce( (p,n) => p + n );
                                    });

                                    let message : PurchaseMessage = {
                                        idPurchase: purchase._id.toString(),
                                        idStore : purchase.idStore,
                                        totalScore: totalScoreByStore,
                                        countPurchases : purchasesByStore.length
                                    }

                                    session.brokerChannel.publish('main_events', 'saved.purchase', new Buffer(JSON.stringify(message)));
                                }
                            );
                        }
                    }); 

            }
        )
    }



    static castMessage( message : ampq.Message ) : RatingMessage
    {
        return JSON.parse( message.content.toString() ) as RatingMessage;
    }
}

export { PurchaseEventHandlers }
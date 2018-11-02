package com.ratingsmanagement.stores.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.ratingsmanagement.stores.models.StorePurchase;

/**
 *
 * @author herber230
 */
public interface StorePurchaseRepository extends MongoRepository<StorePurchase, String> {
  
  StorePurchase findBy_id(ObjectId _id);
  
  StorePurchase findByIdStoreAndIdPurchase(String idStore, String idPurchase );

}

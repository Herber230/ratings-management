package com.ratingsmanagement.stores.repositories;


import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.ratingsmanagement.stores.models.Store;

/**
 *
 * @author herber230
 */
public interface StoreRepository extends MongoRepository<Store, String> {
  Store findBy_id(ObjectId _id);
}

package com.ratingsmanagement.stores.repositories;


import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.ratingsmanagement.stores.models.Store;
import java.util.List;

/**
 *
 * @author herber230
 */
public interface StoreRepository extends MongoRepository<Store, String> {
  
    Store findById(ObjectId id);
  
    List<Store> findByDeferredDeletionIsFalse();
  
}

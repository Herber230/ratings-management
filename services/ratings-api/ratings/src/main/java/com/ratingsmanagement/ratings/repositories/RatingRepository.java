/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ratingsmanagement.ratings.repositories;


import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.ratingsmanagement.ratings.models.Rating;
import java.util.List;

/**
 *
 * @author herber230
 */
public interface RatingRepository extends MongoRepository<Rating, String> {
  
    Rating findById(ObjectId id);
  
    List<Rating> findByDeferredDeletionIsFalse();
}

package com.ratingsmanagement.ratings.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
import java.util.List;
import org.bson.types.ObjectId;
import com.ratingsmanagement.ratings.models.Rating;
import com.ratingsmanagement.ratings.repositories.RatingRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.ratingsmanagement.ratings.utilities.WrapperCollection;
import com.ratingsmanagement.ratings.utilities.WrapperEntity;


import com.ratingsmanagement.ratings.eventHandlers.Publisher;
/**
 *
 * @author herber230
 */
@RestController
@CrossOrigin
@RequestMapping("/rating")
public class RatingController {

  @Autowired
  private RatingRepository repository;
  
  @Autowired
  Publisher publisher;

  // <editor-fold defaultstate="uncollapsed" desc="Exposed Methods">
  
  @RequestMapping(value = "", method = RequestMethod.GET)
  public WrapperCollection<Rating> getAll() {
      List<Rating> ratings = repository.findByDeferredDeletionIsFalse();
      return new WrapperCollection<>( null , false, ratings, ratings.size(), ratings.size(), 1 );
  }
  
  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public WrapperEntity<Rating> getById(@PathVariable("id") ObjectId id) {
    return new WrapperEntity<>(null, false, "Entity", repository.findById(id));
  }
 
  @RequestMapping(value = "", method = RequestMethod.PUT)
  public WrapperEntity<Rating> modifyById(@Valid @RequestBody Rating rating) throws JsonProcessingException {
    repository.save(rating);
    publisher.ratingSaved(rating, "update");
    return new WrapperEntity<>(null, false, "Entity", rating);
  }
 
  @RequestMapping(value = "", method = RequestMethod.POST)
  public WrapperEntity<Rating> create(@Valid @RequestBody Rating rating) throws JsonProcessingException {
    rating.set_id(ObjectId.get());
    repository.save(rating);    
    publisher.ratingSaved(rating, "create");
    return new WrapperEntity<>(null, false, "Entity", rating);
  }
 
  
  @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
  public WrapperEntity<Rating> delete(@PathVariable ObjectId id) throws JsonProcessingException {
    Rating rating = repository.findById(id);
    rating.deferredDeletion = true;
    repository.save(rating);
    publisher.ratingSaved(rating, "delete");
    return new WrapperEntity<>(null, false, "Entity", rating);
  }
  
  // </editor-fold>

  
  

  // <editor-fold defaultstate="uncollapsed" desc="Utility methods">

  
  
  // </editor-fold>
  
   
}    


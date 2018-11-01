package com.ratingsmanagement.ratings.controllers;

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
 
  @RequestMapping(value = "/", method = RequestMethod.GET)
  public List<Rating> getAll() {
    return repository.findAll();
  }
  
  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public Rating getById(@PathVariable("id") ObjectId id) {
    return repository.findBy_id(id);
  }
 
  @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
  public void modifyById(@PathVariable("id") ObjectId id, @Valid @RequestBody Rating rating) {
    rating.set_id(id);
    repository.save(rating);
  }
 
  @RequestMapping(value = "/", method = RequestMethod.POST)
  public Rating create(@Valid @RequestBody Rating rating) {
    rating.set_id(ObjectId.get());
    repository.save(rating);
    publisher.send("Calificacion registrada");
    return rating;
  }
 
  @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
  public void deletePet(@PathVariable ObjectId id) {
    repository.delete(repository.findBy_id(id));
  }
}    


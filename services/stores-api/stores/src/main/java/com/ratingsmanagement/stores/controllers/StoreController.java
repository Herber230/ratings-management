package com.ratingsmanagement.stores.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;
import java.util.List;
import org.bson.types.ObjectId;
import com.ratingsmanagement.stores.models.Store;
import com.ratingsmanagement.stores.repositories.StoreRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.core.Message;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ratingsmanagement.stores.eventHandlers.MessageTypes.PurchaseMessage;
import java.io.IOException;

/**
 *
 * @author herber230
 */
@RestController
@CrossOrigin
@RequestMapping("/store")
public class StoreController {

  @Autowired
  private StoreRepository repository;
  
  @RequestMapping(value = "/", method = RequestMethod.GET)
  public List<Store> getAll() {
    return repository.findAll();
  }
  
  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public Store getById(@PathVariable("id") ObjectId id) {
    return repository.findBy_id(id);
  }
 
  @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
  public void modifyById(@PathVariable("id") ObjectId id, @Valid @RequestBody Store store) {
    store.set_id(id);
    repository.save(store);
  }
 
  @RequestMapping(value = "/", method = RequestMethod.POST)
  public Store create(@Valid @RequestBody Store store) {
    store.set_id(ObjectId.get());
    repository.save(store);
    return store;
  }
 
  @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
  public void deletePet(@PathVariable ObjectId id) {
    repository.delete(repository.findBy_id(id));
  }
  
  
  @RabbitListener(queues = "#{autoDeleteQueue.name}")
  public void receive1(Message message ) throws IOException
  {
      byte[] byteMessage = message.getBody();
      String stringMessage = new String(byteMessage);
      ObjectMapper mapper = new ObjectMapper();
      
      PurchaseMessage purchaseMessage = mapper.readValue(stringMessage, PurchaseMessage.class);
      Store store = repository.findBy_id( new ObjectId( purchaseMessage.getIdStore() ) );
      store.ratingScore =  purchaseMessage.getTotalScore();
      store.ratingCount =  purchaseMessage.getCountPurchases();
              
      repository.save(store);
  }
  
  
  
  
  
  
  
}    


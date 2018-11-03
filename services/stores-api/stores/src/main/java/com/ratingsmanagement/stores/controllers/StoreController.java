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

import com.ratingsmanagement.stores.utilities.WrapperCollection;
import com.ratingsmanagement.stores.utilities.WrapperEntity;

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
  
  @RequestMapping(value = "", method = RequestMethod.GET)
  public WrapperCollection<Store> getAll() {
      List<Store> stores = repository.findByDeferredDeletionIsFalse();
      return new WrapperCollection<>( null , false, stores, stores.size(), stores.size(), 1 );
  }
  
  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public WrapperEntity<Store> getById(@PathVariable("id") ObjectId id) {
    return new WrapperEntity<>(null, false, "Entity", repository.findById(id));
  }
 
  @RequestMapping(value = "", method = RequestMethod.PUT)
  public WrapperEntity<Store> modifyById(@Valid @RequestBody Store store) {
    repository.save(store);
    return new WrapperEntity<>(null, false, "Entity", store);
  }
 
  @RequestMapping(value = "", method = RequestMethod.POST)
  public WrapperEntity<Store> create(@Valid @RequestBody Store store) {
    store.setId(ObjectId.get());
    repository.save(store);    
    return new WrapperEntity<>(null, false, "Entity", store);
  }
 
  
  @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
  public WrapperEntity<Store> delete(@PathVariable ObjectId id) {
    Store store = repository.findById(id);
    store.deferredDeletion = true;
    repository.save(store);
    return new WrapperEntity<>(null, false, "Entity", store);
  }
  
  
  
  
  
  
  
  @RabbitListener(queues = "#{autoDeleteQueue.name}")
  public void receive1(Message message ) throws IOException
  {
      byte[] byteMessage = message.getBody();
      String stringMessage = new String(byteMessage);
      ObjectMapper mapper = new ObjectMapper();
      
      PurchaseMessage purchaseMessage = mapper.readValue(stringMessage, PurchaseMessage.class);
      Store store = repository.findById( new ObjectId( purchaseMessage.getIdStore() ) );
      store.ratingScore =  purchaseMessage.getTotalScore();
      store.ratingCount =  purchaseMessage.getCountPurchases();
              
      repository.save(store);
  }
  
  
}    


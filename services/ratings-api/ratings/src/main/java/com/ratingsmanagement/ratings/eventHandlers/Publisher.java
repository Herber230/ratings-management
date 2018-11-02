/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ratingsmanagement.ratings.eventHandlers;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ratingsmanagement.ratings.models.Rating;
import com.ratingsmanagement.ratings.eventHandlers.MessageTypes.RatingMessage;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 *
 * @author herber230
 */
@Component
public class Publisher {
  
    	@Autowired
	private RabbitTemplate template;

	@Autowired
	private TopicExchange main_events;

	
	public void send( String message) {	
                String key = "creation.rating";
		String finalMessage = "Mensaje publicado" + message;
		template.convertAndSend(main_events.getName(), key, finalMessage);
		System.out.println(" [x] Sent '" + message + "'");
	}
        
        public void ratingSaved( Rating rating, String action ) throws JsonProcessingException
        {
            String key = "saved.rating";            
            ObjectMapper mapper = new ObjectMapper();
            
            String messageToSend = mapper.writeValueAsString(new RatingMessage( rating._id.toHexString(), rating.idPurchase, rating.idStore, rating.idUser, rating.score, action ));
            
            template.convertAndSend(main_events.getName(), key, messageToSend);           
        }

}

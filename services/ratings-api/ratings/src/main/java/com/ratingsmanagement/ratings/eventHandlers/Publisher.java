/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ratingsmanagement.ratings.eventHandlers;

import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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

}

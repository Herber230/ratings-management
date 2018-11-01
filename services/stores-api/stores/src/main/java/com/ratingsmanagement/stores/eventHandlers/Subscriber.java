/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ratingsmanagement.stores.eventHandlers;

import org.springframework.amqp.core.TopicExchange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.amqp.core.AnonymousQueue;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
/**
 *
 * @author herber230
 */
@Component
public class Subscriber {
    
    	@Autowired
	private TopicExchange main_events;
        
        @Bean
        public Queue autoDeleteQueue() {
                return new AnonymousQueue();
        }

        @Bean
        public Binding binding(TopicExchange main_events, Queue autoDeleteQueue) {
                return BindingBuilder.bind(autoDeleteQueue).to(main_events).with("creation.rating");
        }
    
}

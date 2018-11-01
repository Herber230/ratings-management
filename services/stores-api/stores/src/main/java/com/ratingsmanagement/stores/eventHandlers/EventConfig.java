/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ratingsmanagement.stores.eventHandlers;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 *
 * @author herber230
 */
@Configuration
public class EventConfig {
    
    @Bean
    public TopicExchange main_events()
    {
        return new TopicExchange("main_events");
    }
    
    
}

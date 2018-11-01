
package com.ratingsmanagement.ratings.eventHandlers;

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

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ratingsmanagement.stores.utilities;

import java.io.Serializable;
import java.util.Collection;

/**
 *
 * @author herber230
 */
public class WrapperCollection<T> implements Serializable {

        // <editor-fold defaultstate="uncollapsed" desc="Fields">
    
        public String message;
        public Boolean isLogicError;
        public WrapperTypeCollection info;    
        public Collection<T> data;
        
        // </editor-fold>

        
        // <editor-fold defaultstate="uncollapsed" desc="Fields">
    
        public WrapperCollection( ) { }

        public WrapperCollection( String message, Boolean isLogicError, WrapperTypeCollection info, Collection<T> data ) {
            this.message = message;
            this.isLogicError = isLogicError;
            this.info = info;
            this.data = data;
        }
        
        public WrapperCollection( String message, Boolean isLogicError, Collection<T> data, Integer total, Integer take, Integer page ) {
            this.message = message;
            this.isLogicError = isLogicError;
            this.info = new WrapperTypeCollection( total, page, data.size(), take );
            this.data = data;
        }
        
        
        @Override
        public String toString() {
            return "WrapperEntity{" +
                    "message ='" + message + '\'' +
                    ", isLogicError='" + isLogicError + '\'' +
                    ", info=" + info.toString() + '\'' +
                    ", data=" + data.toString() + '\'' +
                    '}';
        }
        
        // </editor-fold>
  
        
        // <editor-fold defaultstate="uncollapsed" desc="Fields">
    
        
        // </editor-fold>
}

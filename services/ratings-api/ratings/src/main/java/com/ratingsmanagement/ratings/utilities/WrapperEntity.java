package com.ratingsmanagement.ratings.utilities;

import java.io.Serializable;
/**
 *
 * @author herber230
 */
public class WrapperEntity<T> implements Serializable {

        // <editor-fold defaultstate="uncollapsed" desc="Fields">
    
        public String message;
        public Boolean isLogicError;
        public WrapperTypeObject info;    
        public T data;
        
        // </editor-fold>

        
        // <editor-fold defaultstate="uncollapsed" desc="Fields">
    
        public WrapperEntity( ) { }

        public WrapperEntity( String message, Boolean isLogicError, WrapperTypeObject info, T data ) {
            this.message = message;
            this.isLogicError = isLogicError;
            this.info = info;
            this.data = data;
        }
        
        public WrapperEntity( String message, Boolean isLogicError, String type, T data ) {
            this.message = message;
            this.isLogicError = isLogicError;
            this.info = new WrapperTypeObject( type );
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

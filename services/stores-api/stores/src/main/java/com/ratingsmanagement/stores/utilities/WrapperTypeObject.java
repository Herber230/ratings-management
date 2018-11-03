package com.ratingsmanagement.stores.utilities;

import java.io.Serializable;

/**
 *
 * @author herber230
 */
public class WrapperTypeObject implements Serializable {

        // <editor-fold defaultstate="uncollapsed" desc="Fields">
    
        public String type;
        
        // </editor-fold>

        // <editor-fold defaultstate="uncollapsed" desc="Methods">
    
        public WrapperTypeObject () { }
        

        WrapperTypeObject(String type) {
            this.type = type;
        }
        
        @Override
        public String toString() {
            return "WrapperTypeCollection{" +
                    "type ='" + type + '\'' +
                    '}';
        }
        
        
        // </editor-fold>
        
        // <editor-fold defaultstate="uncollapsed" desc="Getters & Setters">
    
        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        // </editor-fold>

    
}

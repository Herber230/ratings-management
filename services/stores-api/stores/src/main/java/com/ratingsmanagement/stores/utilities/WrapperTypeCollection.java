/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ratingsmanagement.stores.utilities;

import java.io.Serializable;

/**
 *
 * @author herber230
 */
public class WrapperTypeCollection implements Serializable {

        // <editor-fold defaultstate="uncollapsed" desc="Fields">
    
        public String type;
        public Integer total;
        public Integer page;
        public Integer count;
        public Integer take;
    
        // </editor-fold>

        // <editor-fold defaultstate="uncollapsed" desc="Methods">
    
        public WrapperTypeCollection () { }
        
        public WrapperTypeCollection (String type, Integer total, Integer page, Integer count, Integer take) 
        {
            this.type = type;
            this.total = total;
            this.page = page;
            this.count = count;
            this.take = take;
        }
        
        public WrapperTypeCollection ( Integer total, Integer page, Integer count, Integer take) 
        {
            this.type = "Collection";
            this.total = total;
            this.page = page;
            this.count = count;
            this.take = take;
        }
        
        
        
        @Override
        public String toString() {
            return "WrapperTypeCollection{" +
                    "type ='" + type + '\'' +
                    ", total='" + total + '\'' +
                    ", page=" + page + '\'' +
                    ", count=" + count + '\'' +
                    ", take=" + take + '\'' +
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

        public Integer getTotal() {
            return total;
        }

        public void setTotal(Integer total) {
            this.total = total;
        }

        public Integer getPage() {
            return page;
        }

        public void setPage(Integer page) {
            this.page = page;
        }

        public Integer getCount() {
            return count;
        }

        public void setCount(Integer count) {
            this.count = count;
        }

        public Integer getTake() {
            return take;
        }

        public void setTake(Integer take) {
            this.take = take;
        }
        
        
        // </editor-fold>

    
}
